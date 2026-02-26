# タイポグラフィ・カラー・スペーシング設計ナレッジ

プロトタイプ生成時に参照する、タイポグラフィ・カラー・スペーシング・ビジュアル階層の実践ガイド。
すべての値は Tailwind CSS クラスと数値ペアで記載し、コード生成に直接使える形式とする。

---

## 1. タイポグラフィスケールシステム

### 1-1. Tailwind CSS デフォルトタイプスケール（完全一覧）

| クラス | font-size (rem) | font-size (px) | デフォルト line-height | 主な用途 |
|---|---|---|---|---|
| `text-xs` | 0.75rem | 12px | 1rem (16px) | キャプション、バッジ、ラベル |
| `text-sm` | 0.875rem | 14px | 1.25rem (20px) | 補助テキスト、フォームヘルパー、カード内説明 |
| `text-base` | 1rem | 16px | 1.5rem (24px) | 本文テキスト（**日本語の最小推奨サイズ**） |
| `text-lg` | 1.125rem | 18px | 1.75rem (28px) | リード文、強調本文、サブヘッダー |
| `text-xl` | 1.25rem | 20px | 1.75rem (28px) | カードタイトル、小見出し |
| `text-2xl` | 1.5rem | 24px | 2rem (32px) | h4 相当、セクション小見出し |
| `text-3xl` | 1.875rem | 30px | 2.25rem (36px) | h3 相当、セクション見出し |
| `text-4xl` | 2.25rem | 36px | 2.5rem (40px) | h2 相当、ページ見出し |
| `text-5xl` | 3rem | 48px | 1 (unitless) | h1 相当、Hero 見出し |
| `text-6xl` | 3.75rem | 60px | 1 (unitless) | Hero 大見出し（デスクトップ） |
| `text-7xl` | 4.5rem | 72px | 1 (unitless) | インパクト見出し（theme-big-typography） |
| `text-8xl` | 6rem | 96px | 1 (unitless) | 超大型見出し（デスクトップのみ） |
| `text-9xl` | 8rem | 128px | 1 (unitless) | 数字ハイライト等の特殊用途 |

**注意**: `text-5xl` 以上はデフォルト line-height が `1`（= font-size と同じ）のため、日本語テキストには `leading-tight`（1.25）以上を明示的に指定すること。

### 1-2. モジュラースケール比率

ベースサイズから比率を掛け算してサイズを導出するシステム。プロジェクトの性格に合わせて比率を選ぶ。

| 比率 | 名称 | 適用場面 | 生成される階層感 |
|---|---|---|---|
| **1.125** | Major Second | ブログ、ドキュメント、テキスト中心。控えめな階層 | 16 → 18 → 20.3 → 22.8 |
| **1.200** | Minor Third | UI中心のサイト、ダッシュボード。バランスの良い階層 | 16 → 19.2 → 23 → 27.6 |
| **1.250** | Major Third | **汎用推奨**。コーポレートサイトの標準 | 16 → 20 → 25 → 31.3 |
| **1.333** | Perfect Fourth | LP、マーケティング。コントラスト強め | 16 → 21.3 → 28.4 → 37.9 |
| **1.500** | Perfect Fifth | ドラマチックなLP、editorial | 16 → 24 → 36 → 54 |
| **1.618** | Golden Ratio | アート系、高インパクト。使用は控えめに | 16 → 25.9 → 41.9 → 67.8 |

**レスポンシブでの推奨**:
- モバイル: 16px ベース × 1.200 比率
- タブレット: 17px ベース × 1.250 比率
- デスクトップ: 18px ベース × 1.333 比率

### 1-3. 見出し階層の推奨サイズ（Tailwind クラス）

#### コーポレート標準（ia-corporate-basic, ia-pro-service）

```
h1: text-3xl md:text-4xl lg:text-5xl    (30px → 36px → 48px)
h2: text-2xl md:text-3xl lg:text-4xl    (24px → 30px → 36px)
h3: text-xl md:text-2xl                 (20px → 24px)
h4: text-lg md:text-xl                  (18px → 20px)
h5: text-base font-semibold             (16px)
h6: text-sm font-semibold uppercase tracking-wider  (14px)
```

#### Hero 特化（theme-big-typography）

```
h1: text-4xl md:text-6xl lg:text-7xl xl:text-8xl  (36px → 60px → 72px → 96px)
h2: text-2xl md:text-4xl lg:text-5xl               (24px → 36px → 48px)
h3: text-xl md:text-2xl lg:text-3xl                 (20px → 24px → 30px)
```

#### LP / インパクト型（ia-lp-onepager）

```
h1: text-3xl md:text-5xl lg:text-6xl    (30px → 48px → 60px)
h2: text-2xl md:text-3xl lg:text-4xl    (24px → 30px → 36px)
h3: text-lg md:text-xl lg:text-2xl      (18px → 20px → 24px)
```

### 1-4. 本文テキストサイズ

| 用途 | クラス | サイズ | 備考 |
|---|---|---|---|
| 本文（標準） | `text-base` | 16px | **日本語テキストの基本サイズ** |
| 本文（ゆったり） | `text-lg` | 18px | 記事ページ、editorial テーマ向け |
| 補助テキスト | `text-sm` | 14px | **日本語の最小許容サイズ**。12px以下は不可 |
| キャプション | `text-xs` | 12px | 英数字のみのラベル、バッジに限定 |
| リード文 | `text-lg md:text-xl` | 18px → 20px | Hero 直下の説明文 |

### 1-5. line-height（行間）推奨

日本語は文字密度が高いため、英語より広い行間が必要。

#### 日本語テキスト

| 用途 | Tailwind クラス | line-height 値 | 備考 |
|---|---|---|---|
| 本文（標準） | `leading-relaxed` | 1.625 | 最小推奨。短い段落向け |
| 本文（推奨） | `leading-loose` | 2.0 | **日本語本文の推奨値** |
| 本文（カスタム） | `leading-[1.8]` | 1.8 | **実用的なバランス値**。多くの日本語サイトで使用 |
| 見出し | `leading-tight` | 1.25 | 1〜2行の見出し向け |
| 見出し（大） | `leading-none` or `leading-[1.1]` | 1.0〜1.1 | text-5xl 以上の巨大見出し |

