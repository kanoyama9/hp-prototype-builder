# Generation Plan（実装方針）
1) `site.config.json` を生成（IA×Theme×ユーザー入力を合成）
2) Reactプロジェクトを用意（Vite推奨）
3) Tailwind + shadcn/ui を導入し、Theme tokensをCSS変数で注入
4) pages/sectionsを `site.config.json` の順にレンダリング
5) Framer Motionは `motionIntensity` に応じて適用（prefers-reduced-motion対応）
6) READMEに「起動方法」と「差し替えポイント」を書く
