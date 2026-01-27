# Preflight（生成前チェック）
以下を満たさない場合、生成せずに修正する。

- Primary CTAが明確（文言・遷移先が具体）
- 必須キーが揃っている（`requiredTextKeys` / `requiredImageKeys`）
- 空配列のセクションを表示しない（例：services/itemsが0ならservicesセクション非表示）
- コントラストとフォーカスリングが確保されている（dark含む）
- “推測で断定”していない（住所/代表/価格/法務）