#### 英語テキスト

| 用途 | Tailwind クラス | line-height 値 |
|---|---|---|
| 本文 | `leading-relaxed` | 1.625 |
| 本文（コンパクト） | `leading-normal` | 1.5 |
| 見出し | `leading-tight` | 1.25 |
| 見出し（大） | `leading-none` | 1.0 |

**実装パターン**:
```jsx
{/* 日本語本文 */}
<p className="text-base leading-[1.8] md:text-lg md:leading-[1.8]">
  テクノロジーで企業の成長を加速させるパートナーとして...
</p>

{/* Hero 見出し */}
<h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-bold">
  ビジネスを、次のステージへ。
</h1>
```

### 1-6. letter-spacing（字間）

| 対象 | Tailwind クラス | 値 | 備考 |
|---|---|---|---|
| 日本語本文 | `tracking-normal` or `tracking-[0.05em]` | 0 〜 0.05em | デフォルトで十分。微調整のみ |
| 日本語見出し | `tracking-tight` or `tracking-normal` | -0.025em 〜 0 | 大きな見出しは若干詰める |
| 英語見出し | `tracking-tight` | -0.025em | 見出しは詰めてスタイリッシュに |
| 英語本文 | `tracking-normal` | 0 | デフォルトのまま |
| ラベル/バッジ | `tracking-wider` | 0.05em | 大文字ラベルに適用 |
| 超大型見出し（60px+） | `tracking-tighter` | -0.05em | 文字が大きいほど詰める |

---

## 2. フォントペアリング戦略

### 2-1. 日本語フォントスタック

#### ゴシック体（サンセリフ）: クリーン / モダン / コーポレート標準

```css
/* 推奨: Google Fonts + システムフォールバック */
font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans",
             "Yu Gothic Medium", "Yu Gothic", "Meiryo", sans-serif;
```

**適合テーマ**: theme-minimal-corporate, theme-modern-saas, theme-glass, theme-brutal, theme-dark-pro, theme-pop-illustration

**特徴**:
- **Noto Sans JP**: 日本語 Web フォントの標準。7ウェイト。Helvetica 的な汎用性
- **Hiragino Kaku Gothic ProN**: macOS / iOS プリインストール。高品質
- **Yu Gothic**: Windows プリインストール。Medium 指定を優先（Regular は細すぎる）
- **Meiryo**: Windows 旧来のフォールバック。「明瞭」を意味し可読性重視

#### 明朝体（セリフ）: 伝統 / 上質 / エディトリアル

```css
font-family: "Noto Serif JP", "Hiragino Mincho ProN", "Hiragino Mincho Pro",
             "Yu Mincho", "MS PMincho", serif;
```

**適合テーマ**: theme-editorial-lux（見出しのみ）

**特徴**:
- **Noto Serif JP**: Google Fonts 提供。Noto Sans JP と組み合わせて統一感
- **Hiragino Mincho ProN**: macOS / iOS。上品で格調高い
- **Yu Mincho**: Windows。明朝体の標準フォールバック

#### システムフォントのみ（高速表示優先）

```css
font-family: system-ui, -apple-system, "Segoe UI", Roboto,
             "Hiragino Sans", "Noto Sans JP", "Yu Gothic", sans-serif;
```

**用途**: パフォーマンス最優先時。Web フォントの読み込みを省略

### 2-2. ペアリングパターン

#### パターンA: ゴシック見出し + ゴシック本文（コーポレート標準）

```css
/* 最も安全な組み合わせ。ほぼ全業界・全テーマに適合 */
h1, h2, h3, h4, h5, h6 {
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
  font-weight: 700; /* bold */
}
body {
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
  font-weight: 400; /* regular */
}
```

- **適用**: ia-corporate-basic, ia-corporate-proof, ia-saas-product, ia-pro-service, ia-lp-onepager
- **ウェイトで階層を作る**: 見出し `font-bold`(700)、本文 `font-normal`(400)、強調 `font-semibold`(600)

#### パターンB: 明朝見出し + ゴシック本文（エディトリアル / ラグジュアリー）

```css
h1, h2, h3 {
  font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif;
  font-weight: 700;
}
body, h4, h5, h6 {
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
  font-weight: 400;
}
```

- **適用**: theme-editorial-lux 限定。高級ブランド、建築、ファッション、旅館
- **注意**: h1〜h3 のみ明朝。h4 以下は可読性のためゴシック
- **制約**: 明朝体は小さいサイズで可読性が落ちるため、`text-xl`（20px）以上で使用

#### パターンC: ディスプレイフォント見出し + ゴシック本文（個性派）

```css
/* 例: 丸ゴシックやデザインフォントを見出しに */
h1, h2 {
  font-family: "M PLUS Rounded 1c", "Noto Sans JP", sans-serif;
  font-weight: 700;
}
body {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 400;
}
```

- **適用**: theme-pop-illustration、教育、子供向け、カジュアルなサービス
- **注意**: ディスプレイフォントは h1, h2 のみ。多用すると可読性が低下

### 2-3. Tailwind での実装

```jsx
// tailwind.config.js（v3）または @theme（v4）
module.exports = {
  theme: {
    fontFamily: {
      sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', 'sans-serif'],
      serif: ['"Noto Serif JP"', '"Hiragino Mincho ProN"', '"Yu Mincho"', 'serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
    },
  },
}

// JSX での使用
<h1 className="font-sans font-bold text-4xl">見出しテキスト</h1>
<h1 className="font-serif font-bold text-4xl">エディトリアル見出し</h1>
<p className="font-sans font-normal text-base">本文テキスト</p>
<code className="font-mono text-sm">コードスニペット</code>
```

### 2-4. Google Fonts 読み込み最適化

```html
<!-- Noto Sans JP: 400, 500, 700 のみ読み込み（サブセット化） -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">

<!-- editorial テーマの場合、追加で明朝体 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
```

