\
/**
 * validate.mjs
 * Usage:
 *   node scripts/validate.mjs path/to/site.config.json
 *
 * Performs minimal validation based on selected IA blueprint required keys.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function get(obj, keyPath) {
  return keyPath.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

function collectRequiredKeys(iaBp) {
  const keys = { text: new Set(), image: new Set() };
  const pages = iaBp.pages || {};
  for (const pageId of Object.keys(pages)) {
    const p = pages[pageId];
    (p.requiredTextKeys || []).forEach(k => keys.text.add(k));
    (p.requiredImageKeys || []).forEach(k => keys.image.add(k));
  }
  return { text: [...keys.text], image: [...keys.image] };
}

function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: node scripts/validate.mjs path/to/site.config.json");
    process.exit(1);
  }
  const config = loadJSON(path.resolve(input));
  const iaId = config?.blueprint?.iaId;
  if (!iaId) {
    console.error("Missing blueprint.iaId in site.config.json");
    process.exit(1);
  }

  const iaPath = path.join(__dirname, "..", "blueprints", "ia", `${iaId}.json`);
  if (!fs.existsSync(iaPath)) {
    console.error(`IA blueprint not found: ${iaPath}`);
    process.exit(1);
  }
  const iaBp = loadJSON(iaPath);
  const req = collectRequiredKeys(iaBp);

  const missingText = req.text.filter(k => get(config, k) === undefined);
  const missingImage = req.image.filter(k => get(config, k) === undefined);

  const ok = missingText.length === 0 && missingImage.length === 0;

  console.log(JSON.stringify({
    ok,
    iaId,
    missingTextKeys: missingText,
    missingImageKeys: missingImage
  }, null, 2));

  process.exit(ok ? 0 : 2);
}

main();
