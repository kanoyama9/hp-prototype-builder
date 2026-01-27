# STEP3 画像入力（アセット）
- IA Blueprintの `requiredImageKeys` を列挙し、ユーザーに提出してもらう。
- 画像が不足している場合は、以下の順で対処：
  1) 追加で提出依頼
  2) プレースホルダ（タイポ/図形）で代替して進行
  3) 写真前提Themeを避ける（Themeの再選定）

推奨フォルダ（コード資産に同梱する場合）：
- `public/assets/logo.*`
- `public/assets/hero.*`
- `public/assets/ceo.*`
- `public/assets/members/<id>.*`
