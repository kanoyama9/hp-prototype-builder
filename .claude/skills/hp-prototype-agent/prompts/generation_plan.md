# Generation Plan（実装方針）

## 0) 入力品質の最終合成（生成前の必須ステップ）

コード生成に入る前に、STEP1〜3で集めた情報を統合し、以下の「設計判断シート」を作成する。
このシートが generation の全判断の根拠となる。

### 設計判断シート
```
【ビジネス要件】
- Value Proposition：___（一文）
- Primary Persona：___
- Conversion Goal：___
- 信頼の壁 Top3：___

【コンテンツ戦略】
- キーメッセージ：___（Hero見出し最終案）
- ストーリーの流れ：Landing → ___ → ___ → ___ → CTA
- トーン/ボイス：フォーマル度___、専門用語___、感情訴求___

【デザイン要件】
- IA：___ (iaId)
- Theme：___ (themeId)
- カラー：Primary___ / Secondary___ / Accent___
- モーション：___
- ダークモード：___

【アセット状況】
- 確定素材：___
- プレースホルダ：___
- 撮影ガイド要否：___
```

> **ステップバック**：この設計判断シートを俯瞰して、「ビジネス要件」と「デザイン要件」に矛盾がないか最終確認する。矛盾がある場合はユーザーに差し戻す。

---

## 1) `site.config.json` を生成
- IA × Theme × ユーザー入力を合成
- 設計判断シートの全項目を `site.config.json` に反映
- **メタ情報を埋め込む**：
  - `meta.generatedFrom.iaId` / `meta.generatedFrom.themeId`
  - `meta.persona` / `meta.conversionGoal`（後から意図を確認できるようにする）

## 2) Reactプロジェクトを用意（Vite推奨）

## 3) Tailwind + shadcn/ui を導入し、Theme tokens をCSS変数で注入

## 4) pages/sections を `site.config.json` の順にレンダリング
- **セクション間の接続を意識する**：各セクションが訪問者のジャーニー（疑問→理解→信頼→行動）に沿って自然につながるようにする
- 空データのセクションは自動で非表示にするガードを入れる

## 5) Framer Motion は `motionIntensity` に応じて適用（prefers-reduced-motion対応）

## 6) README に「起動方法」「差し替えポイント」「撮影ガイド（該当時）」を書く