**パフォーマンス注意点**:
- 日本語フォントは 1MB 以上。必要なウェイトのみ読み込む
- `display=swap` で FOIT（Flash of Invisible Text）を防止
- Noto Sans JP は最大でも 400, 500, 700 の 3 ウェイト
- 本当にシステムフォントで十分かを検討する（MVP ではシステムフォントのみも可）

### 2-5. 日本語タイポグラフィの注意点

- **文字サイズ補正**: 日本語文字は正方形のフルキャップハイトを持ち、ラテン文字より大きく見える。混在する場合は英字を 10〜15% 大きめに設定するか、日本語を若干小さめにする
- **1行の文字数**: 日本語は横書きで 35〜40 文字が最適。`max-w-2xl`（672px）〜 `max-w-3xl`（768px）で `text-base`（16px）が約 42 文字
- **イタリック不使用**: 日本語にはイタリック体がない。強調は太字（`font-bold`）または色変更で行う
- **縦書き**: プロトタイプでは横書きのみ。縦書きは特殊案件のみ
- **禁則処理**: `word-break: break-all` は禁則処理を無視するため使用しない。`overflow-wrap: break-word` を推奨

---

## 3. カラーシステム設計

### 3-1. shadcn/ui セマンティックカラートークン（完全一覧）

shadcn/ui のカラーシステムは「背景 + 前景」の対で構成される。

| CSS 変数 | Tailwind クラス | 用途 |
|---|---|---|
| `--background` | `bg-background` | ページ全体の背景色 |
| `--foreground` | `text-foreground` | デフォルトのテキスト色 |
| `--card` / `--card-foreground` | `bg-card` / `text-card-foreground` | Card コンポーネントの背景・テキスト |
| `--popover` / `--popover-foreground` | `bg-popover` / `text-popover-foreground` | Popover / Dropdown の背景・テキスト |
| `--primary` / `--primary-foreground` | `bg-primary` / `text-primary-foreground` | ブランドカラー。Button の Primary |
| `--secondary` / `--secondary-foreground` | `bg-secondary` / `text-secondary-foreground` | Button の Secondary バリアント |
| `--muted` / `--muted-foreground` | `bg-muted` / `text-muted-foreground` | 控えめな背景・テキスト。TabsList, Skeleton |
| `--accent` / `--accent-foreground` | `bg-accent` / `text-accent-foreground` | ホバー効果。DropdownMenuItem, SelectItem |
| `--destructive` / `--destructive-foreground` | `bg-destructive` / `text-destructive-foreground` | 破壊的操作。削除ボタン、エラー |
| `--border` | `border-border` | デフォルトのボーダー色 |
| `--input` | `border-input` | フォーム入力のボーダー色 |
| `--ring` | `ring-ring` | フォーカスリングの色 |
| `--radius` | `rounded-*` | 角丸の基準値 |
| `--chart-1` 〜 `--chart-5` | `fill-chart-*` / `stroke-chart-*` | グラフ / データ可視化用 |
| `--sidebar` / `--sidebar-foreground` | `bg-sidebar` / `text-sidebar-foreground` | サイドバー |
| `--sidebar-primary` / `--sidebar-primary-foreground` | — | サイドバー内のアクション色 |
| `--sidebar-accent` / `--sidebar-accent-foreground` | — | サイドバー内のホバー色 |
| `--sidebar-border` | — | サイドバーのボーダー色 |
| `--sidebar-ring` | — | サイドバーのフォーカスリング色 |

### 3-2. ブランドカラーからパレットを構築する手順

#### Step 1: ブランド Primary カラーを決定

業界 / トーンから Primary カラーの HSL 値を決める。

#### Step 2: HSL を軸にバリエーション生成

1 つの Hue（色相）を基準に、Saturation（彩度）と Lightness（明度）を調整して全トークンを生成する。

```
ブランドカラー（例: 青 HSL 221, 83%, 53%）

Light Mode:
  --background:            H:0   S:0%   L:100%    （白）
  --foreground:            H:222 S:47%  L:11%     （ダークネイビー）
  --primary:               H:221 S:83%  L:53%     （★ ブランドカラーそのもの）
  --primary-foreground:    H:0   S:0%   L:100%    （白テキスト）
  --secondary:             H:210 S:40%  L:96%     （Hue を継承、薄く）
  --secondary-foreground:  H:222 S:47%  L:11%     （foreground と同じ）
  --muted:                 H:210 S:40%  L:98%     （さらに薄い背景）
  --muted-foreground:      H:215 S:16%  L:47%     （グレーテキスト）
  --accent:                H:226 S:100% L:94%     （primary の超薄い版）
  --accent-foreground:     H:221 S:83%  L:53%     （primary と同じ）
  --destructive:           H:0   S:84%  L:60%     （赤系、固定）
  --destructive-foreground:H:0   S:0%   L:98%     （白テキスト）
  --border:                H:214 S:32%  L:91%     （薄いグレー）
  --input:                 H:214 S:32%  L:91%     （border と同じ）
  --ring:                  H:221 S:83%  L:53%     （primary と同じ）
```

#### Step 3: ダークモード変換ルール

ライトモードからダークモードを生成する変換ルール:

| トークン | ライトモードの値 | ダークモード変換 |
|---|---|---|
| `--background` | 白 (L: 100%) | L: 5〜10% に下げる（真っ黒 #000 は避ける） |
| `--foreground` | ダーク (L: 10〜15%) | L: 90〜96% に上げる |
| `--primary` | ブランドカラー (L: 50〜55%) | L: 60〜70% に上げ、S を若干下げる |
| `--primary-foreground` | 白 | ダーク (L: 5〜10%) に反転 |
| `--secondary` | 薄い (L: 95〜98%) | 暗い (L: 12〜16%) に反転 |
| `--muted` | 超薄い (L: 97〜100%) | 暗い (L: 12〜16%) |
| `--muted-foreground` | グレー (L: 45〜50%) | グレー (L: 60〜68%) |
| `--accent` | Primary の超薄版 (L: 90〜95%) | Primary を暗く (L: 40〜50%) |
| `--border` | 薄いグレー (L: 88〜92%) | 暗いグレー (L: 15〜20%) |
| `--destructive` | 赤 (L: 55〜65%) | 赤をやや明るく (L: 60〜70%) |

