---
name: hp-prototype-agent
description: Build a pre-deployment corporate website prototype (React+Tailwind+shadcn/ui+Framer Motion) by selecting an IA blueprint and Theme, collecting required variables, and generating code/config.
---

# HP Prototype Builder — 統合スキルドキュメント

> このファイルは、HP Prototype Agent のすべてのプロンプト・ナレッジ・ブループリント・ロジックを
> 1つの skills.md にまとめたものです。Claude Code のスキルとして読み込んで使用できます。

---

## 1. 概要

### 目的
- ユーザー回答（テキスト/画像）から、企業HPの「実装前プロトタイプ（コード）」を生成する。
- 生成の安定性のため、**設計（IA）** と **デザイン（Theme）** を分離し、最後に合成する。

### 使用スタック（MVP）
- React（JavaScript）
- Tailwind CSS
- shadcn/ui（コンポーネント）
- Framer Motion（アニメーション：控えめ）
- （推奨）Vite + React で最小構成。必要なら Next.js に切替。

### 入力
- STEP1：目的/業種/情報量/ターゲット/トーン/カラー/レスポンシブ/ダークモード/素材有無
- STEP2：テキスト（会社/サービス/MVV/FAQ/採用など）
- STEP3：画像（ロゴ/ヒーロー/人物/オフィス/OGP）

### 出力
- `site.config.json`（入力を統合した単一の設定ファイル）
- Reactアプリ（プロトタイプがローカルで起動できる）
- `README.md`（起動方法と差し替えポイント）

---

## 2. 実行フロー（必須）

### 2.1 STEP1：ヒアリング → 推薦（3案）
- スコアリングロジック（後述）で、IA候補Top3とTheme候補Top3を提示する。
- 互換性（❌）は候補から除外、⚠️は注意文を添える。
- ユーザーに「IA」「Theme」をそれぞれ選択してもらう。

### 2.2 STEP2：必須テキストを収集
- 選んだIAが要求する `requiredTextKeys` を最優先で集める。
- 生成前に「ページ構成/セクション/見出し/CTA」をテキストで確認する。

### 2.3 STEP3：必須画像を収集
- `requiredImageKeys` を優先。
- 足りない場合はプレースホルダ方針を提示し、プロトタイプとして成立させる。

### 2.4 合成して `site.config.json` を生成
- `blueprint.iaId` と `blueprint.themeId` を保存し、後から再生成できるようにする。
- Themeは shadcn/ui 互換の semantic tokens に落とす（CSS変数）。

### 2.5 コーディング
- コンテンツは `site.config.json` から取得する（直書き禁止）。
- セクションは `src/sections/<SectionId>.jsx` などに分割し、再利用可能にする。
- Framer Motion は `motionIntensity` に応じて適用（none/subtle/standard/expressive）。
- `prefers-reduced-motion` の場合はアニメーションを停止または最小化する。

### 2.6 出力
- ローカル起動（例）：`npm install` → `npm run dev`
- READMEに「編集すべきキー」「画像差し替え先」を列挙する。

---

## 3. STEP1 ヒアリング（最短7問）

次の質問をこの順で聞く。回答が曖昧なら、具体例を示して選ばせる。

### Q1. 目的（CV）はどれですか？
- 問い合わせ / 資料DL / デモ予約 / 採用応募 / 予約 / IR / その他（自由入力）

### Q2. 提供形態は？
- サービス / プロダクト（SaaS等） / 両方

### Q3. 情報量は？
- 少（1ページ〜4ページ、文章短め）
- 中（4〜6ページ、必要十分）
- 多（6ページ以上、比較検討のための詳細）

### Q4. 信頼（Proof）の必要度は？
- 低（名刺代わり）
- 中（比較検討はされる）
- 高（事例/数字/推薦など強く必要）

### Q5. ターゲットは？
- 経営層 / 現場 / 開発者 / 求職者 / 一般消費者（複数OK）

### Q6. 素材（アセット）はありますか？
- ロゴ、代表写真、メンバー写真、オフィス写真、ヒーロー画像、プロダクトスクショ、挿絵

### Q7. 見た目の好み（トーン/色/ダークモード/アニメーション）
- トーン：洗練/堅実/先進/ポップ/高級/尖り
- 好きなメインカラー（あれば）
- ダークモード：OFF/AUTO/ON
- アニメーション：なし/控えめ/普通/リッチ

