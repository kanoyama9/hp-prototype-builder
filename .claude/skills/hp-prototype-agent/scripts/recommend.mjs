\
/**
 * recommend.mjs
 * Usage:
 *   node scripts/recommend.mjs path/to/user_answers.json
 *
 * Output:
 *   JSON { iaCandidates: [...], themeCandidates: [...] }
 *
 * Notes:
 * - Simple rule-based scoring intended for MVP.
 * - Customize weights in score rules below.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function listBlueprints(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => loadJSON(path.join(dir, f)));
}

function get(obj, keyPath) {
  // keyPath like "content.home.hero.headline"
  return keyPath.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

function scoreIA(step1, iaBp) {
  let s = 0;
  const goal = step1.goal;
  const offeringType = step1.offeringType;
  const contentVolume = step1.contentVolume;
  const trust = step1.trustRequirement;

  // Hard matches
  if (goal === "recruit" && iaBp.id === "ia-recruit") s += 100;
  if (goal === "booking" && iaBp.id === "ia-local-store") s += 100;
  if (goal === "ir" && iaBp.id === "ia-ir") s += 100;

  // Offering type bias
  if (offeringType === "product" && iaBp.id === "ia-saas-product") s += 30;
  if (offeringType === "service" && iaBp.id === "ia-pro-service") s += 20;

  // One-pager bias
  const impliesOnePager = ["inquiry", "download", "demo"].includes(goal) && contentVolume !== "high";
  if (impliesOnePager && iaBp.id === "ia-lp-onepager") s += 18;

  // Corporate default
  if (iaBp.id === "ia-corporate-basic") s += 10;

  // Proof-heavy
  if (trust === "high" && iaBp.id === "ia-corporate-proof") s += 12;
  if (trust === "high" && iaBp.id === "ia-pro-service") s += 8;

  // Content volume
  if (contentVolume === "high" && ["ia-corporate-proof", "ia-pro-service", "ia-saas-product"].includes(iaBp.id)) s += 6;
  if (contentVolume === "low" && ["ia-corporate-basic", "ia-lp-onepager"].includes(iaBp.id)) s += 6;

  return s;
}

function scoreTheme(step1, themeBp) {
  let s = 0;
  const tone = (step1.toneKeywords || []).join(" ");
  const darkMode = step1.darkMode;
  const assets = step1.assetsAvailable || {};

  // Tone mapping
  if ((/洗練|堅実|信頼/.test(tone)) && themeBp.id === "theme-minimal-corporate") s += 20;
  if ((/先進|テック|SaaS|モダン/.test(tone)) && themeBp.id === "theme-modern-saas") s += 20;
  if ((/コピー|思想|タイポ/.test(tone)) && themeBp.id === "theme-big-typography") s += 20;
  if ((/透明|未来|グラス/.test(tone)) && themeBp.id === "theme-glass") s += 18;
  if ((/尖り|実験|ブルータル/.test(tone)) && themeBp.id === "theme-brutal") s += 18;
  if ((/高級|上質|ラグジュアリー/.test(tone)) && themeBp.id === "theme-editorial-lux") s += 18;
  if ((/ポップ|親しみ|かわいい/.test(tone)) && themeBp.id === "theme-pop-illustration") s += 18;

  // Dark mode preference
  if (darkMode === "on" && themeBp.id === "theme-dark-pro") s += 14;
  if (darkMode === "auto" && themeBp.id === "theme-dark-pro") s += 6;

  // Asset-based adjustments
  const hasStrongPhotos = !!(assets.heroImage || assets.ceoPhoto || assets.officePhotos || assets.memberPhotos);
  if (!hasStrongPhotos && themeBp.id === "theme-editorial-lux") s -= 999; // avoid if no photos
  if ((assets.productScreenshots || assets.uiScreenshots) && ["theme-modern-saas", "theme-dark-pro"].includes(themeBp.id)) s += 6;

  return s;
}

function applyCompatibility(compat, iaId, themeId) {
  const v = compat?.matrix?.[iaId]?.[themeId] ?? "caution";
  return v; // recommended|caution|avoid
}

function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: node scripts/recommend.mjs path/to/user_answers.json");
    process.exit(1);
  }
  const answers = loadJSON(path.resolve(input));
  const step1 = answers.step1 || {};

  const iaDir = path.join(__dirname, "..", "blueprints", "ia");
  const themeDir = path.join(__dirname, "..", "blueprints", "theme");
  const compat = loadJSON(path.join(__dirname, "..", "blueprints", "compatibility.json"));

  const iaBps = listBlueprints(iaDir);
  const themeBps = listBlueprints(themeDir);

  const iaCandidates = iaBps
    .map(bp => ({ id: bp.id, name: bp.name, score: scoreIA(step1, bp) }))
    .sort((a,b) => b.score - a.score)
    .slice(0, 5);

  const themeCandidatesRaw = themeBps
    .map(bp => ({ id: bp.id, name: bp.name, score: scoreTheme(step1, bp) }))
    .sort((a,b) => b.score - a.score)
    .slice(0, 8);

  // Combine top IA with themes and filter avoids
  const combos = [];
  for (const ia of iaCandidates.slice(0,3)) {
    for (const th of themeCandidatesRaw.slice(0,5)) {
      const comp = applyCompatibility(compat, ia.id, th.id);
      if (comp === "avoid") continue;
      combos.push({
        iaId: ia.id,
        themeId: th.id,
        compatibility: comp,
        score: ia.score + th.score + (comp === "recommended" ? 3 : 0)
      });
    }
  }
  combos.sort((a,b) => b.score - a.score);

  const output = {
    iaCandidates: iaCandidates.slice(0,3),
    themeCandidates: themeCandidatesRaw.slice(0,3),
    topCombos: combos.slice(0,5)
  };

  console.log(JSON.stringify(output, null, 2));
}

main();