**重要原則**:
- **純黒 (#000000) を背景に使わない**: 目の疲れとハレーション効果を引き起こす。`L: 5〜10%` のダークグレーを使用
- **純白 (#ffffff) をテキストに使わない**: 同様にコントラストが強すぎる。`L: 90〜96%` のオフホワイトを使用
- **Primary カラーの L を 15〜20% 上げる**: ダーク背景上で同じ色では視認性が低い
- **ダークモードは単なる反転ではない**: 各トークンを独立して調整する

#### 完全な CSS 変数テンプレート（HSL 形式）

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 98%;
  --muted-foreground: 215 16% 47%;
  --accent: 226 100% 94%;
  --accent-foreground: 221 83% 53%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;
  --radius: 0.75rem;
  --chart-1: 221 83% 53%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}

.dark {
  --background: 222 47% 7%;
  --foreground: 210 40% 96%;
  --card: 222 47% 9%;
  --card-foreground: 210 40% 96%;
  --popover: 222 47% 9%;
  --popover-foreground: 210 40% 96%;
  --primary: 213 94% 68%;
  --primary-foreground: 222 47% 7%;
  --secondary: 222 47% 13%;
  --secondary-foreground: 210 40% 96%;
  --muted: 222 47% 13%;
  --muted-foreground: 215 20% 65%;
  --accent: 221 83% 45%;
  --accent-foreground: 210 40% 96%;
  --destructive: 0 63% 31%;
  --destructive-foreground: 0 0% 98%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --ring: 213 94% 68%;
  --chart-1: 213 94% 68%;
  --chart-2: 160 60% 55%;
  --chart-3: 30 80% 65%;
  --chart-4: 280 65% 70%;
  --chart-5: 340 75% 65%;
}
```

### 3-3. コントラスト比の要件

| 基準 | 要件 | 対象 |
|---|---|---|
| WCAG AA（通常テキスト） | 4.5:1 以上 | 本文テキスト、リンク、ラベル |
| WCAG AA（大文字テキスト） | 3:1 以上 | 18px 以上 / 14px bold 以上 |
| WCAG AA（UI コンポーネント） | 3:1 以上 | ボタン境界、フォームボーダー、アイコン |
| WCAG AAA（通常テキスト） | 7:1 以上 | 長文コンテンツ（推奨） |

**確認ツール**:
- WebAIM Contrast Checker (webaim.org/resources/contrastchecker/)
- InclusiveColors (inclusivecolors.com) — Tailwind / CSS 出力対応
- Chrome DevTools の Accessibility パネル

**実装チェック**:
```
-- 安全な組み合わせの例 --
✓ --foreground (L:11%) on --background (L:100%)  → 約 15:1
✓ --primary-foreground (白) on --primary (L:53%) → 約 4.8:1
✓ --muted-foreground (L:47%) on --background (L:100%) → 約 4.6:1

-- 要注意の組み合わせ --
⚠ --muted-foreground on --muted → コントラスト比を必ず確認
⚠ ダークモードの --primary on --background → L 差を 55% 以上確保
```

### 3-4. 業界別カラー心理学

#### 青（Blue）: 信頼・安定

| 属性 | 値 |
|---|---|
| **HSL 範囲** | H: 210〜230, S: 60〜90%, L: 45〜60% |
| **Tailwind 参考** | blue-600 (#2563eb), blue-700 (#1d4ed8) |
| **連想** | 信頼、安定、知性、プロフェッショナル |
| **適合業界** | 金融、IT、コンサルティング、法務、医療機器、製造業 |
| **注意** | 最も無難で汎用性が高い。差別化が難しい面も |

```css
/* 青系パレット例 */
--primary: 221 83% 53%;         /* #3b82f6 メインブルー */
--primary-foreground: 0 0% 100%; /* 白 */
--accent: 226 100% 94%;          /* 薄い青背景 */
```

#### 緑（Green）: 成長・健康

| 属性 | 値 |
|---|---|
| **HSL 範囲** | H: 140〜160, S: 50〜80%, L: 35〜55% |
| **Tailwind 参考** | green-600 (#16a34a), emerald-600 (#059669) |
| **連想** | 成長、健康、自然、安心、エコ |
| **適合業界** | 医療、環境、農業、ウェルネス、教育、金融（濃い緑） |

```css
/* 緑系パレット例 */
--primary: 142 71% 45%;          /* #16a34a */
--primary-foreground: 0 0% 100%;
--accent: 142 76% 94%;           /* 薄い緑背景 */
```

#### 赤 / オレンジ（Red / Orange）: エネルギー・緊急性

| 属性 | 値 |
|---|---|
| **HSL 範囲（赤）** | H: 0〜15, S: 70〜90%, L: 50〜60% |
| **HSL 範囲（オレンジ）** | H: 20〜35, S: 80〜95%, L: 50〜60% |
| **Tailwind 参考** | red-600 (#dc2626), orange-500 (#f97316) |
| **連想** | 情熱、エネルギー、緊急性、食欲、行動 |
| **適合業界** | 飲食、小売、エンターテインメント、スポーツ、メディア |
| **注意** | CTA ボタンに赤は効果的だが、全面赤は攻撃的に見える。アクセントとして使用 |

```css
/* オレンジ系パレット例（飲食・店舗向け） */
--primary: 25 95% 53%;           /* #f97316 */
--primary-foreground: 0 0% 100%;
--accent: 30 100% 94%;           /* 暖色の薄い背景 */
--background: 30 50% 99%;        /* オフホワイト（わずかに暖色） */
```

#### 紫（Purple）: 創造性・高級感

| 属性 | 値 |
|---|---|
| **HSL 範囲** | H: 260〜280, S: 60〜85%, L: 45〜60% |
| **Tailwind 参考** | violet-600 (#7c3aed), purple-600 (#9333ea) |
| **連想** | 創造性、高級感、知恵、革新、独自性 |
| **適合業界** | 美容、クリエイティブ、テック（革新系）、教育、ブランド品 |

```css
/* 紫系パレット例 */
--primary: 263 70% 50%;          /* #7c3aed */
--primary-foreground: 0 0% 100%;
--accent: 265 90% 94%;
```

#### 黒 / グレー（Black / Gray）: 洗練・権威

| 属性 | 値 |
|---|---|
| **HSL 範囲** | H: 0〜240, S: 0〜10%, L: 5〜20% |
| **Tailwind 参考** | gray-900 (#111827), slate-900 (#0f172a) |
| **連想** | 洗練、権威、モダン、ミニマル、高級 |
| **適合業界** | ファッション、建築、デザイン、高級ブランド、写真 |

```css
/* モノクロ系パレット例 */
--primary: 0 0% 9%;              /* ほぼ黒 */
--primary-foreground: 0 0% 100%;
--background: 40 20% 98%;        /* オフホワイト（温かみ） */
--accent: 0 0% 95%;              /* ライトグレー */
```

### 3-5. 日本の伝統色（和色）とその活用

和色は彩度を抑えた落ち着いたトーンが特徴。コーポレートサイトに上品なアクセントとして使用可能。

| 和色名 | 読み | HEX | HSL | 用途・連想 |
|---|---|---|---|---|
| 藍色 | あいいろ | #165B8C | 205, 72%, 32% | 伝統・信頼。金融、法務、教育。「侍ブルー」 |
| 紺色 | こんいろ | #223A5E | 216, 49%, 25% | 深い信頼。フォーマル、B2B |
| 朱色 | しゅいろ | #EB6101 | 24, 96%, 46% | 神聖・活力。鳥居の色。飲食、伝統 |
| 若草色 | わかくさいろ | #A2C02E | 76, 62%, 47% | 成長・若さ。環境、教育、農業 |
| 桜色 | さくらいろ | #FEEEED | 2, 90%, 93% | 日本らしさ。春の季節感、柔らかさ。美容、ホスピタリティ |
| 灰桜 | はいざくら | #E8D3C7 | 20, 36%, 85% | 上品なピンクベージュ。高級路線 |
| 鶯色 | うぐいすいろ | #928C36 | 54, 46%, 39% | 渋い緑。伝統的な格式 |
| 薄墨色 | うすずみいろ | #A3A3A2 | 60, 1%, 64% | 控えめ・上品。背景、ボーダー |
| 漆黒 | しっこく | #0D0015 | 270, 100%, 4% | 最も深い黒。高級ブランド |
| 白練 | しろねり | #F3F3F2 | 60, 7%, 95% | 和風オフホワイト。温かみのある背景 |

**活用パターン**:

```css
/* 和風テイストのコーポレートサイト */
:root {
  --background: 60 7% 95%;        /* 白練: 温かみのあるオフホワイト */
  --foreground: 216 49% 15%;      /* 紺系の濃い色 */
  --primary: 205 72% 32%;         /* 藍色: メインカラー */
  --primary-foreground: 0 0% 100%;
  --accent: 2 90% 93%;            /* 桜色: アクセント */
  --accent-foreground: 205 72% 32%;
  --muted: 20 36% 92%;            /* 灰桜ベースの控えめ背景 */
  --muted-foreground: 216 20% 45%;
  --destructive: 24 96% 46%;      /* 朱色: 注意喚起 */
}
```

**使用指針**:
- 和色はアクセントとして使い、全面に使わない（古臭くなる）
- 桜色は背景・カードに使うと柔らかい印象。Primary には薄すぎる
- 藍色は Primary として十分なコントラスト。信頼感と和の雰囲気を両立
- 朱色は destructive / CTA に使用可能。鮮やかで目を引く
- 季節に応じたカラー変更の余地を残す（春: 桜色、夏: 藍色、秋: 朱色、冬: 白練）

### 3-6. 60-30-10 カラー配分ルール

| 割合 | 用途 | shadcn トークン |
|---|---|---|
| **60%** | 背景・ベース | `--background`, `--card`, `--muted` |
| **30%** | セカンダリ・構造 | `--secondary`, `--border`, `--foreground` |
| **10%** | アクセント・CTA | `--primary`, `--accent`, `--destructive` |

---

## 4. スペーシングシステム

### 4-1. 4px / 8px グリッドシステム

すべてのスペーシングは 4px の倍数で統一する。

| Tailwind クラス | 値 (px) | 値 (rem) | 用途 |
|---|---|---|---|
| `p-0.5` / `m-0.5` | 2px | 0.125rem | マイクロ間隔（アイコン内部） |
| `p-1` / `m-1` | 4px | 0.25rem | タイトな要素間（アイコンとテキスト） |
| `p-1.5` / `m-1.5` | 6px | 0.375rem | バッジ内パディング |
| `p-2` / `m-2` | 8px | 0.5rem | ボタン内パディング（小） |
| `p-3` / `m-3` | 12px | 0.75rem | ボタン内パディング（中） |
| `p-4` / `m-4` | 16px | 1rem | カード内パディング（標準）、フォーム要素間 |
| `p-5` / `m-5` | 20px | 1.25rem | — |
| `p-6` / `m-6` | 24px | 1.5rem | カード内パディング（ゆったり） |
| `p-8` / `m-8` | 32px | 2rem | セクション内の要素グループ間 |
| `p-10` / `m-10` | 40px | 2.5rem | — |
| `p-12` / `m-12` | 48px | 3rem | セクション縦パディング（モバイル最小） |
| `p-16` / `m-16` | 64px | 4rem | セクション縦パディング（タブレット） |
| `p-20` / `m-20` | 80px | 5rem | セクション縦パディング（デスクトップ） |
| `p-24` / `m-24` | 96px | 6rem | セクション縦パディング（ゆったり） |
| `p-32` / `m-32` | 128px | 8rem | 大きなセクション間隔 |

### 4-2. セクション縦パディング（デバイス別）

| デバイス | Tailwind クラス | 値 | 備考 |
|---|---|---|---|
| モバイル (base) | `py-12` 〜 `py-16` | 48px 〜 64px | コンパクトだが十分な余白 |
| タブレット (md) | `md:py-16` 〜 `md:py-24` | 64px 〜 96px | 中間サイズ |
| デスクトップ (lg) | `lg:py-20` 〜 `lg:py-32` | 80px 〜 128px | 余白を贅沢に |

**テーマ別のセクション間隔**:

| テーマ | 推奨パディング | 備考 |
|---|---|---|
| theme-minimal-corporate | `py-16 md:py-24 lg:py-32` | 広めの余白で洗練感 |
| theme-modern-saas | `py-12 md:py-20 lg:py-24` | 標準的 |
| theme-big-typography | `py-20 md:py-32 lg:py-40` | **最も広い**。余白がデザイン要素 |
| theme-editorial-lux | `py-16 md:py-24 lg:py-32` | 広めの余白 |
| theme-glass | `py-12 md:py-20 lg:py-24` | 標準的 |
| theme-brutal | `py-12 md:py-16 lg:py-20` | タイトめ。密度感 |
| theme-pop-illustration | `py-12 md:py-16 lg:py-24` | やや詰めて楽しさ |
| theme-dark-pro | `py-12 md:py-20 lg:py-24` | 標準的 |

### 4-3. コンテナ最大幅

| 用途 | Tailwind クラス | 最大幅 | 備考 |
|---|---|---|---|
| **プロース（読み物）** | `max-w-2xl` | 672px | FAQ、プライバシーポリシー、ブログ本文 |
| **フォーム** | `max-w-xl` 〜 `max-w-2xl` | 576px 〜 672px | お問い合わせフォーム |
| **標準コンテンツ** | `max-w-5xl` or `max-w-6xl` | 1024px or 1152px | セクション内コンテンツ。カードグリッド |
| **ワイドコンテンツ** | `max-w-7xl` | 1280px | ナビゲーション、フッター、ワイドグリッド |
| **フルワイド** | `max-w-full` + `px-4 md:px-8` | 100% | Hero 背景、フルブリード画像 |

**標準コンテナパターン**:
```jsx
{/* セクション: フルワイド背景 + 中央コンテンツ */}
<section className="py-16 md:py-24 lg:py-32">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {/* セクション内容 */}
  </div>
</section>

{/* プロースコンテンツ（FAQ, Privacy） */}
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-2xl px-4 sm:px-6">
    {/* 読み物コンテンツ */}
  </div>
</section>

{/* フルブリード Hero */}
<section className="relative min-h-[80vh] flex items-center">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
    {/* Hero 内容 */}
  </div>
</section>
```

### 4-4. カード内部スペーシングパターン

```jsx
{/* 標準カード */}
<Card className="p-6">                    {/* 内部パディング: 24px */}
  <div className="flex items-center gap-3 mb-4">  {/* アイコン+タイトル間: 12px, 下マージン: 16px */}
    <Icon className="h-6 w-6" />
    <h3 className="text-lg font-semibold">タイトル</h3>
  </div>
  <p className="text-sm text-muted-foreground leading-relaxed">
    説明テキスト
  </p>
</Card>

{/* コンパクトカード */}
<Card className="p-4">                    {/* 内部パディング: 16px */}
  <div className="flex items-center gap-2 mb-3">
    <Icon className="h-5 w-5" />
    <h4 className="text-base font-medium">タイトル</h4>
  </div>
  <p className="text-sm text-muted-foreground">説明</p>
</Card>

{/* ゆったりカード（feature セクション等） */}
<Card className="p-8 md:p-10">           {/* 内部パディング: 32px 〜 40px */}
  <div className="mb-6">
    <Icon className="h-10 w-10 text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-2">タイトル</h3>
    <p className="text-base text-muted-foreground leading-[1.8]">
      詳しい説明テキストが入ります。
    </p>
  </div>
</Card>
```

### 4-5. 内部 <= 外部ルール（Gestalt の近接原則）

**カード内の要素間隔（内部）は、カード間の間隔（外部）以下とする。**

```
-- 正しい例 --
カード内パディング: p-6 (24px)
カード間ギャップ:   gap-6 (24px) or gap-8 (32px)
→ 内部 24px <= 外部 24〜32px ✓

-- 誤った例 --
カード内パディング: p-8 (32px)
カード間ギャップ:   gap-4 (16px)
→ 内部 32px > 外部 16px ✗ → カードの境界が曖昧に
```

---

## 5. ビジュアル階層テクニック

### 5-1. 5つの階層ツール

#### 1. サイズコントラスト（Size）

最も直感的な階層ツール。見出しと本文のサイズ差を明確にする。

```jsx
{/* 強い階層 */}
<h2 className="text-3xl md:text-4xl font-bold">セクション見出し</h2>   {/* 30〜36px */}
<p className="text-base text-muted-foreground">説明テキスト</p>         {/* 16px */}
{/* サイズ比: 1.875〜2.25 : 1 → 十分なコントラスト */}

{/* 弱い階層（問題あり） */}
<h2 className="text-lg font-bold">セクション見出し</h2>                 {/* 18px */}
<p className="text-base">説明テキスト</p>                              {/* 16px */}
{/* サイズ比: 1.125 : 1 → ほぼ差がない → 避ける */}
```

**ルール**: 見出しと本文のサイズ比は最低 1.5:1 以上を確保する。

#### 2. ウェイトコントラスト（Weight）

```jsx
{/* ウェイトによる階層 */}
<h3 className="text-xl font-bold">重要な見出し</h3>          {/* 700 */}
<h4 className="text-lg font-semibold">やや重要</h4>           {/* 600 */}
<p className="text-base font-normal">通常テキスト</p>          {/* 400 */}
<span className="text-sm font-light">補助テキスト</span>       {/* 300 */}
```

**Tailwind ウェイトクラス**:
| クラス | weight | 用途 |
|---|---|---|
| `font-light` | 300 | 大きな見出しの軽い表現 |
| `font-normal` | 400 | 本文テキスト |
| `font-medium` | 500 | やや強調。カードタイトル |
| `font-semibold` | 600 | サブ見出し、ボタンラベル |
| `font-bold` | 700 | 見出し、強い強調 |
| `font-extrabold` | 800 | Hero 見出し（theme-big-typography） |
| `font-black` | 900 | 極太。theme-brutal 向け |

#### 3. カラーコントラスト（Color）

```jsx
{/* 色による優先度表現 */}
<h2 className="text-foreground">最重要テキスト</h2>           {/* 最も濃い */}
<p className="text-foreground/80">やや重要</p>                {/* 80% 不透明度 */}
<p className="text-muted-foreground">補助テキスト</p>          {/* グレー */}
<span className="text-muted-foreground/60">最低優先度</span>   {/* 薄いグレー */}

{/* アクセントカラーで注目を集める */}
<span className="text-primary font-semibold">重要なキーワード</span>
<Badge className="bg-primary text-primary-foreground">NEW</Badge>
```

**3段階テキスト色ルール**:
1. `text-foreground` — 見出し、重要テキスト
2. `text-foreground/80` or `text-muted-foreground` — 本文、説明
3. `text-muted-foreground/60` — キャプション、タイムスタンプ、メタ情報

#### 4. スペーシングによる階層

```jsx
{/* 余白で重要度を示す */}
<section className="py-24">           {/* 大きなセクション = 重要 */}
  <h2 className="mb-6">見出し</h2>    {/* 見出しの下に 24px の間 */}
  <p className="mb-4">段落1</p>       {/* 段落間は 16px */}
  <p className="mb-4">段落2</p>
</section>

{/* 密な配置 = まとまり感 */}
<div className="space-y-2">           {/* 8px 間隔 → 密接な関連 */}
  <Label>お名前</Label>
  <Input />
  <p className="text-xs text-muted-foreground">氏名をご記入ください</p>
</div>
```

#### 5. アラインメント（スキャニングパターン）

**F パターン（テキスト中心レイアウト）**:
```
┌──────────────────────────────────┐
│ ████████████████████████████████ │ ← 1行目: 横に読む
│ ████████████████                 │ ← 2行目: やや短く横に読む
│ ████                             │
│ ████████████                     │ ← 左端を縦にスキャン
│ ████                             │
│ ████████                         │
└──────────────────────────────────┘
```

適用: テキスト中心のページ（会社概要、ブログ、FAQ）。左揃えで構成。

**Z パターン（ビジュアル中心レイアウト）**:
```
┌──────────────────────────────────┐
│ [ロゴ]──────────────→[CTA]      │ ← 上辺を横にスキャン
│        ↘                        │
│           ↘                     │ ← 対角線に視線移動
│              ↘                  │
│ [見出し]────────────→[ボタン]   │ ← 下辺を横にスキャン
└──────────────────────────────────┘
```

適用: Hero セクション、LP。重要な CTA を右上と右下に配置。

### 5-2. 階層チェックリスト（ブラーテスト）

デザインをぼかしても以下が判別できるか確認:
1. どこが見出しか分かる（サイズ + ウェイト）
2. CTA ボタンの位置が分かる（色 + サイズ）
3. セクションの区切りが分かる（余白 + 背景色）
4. ナビゲーションが見える（位置 + コントラスト）

---

## 6. アイコンシステム

### 6-1. Lucide Icons（shadcn/ui 推奨）

Lucide は shadcn/ui の推奨アイコンセット。24x24 グリッドで設計、2px のパディングエリア含む。

### 6-2. サイズ規約

| 用途 | サイズ | Tailwind クラス | 備考 |
|---|---|---|---|
| インラインテキスト | 16px | `h-4 w-4` | テキスト内のアイコン。`text-sm` 相当 |
| ボタン内 | 16〜20px | `h-4 w-4` 〜 `h-5 w-5` | ボタンラベルの左右に配置 |
| リスト項目 | 20px | `h-5 w-5` | メニュー、ナビゲーション項目 |
| カードアイコン | 24px | `h-6 w-6` | カード内の機能アイコン |
| フィーチャーアイコン | 32〜40px | `h-8 w-8` 〜 `h-10 w-10` | サービスカード、機能紹介 |
| Hero フィーチャー | 40〜48px | `h-10 w-10` 〜 `h-12 w-12` | 大きな特徴紹介 |

**テキストサイズとの対応**:

| テキストサイズ | line-height | 推奨アイコンサイズ |
|---|---|---|
| `text-xs` (12px) | 16px | `h-4 w-4` (16px) |
| `text-sm` (14px) | 20px | `h-4 w-4` or `h-5 w-5` (16〜20px) |
| `text-base` (16px) | 24px | `h-5 w-5` or `h-6 w-6` (20〜24px) |
| `text-lg` (18px) | 28px | `h-6 w-6` (24px) |
| `text-xl` (20px) | 28px | `h-6 w-6` (24px) |

### 6-3. アイコン + テキストの配置パターン

```jsx
{/* インラインアイコン（ボタン） */}
<Button className="gap-2">
  <Mail className="h-4 w-4" />
  お問い合わせ
</Button>

{/* インラインアイコン（テキスト内） */}
<span className="inline-flex items-center gap-1.5">
  <Phone className="h-4 w-4" />
  <span className="text-sm">03-xxxx-xxxx</span>
</span>

{/* カード内アイコン（上配置） */}
<div className="flex flex-col items-start">
  <div className="mb-4 rounded-lg bg-primary/10 p-3">
    <Zap className="h-6 w-6 text-primary" />
  </div>
  <h3 className="text-lg font-semibold mb-2">機能名</h3>
  <p className="text-sm text-muted-foreground">説明文</p>
</div>

{/* リスト項目（左アイコン） */}
<div className="flex items-start gap-3">
  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
  <span className="text-base">テキスト内容がここに入ります</span>
</div>

{/* フィーチャー（大きなアイコン、中央配置） */}
<div className="text-center">
  <div className="mx-auto mb-6 rounded-2xl bg-primary/10 p-4 w-fit">
    <Shield className="h-10 w-10 text-primary" />
  </div>
  <h3 className="text-xl font-semibold mb-3">セキュリティ</h3>
  <p className="text-muted-foreground max-w-xs mx-auto">
    エンタープライズグレードのセキュリティで安心
  </p>
</div>
```

### 6-4. アイコンスタイルの使い分け

| スタイル | 推奨場面 | テーマとの相性 |
|---|---|---|
| **Outline（線画）** | ナビ、ボタン、カード、UI全般 | minimal-corporate, modern-saas, editorial-lux, glass |
| **Solid（塗り）** | 強調、アクティブ状態、装飾 | pop-illustration, brutal |
| **Outline + 背景バッジ** | フィーチャーアイコン | modern-saas, glass |

**一貫性ルール**:
- 1つのセクション内で outline と solid を混在させない
- `stroke="currentColor"` を使い、テキストカラーを継承させる
- インタラクティブアイコンは最低 44x44px のタッチターゲットを確保

```jsx
{/* Outline + 背景バッジ（フィーチャー用） */}
<div className="rounded-xl bg-primary/10 p-3 w-fit">
  <Lightbulb className="h-6 w-6 text-primary" />
</div>

{/* Outline（ナビゲーション） */}
<Menu className="h-6 w-6 text-foreground" />

{/* currentColor 継承 */}
<Button variant="ghost" className="text-muted-foreground hover:text-foreground">
  <Settings className="h-4 w-4" />  {/* 親の text-color を継承 */}
</Button>
```

### 6-5. よく使うアイコン（Lucide）業種別

#### 全業種共通
- `Menu`, `X` — ハンバーガーメニュー開閉
- `ChevronRight`, `ChevronDown` — ナビ、アコーディオン
- `ArrowRight` — CTA「→」
- `Mail`, `Phone`, `MapPin` — コンタクト情報
- `ExternalLink` — 外部リンク

#### IT / SaaS
- `Zap`, `Rocket`, `Code`, `Server`, `Shield`, `Lock`, `BarChart3`, `Workflow`

#### コンサルティング / 士業
- `Briefcase`, `Scale`, `FileText`, `Users`, `TrendingUp`, `Target`

#### 医療 / ヘルスケア
- `Heart`, `Activity`, `Stethoscope`, `ShieldCheck`, `Clock`

#### 飲食 / 店舗
- `UtensilsCrossed`, `Clock`, `MapPin`, `Star`, `Calendar`

#### 建築 / 不動産
- `Building2`, `Ruler`, `Layers`, `Home`, `Compass`

#### 教育
- `GraduationCap`, `BookOpen`, `Lightbulb`, `Users`, `Award`

---

## 7. 総合実装リファレンス

### 7-1. セクション構造テンプレート

```jsx
{/* 標準セクション */}
<section className="py-16 md:py-24 lg:py-32">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {/* セクションヘッダー */}
    <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
        セクション見出し
      </h2>
      <p className="text-base md:text-lg text-muted-foreground leading-[1.8]">
        セクションの説明文が入ります。
      </p>
    </div>

    {/* コンテンツグリッド */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {/* カード */}
    </div>
  </div>
</section>

{/* 背景色つきセクション（交互に使用） */}
<section className="py-16 md:py-24 lg:py-32 bg-muted/50">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {/* 内容 */}
  </div>
</section>
```

### 7-2. テーマ別クイックリファレンス

| 設定項目 | minimal-corporate | modern-saas | big-typography | editorial-lux | brutal |
|---|---|---|---|---|---|
| 見出しフォント | sans-serif | sans-serif | sans-serif | serif | sans-serif |
| 見出しウェイト | bold (700) | bold (700) | extrabold (800) | bold (700) | black (900) |
| 角丸 | rounded-xl | rounded-2xl | rounded-xl | rounded-lg | rounded-none |
| 影 | shadow-sm | shadow-md | shadow-none | shadow-none | shadow-[4px_4px_0_0] |
| セクション余白 | py-16 md:py-24 lg:py-32 | py-12 md:py-20 lg:py-24 | py-20 md:py-32 lg:py-40 | py-16 md:py-24 lg:py-32 | py-12 md:py-16 lg:py-20 |
| 行間 | leading-[1.8] | leading-relaxed | leading-relaxed | leading-loose | leading-normal |
| Primary 系統 | ブルー | パープル | スカイブルー | ダークグレー | ブラック |
| アイコンスタイル | outline | outline+badge | outline | outline | solid |

---

## 参考情報

### タイポグラフィ
- Tailwind CSS Font Size: https://tailwindcss.com/docs/font-size
- Modular Scale: https://www.b12.io/glossary-of-web-design-terms/typographic-scale/
- Type Scale in Tailwind: https://www.subframe.com/blog/creating-a-type-scale-in-tailwind-css
- Japanese Web Typography: https://mhdigital.llc/web-typography-in-japanese/
- Japanese Typography Rules: https://medium.com/aq-writes/seven-rules-for-perfect-japanese-typography-c377fbf49d5

### カラーシステム
- shadcn/ui Theming: https://ui.shadcn.com/docs/theming
- shadcn/ui Colors: https://ui.shadcn.com/colors
- Japanese Colour Psychology (ULPA): https://www.ulpa.jp/post/japanese-colour-psychology-your-complete-guide-to-using-colour-in-marketing-in-japan
- Color Psychology in Branding: https://www.ignytebrands.com/the-psychology-of-color-in-branding/
- WCAG Contrast Checker: https://webaim.org/resources/contrastchecker/
- InclusiveColors: https://www.inclusivecolors.com/

### スペーシング
- 4px Grid System: https://blog.designary.com/p/layout-basics-grid-systems-and-the-4px-grid
- Spacing Best Practices: https://cieden.com/book/sub-atomic/spacing/spacing-best-practices

### アイコン
- Lucide Sizing: https://lucide.dev/guide/basics/sizing
- Lucide Design Guide: https://lucide.dev/guide/design/icon-design-guide
- Icon Best Practices: https://www.koalaui.com/blog/ultimate-guide-best-practices-icons-2024

### ビジュアル階層
- Visual Hierarchy (IxDF): https://www.interaction-design.org/literature/topics/visual-hierarchy
- Visual Hierarchy in Web Design (Clay): https://clay.global/blog/web-design-guide/visual-hierarchy-web-design