### 回答受領後
- IA候補Top3、Theme候補Top3を提示し、各候補の「良い点/注意点/必要な入力」を1行で説明。
- 互換性でNG（❌）は提示しない。

---

## 4. STEP2 テキスト入力（必須キーだけ集める）

- 選択済みのIA Blueprintの `requiredTextKeys` を列挙し、ユーザーから順に回収する。
- 回収が終わったら、生成前に下記をテキストで提示して確認を取る（この時点で修正可能にする）。

### 生成前の確認テンプレ
- ページ一覧（順序）
- 各ページのセクション順
- Hero見出し/サブ見出し/CTA
- サービス名・要約（カードで見える文言）
- 会社情報の表に出る項目
- お問い合わせ導線（フォーム or メール/電話）

### 不足がある場合
- 断定が危険な項目（住所/代表/価格/法務）は「未入力なら非表示」または「ユーザーに再質問」。

---

## 5. STEP3 画像入力（アセット）

- IA Blueprintの `requiredImageKeys` を列挙し、ユーザーに提出してもらう。
- 画像が不足している場合は、以下の順で対処：
  1. 追加で提出依頼
  2. プレースホルダ（タイポ/図形）で代替して進行
  3. 写真前提Themeを避ける（Themeの再選定）

### 推奨フォルダ（コード資産に同梱する場合）
```
public/assets/logo.*
public/assets/hero.*
public/assets/ceo.*
public/assets/members/<id>.*
```

---

## 6. Preflight（生成前チェック）

以下を満たさない場合、生成せずに修正する。

- [ ] Primary CTAが明確（文言・遷移先が具体）
- [ ] 必須キーが揃っている（`requiredTextKeys` / `requiredImageKeys`）
- [ ] 空配列のセクションを表示しない（例：`services.items.length === 0` ならservicesセクション非表示）
- [ ] コントラストとフォーカスリングが確保されている（dark含む）
- [ ] "推測で断定"していない（住所/代表/価格/法務）

---

## 7. Generation Plan（実装方針）

1. `site.config.json` を生成（IA×Theme×ユーザー入力を合成）
2. Reactプロジェクトを用意（Vite推奨）
3. Tailwind + shadcn/ui を導入し、Theme tokensをCSS変数で注入
4. pages/sectionsを `site.config.json` の順にレンダリング
5. Framer Motionは `motionIntensity` に応じて適用（`prefers-reduced-motion` 対応）
6. READMEに「起動方法」と「差し替えポイント」を書く

---

## 8. 品質チェック（必須）

- CTAが不明確なら修正（Primary CTAは1つに絞る）
- 欠落情報は推測で確定しない（住所/代表/価格/法務）
- コントラストとフォーカスリングを必ず確認（アクセシビリティ）
- `services.items.length === 0` など、空配列のセクションは非表示にする

---

## 9. 禁止事項

- 会社情報を"たぶん"で断定しない
- 実績が無いのに架空の導入ロゴ/数値を作らない
- 画像が無いのに写真前提のThemeを押し切らない（互換性を守る）

---

## 10. IA（情報設計）ブループリント

### 10.1 ia-lp-onepager — LP 1ページ完結（単一CV）

単一オファーに集中し、縦長1ページで完結させる。

**推奨ケース:** goal=inquiry/download/demo, contentVolume=low/mid, offeringType=service/product/mixed

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| home | `/` | hero → proof → benefits → features → process → testimonials → faq → cta → footer |

**必須テキストキー:**
- `content.home.hero.headline`
- `content.home.hero.subheadline`
- `content.home.hero.ctaPrimary`
- `content.services.items`
- `content.contact.email`

**必須画像キー:**
- `assets.logo.primary`

**オプション:** `content.faq.items`, `caseStudies.items`, `assets.hero.image`

**デフォルト:** navStyle=minimal, footerStyle=simple

---

### 10.2 ia-corporate-basic — コーポレート標準（4〜5ページ）

会社/サービス/問い合わせを揃える基本形。迷わせない。

**推奨ケース:** goal=branding/inquiry/other, contentVolume=low/mid, offeringType=service/mixed

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| home | `/` | hero → serviceHighlights → features → companyTeaser → cta → footer |
| services | `/services` | serviceGrid → process → faq → cta → footer |
| company | `/company` | overview → mvv → profileTable → ceoMessage → historyTimeline → footer |
| contact | `/contact` | contactInfo → contactForm → footer |
| privacy | `/privacy` | legalBody → footer |

