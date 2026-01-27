---
name: hp-prototype-agent
description: Build a pre-deployment corporate website prototype (React+Tailwind+shadcn/ui+Framer Motion) by selecting an IA blueprint and Theme, collecting required variables, and generating code/config.
---

# HP Prototype Builder (JA)

目的：
- ユーザー回答（テキスト/画像）から、企業HPの「実装前プロトタイプ（コード）」を生成する。
- 生成の安定性のため、**設計（IA）** と **デザイン（Theme）** を分離し、最後に合成する。

使用スタック（MVP）：
- React（JavaScript）
- Tailwind CSS
- shadcn/ui（コンポーネント）
- Framer Motion（アニメーション：控えめ）
- （推奨）Vite + React で最小構成。必要なら Next.js に切替。

---

## 入力
- STEP1：目的/業種/情報量/ターゲット/トーン/カラー/レスポンシブ/ダークモード/素材有無
- STEP2：テキスト（会社/サービス/MVV/FAQ/採用など）
- STEP3：画像（ロゴ/ヒーロー/人物/オフィス/OGP）

## 出力
- `site.config.json`（入力を統合した単一の設定ファイル）
- Reactアプリ（プロトタイプがローカルで起動できる）
- `README.md`（起動方法と差し替えポイント）

---

## データ（Blueprint）
- IAテンプレ：`blueprints/ia/*.json`
- Themeテンプレ：`blueprints/theme/*.json`
- 互換性：`blueprints/compatibility.json`

Blueprintから読み取ること：
- pages（どのページを作るか）
- sections（ページ内のセクション順）
- requiredTextKeys / requiredImageKeys（必須入力）
- defaults（Theme/レイアウト/モーションのデフォルト）

---

## 実行フロー（必須）
### 1) STEP1：ヒアリング → 推薦（3案）
- `scripts/recommend.mjs`（または同等ロジック）で、IA候補Top3とTheme候補Top3を提示する。
- 互換性（❌）は候補から除外、⚠️は注意文を添える。
- ユーザーに「IA」「Theme」をそれぞれ選択してもらう。

### 2) STEP2：必須テキストを収集
- 選んだIAが要求する `requiredTextKeys` を最優先で集める。
- 生成前に「ページ構成/セクション/見出し/CTA」をテキストで確認する。

### 3) STEP3：必須画像を収集
- `requiredImageKeys` を優先。
- 足りない場合はプレースホルダ方針を提示し、プロトタイプとして成立させる。

### 4) 合成して `site.config.json` を生成
- `blueprint.iaId` と `blueprint.themeId` を保存し、後から再生成できるようにする。
- Themeは shadcn/ui 互換の semantic tokens に落とす（CSS変数）。

### 5) コーディング
- コンテンツは `site.config.json` から取得する（直書き禁止）。
- セクションは `src/sections/<SectionId>.jsx` などに分割し、再利用可能にする。
- Framer Motion は `motionIntensity` に応じて適用（none/subtle/standard/expressive）。
- `prefers-reduced-motion` の場合はアニメーションを停止または最小化する。

### 6) 出力
- ローカル起動（例）：
  - `npm install`
  - `npm run dev`
- READMEに「編集すべきキー」「画像差し替え先」を列挙する。

---

## 品質チェック（必須）
- CTAが不明確なら修正（Primary CTAは1つに絞る）
- 欠落情報は推測で確定しない（住所/代表/価格/法務）
- コントラストとフォーカスリングを必ず確認（アクセシビリティ）
- `services.items.length === 0` など、空配列のセクションは非表示にする

---

## 禁止
- 会社情報を“たぶん”で断定しない
- 実績が無いのに架空の導入ロゴ/数値を作らない
- 画像が無いのに写真前提のThemeを押し切らない（互換性を守る）
