# 推奨リポジトリ構成（Vite + React）

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

## Themeの適用（概念）
- `src/styles/theme.css` に `:root` と `.dark` のCSS変数（--background等）を定義
- `site.config.json` の `theme.tokens` を使って `theme.css` を生成してもよい

## レスポンシブ
- Tailwindの `container`, `max-w-*`, `px-*`, `grid`, `md:` などで対応

## 画像
- MVPは `public/assets/*` に置いて参照
- 画像が無い場合はプレースホルダ（グラデ/パターン/タイポ）で成立させる