**必須テキストキー:**
- `content.home.hero.headline`, `content.home.hero.subheadline`, `content.services.items`
- `content.company.profile.legalName`, `content.company.profile.address`, `content.company.profile.business`
- `content.contact.email`
- `legal.privacyPolicy.body`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=standard, footerStyle=columns

---

### 10.3 ia-corporate-proof — コーポレート拡張（事例/実績中心）

比較検討されるB2B向け。Proof（事例/実績/FAQ）を厚くする。

**推奨ケース:** goal=inquiry/demo, contentVolume=mid/high, trustRequirement=high, offeringType=service/mixed

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| home | `/` | hero → proof → serviceHighlights → caseStudyTeaser → cta → footer |
| services | `/services` | serviceGrid → process → testimonials → faq → cta → footer |
| caseStudies | `/case-studies` | caseStudyGrid → cta → footer |
| company | `/company` | overview → mvv → profileTable → ceoMessage → footer |
| contact | `/contact` | contactInfo → contactForm → footer |
| privacy | `/privacy` | legalBody → footer |

**必須テキストキー:**
- `content.home.hero.headline`, `content.home.hero.subheadline`, `content.services.items`
- `caseStudies.items`
- `content.company.profile.legalName`, `content.company.profile.address`
- `content.contact.email`
- `legal.privacyPolicy.body`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=standard

---

### 10.4 ia-saas-product — SaaS/プロダクト型（理解→比較→導入）

機能・ユースケース・価格・信頼を整理し導入まで導く。

**推奨ケース:** offeringType=product/mixed, contentVolume=mid/high

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| home | `/` | hero → proof → featureBento → useCases → cta → footer |
| product | `/product` | hero → featureBento → integrations → security → faq → cta → footer |
| pricing | `/pricing` | pricingTable → faq → cta → footer |
| company | `/company` | overview → profileTable → footer |
| contact | `/contact` | contactInfo → contactForm → footer |

**必須テキストキー:**
- `product.name`, `product.oneLiner`, `product.features`
- `pricing.tiers`
- `content.company.profile.legalName`
- `content.contact.email`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=mega, footerStyle=columns

---

### 10.5 ia-pro-service — プロフェッショナルサービス（受託/コンサル）

営業資料として読ませる構成。プロセス/不安解消/CTAを重視。

**推奨ケース:** offeringType=service/mixed, trustRequirement=mid/high, contentVolume=mid/high

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| home | `/` | hero → serviceHighlights → features → proof → cta → footer |
| services | `/services` | serviceGrid → process → faq → cta → footer |
| company | `/company` | overview → mvv → profileTable → ceoMessage → footer |
| contact | `/contact` | contactInfo → contactForm → footer |
| privacy | `/privacy` | legalBody → footer |

**必須テキストキー:**
- `content.home.hero.headline`, `content.home.hero.subheadline`, `content.services.items`
- `content.company.profile.legalName`, `content.company.profile.address`
- `content.contact.email`
- `legal.privacyPolicy.body`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=standard

---

### 10.6 ia-recruit — 採用ファースト（応募導線）

採用がKPI。EVP/福利厚生/求人/応募を中心に。

**推奨ケース:** goal=recruit, contentVolume=mid/high

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| careers | `/careers` | hero → evp → benefits → culture → jobsTeaser → process → faq → applyCta → footer |
| company | `/company` | overview → profileTable → footer |
| privacy | `/privacy` | legalBody → footer |

**必須テキストキー:**
- `recruit.evp.headline`, `recruit.positions`, `recruit.applicationLink`
- `content.company.profile.legalName`
- `legal.privacyPolicy.body`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=standard

---

### 10.7 ia-ir — IR（投資家向け）

投資家向け情報を整理する。厳格で迷わせない。

**推奨ケース:** goal=ir

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| ir | `/ir` | irHero → irHighlights → documents → footer |
| governance | `/ir/governance` | governanceBody → footer |

**必須テキストキー:**
- `ir.documents`, `ir.governance`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=standard

---

### 10.8 ia-local-store — 店舗/ローカル（来店・予約中心）

営業時間/地図/予約導線を最優先。スマホ最適化重視。

**推奨ケース:** goal=booking, contentVolume=low/mid

**ページ構成:**

| ページ | パス | セクション |
|--------|------|-----------|
| home | `/` | hero → servicesOrMenu → hours → locationTeaser → cta → footer |
| locations | `/locations` | locationsList → footer |
| contact | `/contact` | contactInfo → footer |

**必須テキストキー:**
- `store.name`, `store.hours`, `store.primaryPhone`
- `store.locations`

**必須画像キー:**
- `assets.logo.primary`

**デフォルト:** navStyle=minimal

---

## 11. Theme（デザイン）ブループリント

### 11.1 theme-minimal-corporate — ミニマル・コーポレート

**キーワード:** 洗練, 信頼, 余白, シンプル

| 設定 | 値 |
|------|---|
| stylePreset | minimal |
| spacingDensity | airy |
| cornerRadius | soft |
| shadowStrength | soft |
| motionIntensity | subtle |
| imagery | photo / outline icons / natural treatment |

**カラートークン (Light):**
| Token | 値 |
|-------|---|
| background | `#ffffff` |
| foreground | `#0f172a` |
| primary | `#1e40af` |
| primaryForeground | `#ffffff` |
| secondary | `#f1f5f9` |
| muted | `#f8fafc` |
| accent | `#e0e7ff` |
| border | `#e2e8f0` |
| ring | `#1e40af` |

**カラートークン (Dark):**
| Token | 値 |
|-------|---|
| background | `#0b1220` |
| foreground | `#e2e8f0` |
| primary | `#60a5fa` |
| primaryForeground | `#0b1220` |
| secondary | `#111c33` |
| muted | `#111c33` |
| accent | `#1d4ed8` |
| border | `#1f2a44` |
| ring | `#60a5fa` |

**Typography:** baseFontSize=md, lineHeight=relaxed, tracking=normal, radius=0.75rem
**Fonts:** system sans-serif

---

### 11.2 theme-modern-saas — モダンSaaS（Bento）

**キーワード:** 先進, 軽快, モジュール, UI

| 設定 | 値 |
|------|---|
| stylePreset | modern |
| spacingDensity | standard |
| cornerRadius | round |
| shadowStrength | soft |
| motionIntensity | standard |
| imagery | mixed / outline icons |

**カラートークン (Light):** primary=`#7c3aed`, accent=`#ede9fe`
**カラートークン (Dark):** primary=`#a78bfa`, accent=`#312e81`
**Typography:** baseFontSize=md, lineHeight=normal, tracking=normal, radius=1rem

---

### 11.3 theme-big-typography — ビッグタイポ（コピー主役）

**キーワード:** メッセージ, タイポ, 余白

| 設定 | 値 |
|------|---|
| stylePreset | minimal |
| spacingDensity | airy |
| cornerRadius | soft |
| shadowStrength | soft |
| motionIntensity | subtle |
| imagery | mixed / outline icons |

**カラートークン (Light):** primary=`#0ea5e9`, accent=`#e0f2fe`
**カラートークン (Dark):** primary=`#38bdf8`, accent=`#0c4a6e`
**Typography:** baseFontSize=**lg**, lineHeight=relaxed, tracking=**tight**, radius=0.75rem

---

### 11.4 theme-glass — グラスモーフィズム（透明×ぼかし）

**キーワード:** 透明感, 奥行き, 未来感

| 設定 | 値 |
|------|---|
| stylePreset | modern |
| spacingDensity | standard |
| cornerRadius | round |
| shadowStrength | soft |
| motionIntensity | standard |
| imagery | mixed / outline icons |
| 特殊 | `requiresBackdropBlur: true`, `glassCards: true` |

**カラートークン (Light):** primary=`#16a34a`, card=`rgba(255,255,255,0.65)`, border=`rgba(15,23,42,0.10)`
**カラートークン (Dark):** primary=`#22c55e`, card=`rgba(15,23,42,0.55)`, border=`rgba(226,232,240,0.10)`
**Typography:** baseFontSize=md, lineHeight=normal, tracking=normal, radius=1rem

---

### 11.5 theme-brutal — ネオブルータリズム（尖り）

**キーワード:** 尖り, 強コントラスト, 太枠, 実験

| 設定 | 値 |
|------|---|
| stylePreset | brutal |
| spacingDensity | standard |
| cornerRadius | **sharp** |
| shadowStrength | **none** |
| motionIntensity | **none** |
| imagery | illustration / solid icons / flat style |

**カラートークン (Light):** primary=`#000000`, accent=`#fde047`（黄）, border=`#000000`
**カラートークン (Dark):** primary=`#ffffff`, accent=`#fde047`, border=`#ffffff`
**Typography:** baseFontSize=md, lineHeight=normal, tracking=normal, radius=**0px**

---

### 11.6 theme-editorial-lux — エディトリアル/ラグジュアリー

**キーワード:** 上質, 物語, 余白, 写真

> **注意:** 写真素材がない場合は使用を避ける（互換性を守る）

| 設定 | 値 |
|------|---|
| stylePreset | luxury |
| spacingDensity | airy |
| cornerRadius | soft |
| shadowStrength | soft |
| motionIntensity | subtle |
| imagery | photo / outline icons / **desaturated** treatment |

**カラートークン (Light):** background=`#fbfbf9`, primary=`#111827`（ダークトーン）
**カラートークン (Dark):** background=`#0b0c0f`, primary=`#f3f4f6`（ライトトーン）
**Typography:** baseFontSize=md, lineHeight=relaxed, tracking=normal, radius=0.75rem
**Fonts:** heading=**serif**（Georgia, Cambria, Times New Roman）

---

### 11.7 theme-pop-illustration — ポップ/イラスト（親しみ）

**キーワード:** ポップ, 親しみ, 明るい, 柔らかい

| 設定 | 値 |
|------|---|
| stylePreset | playful |
| spacingDensity | standard |
| cornerRadius | round |
| shadowStrength | soft |
| motionIntensity | standard |
| imagery | illustration / solid icons / flat style |

**カラートークン (Light):** background=`#fff7ed`, primary=`#f97316`（オレンジ）, accent=`#a7f3d0`（ミント）
**カラートークン (Dark):** primary=`#fb923c`, accent=`#10b981`
**Typography:** baseFontSize=md, lineHeight=normal, tracking=normal, radius=1rem

---

### 11.8 theme-dark-pro — ダークモード前提（クール/開発者向け）

**キーワード:** ダーク, クール, テック, 集中

| 設定 | 値 |
|------|---|
| stylePreset | modern |
| spacingDensity | standard |
| cornerRadius | soft |
| shadowStrength | soft |
| motionIntensity | subtle |
| imagery | mixed / outline icons |

**カラートークン (Light):** primary=`#0f172a`
**カラートークン (Dark):** background=`#05070d`, primary=`#22d3ee`（シアン）
**Typography:** baseFontSize=md, lineHeight=normal, tracking=normal, radius=0.75rem

---

## 12. IA × Theme 互換性マトリクス

凡例: ✅ 推奨 / ⚠️ 注意（条件次第） / ❌ 非推奨（原則除外）

| IA＼Theme | minimal-corporate | modern-saas | big-typography | glass | brutal | editorial-lux | pop-illustration | dark-pro |
|-----------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **lp-onepager** | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ |
| **corporate-basic** | ✅ | ⚠️ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ | ⚠️ |
| **corporate-proof** | ✅ | ⚠️ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ | ⚠️ |
| **saas-product** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ |
| **pro-service** | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ |
| **recruit** | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ |
| **ir** | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ | ✅ | ❌ | ⚠️ |
| **local-store** | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ✅ | ⚠️ |

### 互換性ルール
- ❌（avoid）の組み合わせは推薦候補から**除外**する。
- ⚠️（caution）の場合はユーザーに注意点（素材品質/業界慣習/可読性）を添えて提示する。

---

## 13. スコアリングロジック（推薦エンジン）

### 13.1 IAスコアリング

```
入力: step1 = { goal, offeringType, contentVolume, trustRequirement }

■ ハードマッチ（+100）
  - goal === "recruit"  → ia-recruit
  - goal === "booking"  → ia-local-store
  - goal === "ir"       → ia-ir

■ 提供形態バイアス
  - offeringType === "product" → ia-saas-product (+30)
  - offeringType === "service" → ia-pro-service (+20)

■ ワンページバイアス (+18)
  - goal ∈ {inquiry, download, demo} AND contentVolume !== "high"
    → ia-lp-onepager

■ コーポレートデフォルト (+10)
  - ia-corporate-basic は常に +10（汎用的な受け皿）

■ Proof重視
  - trustRequirement === "high" → ia-corporate-proof (+12)
  - trustRequirement === "high" → ia-pro-service (+8)

■ 情報量マッチ (+6)
  - contentVolume === "high" → ia-corporate-proof / ia-pro-service / ia-saas-product
  - contentVolume === "low"  → ia-corporate-basic / ia-lp-onepager
```

### 13.2 Themeスコアリング

```
入力: step1 = { toneKeywords[], darkMode, assetsAvailable }

■ トーンマッピング（+18〜20）
  - 洗練/堅実/信頼       → theme-minimal-corporate (+20)
  - 先進/テック/SaaS/モダン → theme-modern-saas (+20)
  - コピー/思想/タイポ     → theme-big-typography (+20)
  - 透明/未来/グラス       → theme-glass (+18)
  - 尖り/実験/ブルータル   → theme-brutal (+18)
  - 高級/上質/ラグジュアリー → theme-editorial-lux (+18)
  - ポップ/親しみ/かわいい  → theme-pop-illustration (+18)

■ ダークモード
  - darkMode === "on"   → theme-dark-pro (+14)
  - darkMode === "auto" → theme-dark-pro (+6)

■ アセット調整
  - 写真なし → theme-editorial-lux (-999 = 事実上除外)
  - プロダクトスクショあり → theme-modern-saas / theme-dark-pro (+6)
```

### 13.3 組み合わせスコア

```
combo.score = ia.score + theme.score + (compatibility === "recommended" ? 3 : 0)
```

- ❌（avoid）の組み合わせは候補から除外
- Top 5 の組み合わせをユーザーに提示

---

## 14. バリデーションロジック

生成された `site.config.json` を検証する。

```
検証手順:
1. site.config.json から blueprint.iaId を取得
2. 対応する IA Blueprint の全ページから requiredTextKeys / requiredImageKeys を収集
3. site.config.json 内の値を dot-notation で走査
4. 未定義のキーを missingTextKeys / missingImageKeys として報告

判定:
  - missing が 0 件 → OK (exit 0)
  - missing が 1 件以上 → FAIL (exit 2)
```

---

## 15. 推奨リポジトリ構成（Vite + React）

```
.
├─ public/
│  └─ assets/                # ロゴ/写真/OGPなど
├─ src/
│  ├─ app/
│  │  ├─ App.jsx
│  │  ├─ routes.jsx          # ルーティング（任意。react-router使う場合）
│  │  └─ pages/
│  │     ├─ Home.jsx
│  │     ├─ Services.jsx
│  │     ├─ Company.jsx
│  │     ├─ Contact.jsx
│  │     └─ Privacy.jsx
│  ├─ sections/
│  │  ├─ Hero.jsx
│  │  ├─ ServiceGrid.jsx
│  │  ├─ FAQ.jsx
│  │  └─ ...
│  ├─ components/
│  │  └─ ui/                 # shadcn/ui
│  ├─ lib/
│  │  ├─ config.js           # site.config.json の読み込み
│  │  └─ utils.js
│  ├─ styles/
│  │  └─ theme.css           # CSS variables（shadcn tokens）
│  └─ main.jsx
├─ site.config.json
└─ README.md
```

### Theme適用ルール
- `src/styles/theme.css` に `:root` と `.dark` のCSS変数（`--background` 等）を定義
- `site.config.json` の `theme.tokens` を使って `theme.css` を生成してもよい

### レスポンシブ
- Tailwindの `container`, `max-w-*`, `px-*`, `grid`, `md:` などで対応

### 画像
- MVPは `public/assets/*` に置いて参照
- 画像が無い場合はプレースホルダ（グラデ/パターン/タイポ）で成立させる

---

## 16. CSS変数テンプレート例

```css
/* theme.css (generated from theme blueprint tokens) */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 98%;
  --muted-foreground: 215 16% 47%;
  --accent: 226 100% 94%;
  --accent-foreground: 221 83% 53%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;
  --radius: 0.75rem;
}

.dark {
  --background: 222 47% 7%;
  --foreground: 210 40% 96%;
  --primary: 213 94% 68%;
  --primary-foreground: 222 47% 7%;
  --secondary: 222 47% 13%;
  --secondary-foreground: 210 40% 96%;
  --muted: 222 47% 13%;
  --muted-foreground: 215 20% 65%;
  --accent: 221 83% 45%;
  --accent-foreground: 210 40% 96%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --ring: 213 94% 68%;
}
```

> **注意:** shadcn/ui はHSL値をスペース区切りで使用する。HEXからの変換が必要。
