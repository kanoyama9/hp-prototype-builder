# タイポグラフィ＆カラーシステム設計ガイド

プロトタイプ生成時のフォント、色、スペーシング、視覚階層の設計基準。

---

## 1. タイポグラフィスケールシステム

### 1-1. モジュラースケール

フォントサイズの比率で一貫性のあるタイポグラフィを構築する。

| 比率名 | 値 | 特徴 | 適合テーマ |
|---|---|---|---|
| Minor Second | 1.067 | 微差。密度の高い情報サイト | IR, データ密集 |
| Major Second | 1.125 | 穏やか。コーポレート向き | theme-minimal-corporate |
| Minor Third | 1.200 | バランス良い。汎用的 | theme-modern-saas |
| Major Third | 1.250 | やや大胆。SaaS/LP向き | theme-glass |
| Perfect Fourth | 1.333 | コントラスト強め。タイポ重視 | theme-big-typography |
| Golden Ratio | 1.618 | 非常に大胆。実験的 | theme-brutal |

### 1-2. Tailwind デフォルトスケールの活用

| クラス | サイズ | 用途 |
|---|---|---|
| `text-xs` | 12px (0.75rem) | キャプション、バッジ、注釈 |
| `text-sm` | 14px (0.875rem) | 補助テキスト、フォームラベル、フッター |
| `text-base` | 16px (1rem) | 本文テキスト（日本語の基準サイズ） |
| `text-lg` | 18px (1.125rem) | リード文、重要な本文 |
| `text-xl` | 20px (1.25rem) | カード見出し、サブセクション |
| `text-2xl` | 24px (1.5rem) | セクション内見出し、h3 |
| `text-3xl` | 30px (1.875rem) | セクション見出し、h2（モバイル） |
| `text-4xl` | 36px (2.25rem) | セクション見出し、h2（デスクトップ） |
| `text-5xl` | 48px (3rem) | ページ見出し、Hero（モバイル） |
| `text-6xl` | 60px (3.75rem) | Hero 見出し（デスクトップ） |
| `text-7xl` | 72px (4.5rem) | 大型 Hero |
| `text-8xl` | 96px (6rem) | フルスクリーン Hero |

### 1-3. 見出し階層の推奨設定

#### コーポレート標準（theme-minimal-corporate, theme-editorial-lux）
```css
h1 { @apply text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight; }
h2 { @apply text-2xl md:text-3xl font-bold tracking-tight leading-snug; }
h3 { @apply text-xl md:text-2xl font-semibold leading-snug; }
h4 { @apply text-lg font-semibold leading-normal; }
```

#### タイポ重視（theme-big-typography）
```css
h1 { @apply text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none; }
h2 { @apply text-3xl md:text-5xl font-bold tracking-tight leading-tight; }
h3 { @apply text-2xl md:text-3xl font-bold tracking-tight leading-snug; }
h4 { @apply text-xl font-semibold leading-normal; }
```

#### SaaS/モダン（theme-modern-saas, theme-dark-pro）
```css
h1 { @apply text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight; }
h2 { @apply text-2xl md:text-4xl font-bold tracking-tight leading-snug; }
h3 { @apply text-xl md:text-2xl font-semibold leading-snug; }
h4 { @apply text-lg font-medium leading-normal; }
```

### 1-4. 行間（line-height）設計

| コンテキスト | 英語 | 日本語 | Tailwind |
|---|---|---|---|
| 大見出し（Hero） | 1.0〜1.1 | 1.1〜1.2 | `leading-none` or `leading-tight` |
| セクション見出し | 1.2〜1.3 | 1.3〜1.4 | `leading-snug` |
| 本文 | 1.5〜1.6 | 1.75〜2.0 | `leading-relaxed` or custom |
| 注釈・キャプション | 1.4〜1.5 | 1.5〜1.6 | `leading-normal` |

**重要**: 日本語テキストは漢字・ひらがな・カタカナが混在し、文字の上下が詰まりやすい。本文では `leading-[1.875]` 程度が読みやすい。

### 1-5. 字間（letter-spacing）

| コンテキスト | 英語 | 日本語 | Tailwind |
|---|---|---|---|
| 大見出し | -0.02〜-0.04em | 0〜0.02em | `tracking-tight` or `tracking-tighter` |
| セクション見出し | -0.01〜-0.02em | 0〜0.02em | `tracking-tight` |
| 本文 | 0 | 0.02〜0.05em | `tracking-normal` or `tracking-wide` |
| ボタン / ラベル | 0.02〜0.05em | 0.05〜0.1em | `tracking-wide` or `tracking-wider` |

**日本語の字間**:
```css
/* 見出し：palt で自動調整 */
h1, h2, h3 {
  font-feature-settings: "palt" 1;
  letter-spacing: 0.02em;
}

/* 本文：やや広めが読みやすい */
body {
  letter-spacing: 0.04em;
}
```

---

## 2. フォントペアリング

### 2-1. 推奨ペアリング

#### ペア1: サンセリフ統一（最も安全）
```
見出し: Noto Sans JP Bold (700)
本文:   Noto Sans JP Regular (400)
```
- **適合**: 全テーマで使用可能
- **特徴**: 可読性が高く、クリーンな印象

#### ペア2: セリフ見出し + サンセリフ本文（上質）
```
見出し: Noto Serif JP Bold (700) or Medium (500)
本文:   Noto Sans JP Regular (400)
```
- **適合**: theme-editorial-lux
- **特徴**: 格式・上質感。雑誌のような印象

#### ペア3: 太サンセリフ見出し + 軽サンセリフ本文（モダン）
```
見出し: Noto Sans JP Black (900) or ExtraBold (800)
本文:   Noto Sans JP Light (300) or Regular (400)
```
- **適合**: theme-big-typography, theme-brutal
- **特徴**: コントラスト大。インパクト重視

#### ペア4: システムフォントのみ（パフォーマンス最優先）
```
全体: system-ui, -apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif
```
- **適合**: パフォーマンス重視、MVPプロトタイプ
- **特徴**: フォント読み込みゼロ、CLS なし

### 2-2. Google Fonts ロード最適化

```html
<!-- Noto Sans JP: 必要なウェイトのみ -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

**ベストプラクティス**:
- 使用するウェイトだけ読み込む（400, 500, 700 で十分なことが多い）
- `display=swap` で FOIT（Flash of Invisible Text）を防ぐ
- 日本語フォントは英語フォントより大きい（1ウェイトで 1-4MB）
- 可能なら `unicode-range` でサブセット化

---

## 3. カラーシステム設計

### 3-1. ブランドカラーからの完全パレット生成

1つのブランドカラーから shadcn/ui 互換のフルパレットを生成する方法。

#### ステップ1: ブランドカラーを Primary に設定
```
ブランドカラー: #2563eb (blue-600)
↓
primary: #2563eb
primary-foreground: #ffffff (白に十分なコントラストがあれば白)
```

#### ステップ2: 補色・類似色の生成
```
Secondary: Primary を大幅に薄めた色（背景用）
  → primary の hue + 彩度10% + 明度95% ≈ #f1f5f9
Accent: Primary の明るい版
  → primary の hue + 彩度20% + 明度90% ≈ #dbeafe
Muted: ニュートラルグレーの極薄版
  → #f8fafc (slate-50)
Destructive: 赤系（固定で良い）
  → #dc2626 (red-600)
```

#### ステップ3: ダークモード版の生成
```
ライト → ダーク変換ルール:
- background: 白 → 暗い色（#05070d〜#0b1220）
- foreground: 暗い → 明るい（#e2e8f0〜#e5e7eb）
- primary: 同色 or やや明るく（明度+15%）
- card: 背景より1段明るい暗色
- border: 非常に暗いグレー（#1f2937〜#1f2a44）
- muted: 背景より1段明るい暗色
```

#### 色生成のHSL操作テーブル

| トークン | ライト生成ルール | ダーク生成ルール |
|---|---|---|
| background | H:0 S:0 L:100 (白) | H:brandH S:30 L:5-7 |
| foreground | H:brandH S:40 L:10-15 | H:brandH S:10 L:88-92 |
| primary | ブランドカラーそのまま | ブランドH S:-10 L:+15 |
| primary-fg | L:100 (白) or L:5 (黒) | L:5-7 |
| secondary | H:brandH S:10 L:95-97 | H:brandH S:15 L:8-12 |
| muted | H:brandH S:5 L:97-99 | H:brandH S:15 L:8-12 |
| muted-fg | H:brandH S:15 L:40-50 | H:brandH S:10 L:60-65 |
| accent | H:brandH S:30 L:88-92 | H:brandH S:60 L:30-40 |
| border | H:brandH S:15 L:88-92 | H:brandH S:15 L:15-20 |

### 3-2. shadcn/ui カラートークン（HSL形式）

shadcn/ui は HSL 形式でカラーを定義する（`hsl(var(--primary))`）。

**HEX → HSL 変換と CSS変数への落とし方**:
```css
/* HEX: #2563eb → HSL: 217 91% 60% */
:root {
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
}

/* 使用時 */
.bg-primary { background-color: hsl(var(--primary)); }
.text-primary-foreground { color: hsl(var(--primary-foreground)); }
```

**全トークンテンプレート**:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 98%;
  --muted-foreground: 215 16% 47%;
  --accent: 214 95% 93%;
  --accent-foreground: 222 47% 11%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 217 91% 60%;
  --radius: 0.75rem;
}

.dark {
  --background: 222 47% 5%;
  --foreground: 210 40% 92%;
  --card: 222 47% 7%;
  --card-foreground: 210 40% 92%;
  --popover: 222 47% 7%;
  --popover-foreground: 210 40% 92%;
  --primary: 213 94% 68%;
  --primary-foreground: 222 47% 5%;
  --secondary: 222 47% 10%;
  --secondary-foreground: 210 40% 92%;
  --muted: 222 47% 10%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 91% 40%;
  --accent-foreground: 210 40% 92%;
  --destructive: 0 63% 70%;
  --destructive-foreground: 222 47% 5%;
  --border: 217 33% 15%;
  --input: 217 33% 15%;
  --ring: 213 94% 68%;
}
```

### 3-3. Theme Blueprint トークンの HEX → HSL 変換

Blueprint の JSON は HEX で定義されているので、実装時に HSL に変換する。

```js
// HEX → HSL 変換ユーティリティ
function hexToHSL(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// 使用例
// hexToHSL("#1e40af") → "224 69% 40%"
```

---

## 4. スペーシングシステム

### 4-1. 4px / 8px グリッド

全てのスペーシングを 4px 単位で管理する。

| Tailwindクラス | px | 用途 |
|---|---|---|
| `p-1` / `gap-1` | 4px | アイコンとテキストの間 |
| `p-1.5` / `gap-1.5` | 6px | バッジ内パディング |
| `p-2` / `gap-2` | 8px | ボタン内パディング（小）、リスト項目間 |
| `p-3` / `gap-3` | 12px | フォーム要素間 |
| `p-4` / `gap-4` | 16px | カード内パディング（小）、グリッド間（小） |
| `p-6` / `gap-6` | 24px | カード内パディング（標準）、グリッド間（標準） |
| `p-8` / `gap-8` | 32px | カード内パディング（大）、グリッド間（大） |
| `p-12` / `gap-12` | 48px | セクション間（モバイル） |
| `p-16` | 64px | セクション間（タブレット） |
| `p-20` | 80px | セクション間（デスクトップ） |
| `p-24` | 96px | セクション間（大画面） |
| `p-32` | 128px | セクション間（特大余白テーマ） |

### 4-2. セクション間スペーシング（テーマ別）

| テーマ | spacingDensity | モバイル | タブレット | デスクトップ |
|---|---|---|---|---|
| theme-minimal-corporate | airy | py-16 | py-20 | py-24 |
| theme-modern-saas | standard | py-12 | py-16 | py-20 |
| theme-big-typography | airy | py-20 | py-28 | py-36 |
| theme-glass | standard | py-12 | py-16 | py-20 |
| theme-brutal | standard | py-12 | py-16 | py-20 |
| theme-editorial-lux | airy | py-16 | py-24 | py-32 |
| theme-pop-illustration | standard | py-12 | py-16 | py-20 |
| theme-dark-pro | standard | py-12 | py-16 | py-20 |

### 4-3. コンテナ幅

| 用途 | Tailwindクラス | 最大幅 | 使用箇所 |
|---|---|---|---|
| 本文（読み物） | `max-w-prose` | 65ch (≈720px) | ブログ、プライバシーポリシー |
| ナロー | `max-w-2xl` | 672px | FAQ、フォーム |
| セミナロー | `max-w-3xl` | 768px | プロフィール、MVP |
| スタンダード | `max-w-5xl` | 1024px | 一般的なコンテンツ |
| ワイド | `max-w-6xl` | 1152px | 通常のセクション |
| フルワイド | `max-w-7xl` | 1280px | グリッドレイアウト |
| 制限なし | `max-w-full px-4 md:px-8` | 100% + padding | フルブリードHero |

### 4-4. カード内スペーシング

| コンテキスト | パディング | 要素間 |
|---|---|---|
| コンパクト（リスト内） | `p-3` or `p-4` | `gap-2` |
| 標準（機能カード） | `p-6` | `gap-4` |
| 大（Pricing/CTA） | `p-8` | `gap-6` |
| ヒーロー（セクション内） | `p-8 md:p-12` | `gap-6 md:gap-8` |

---

## 5. 視覚階層テクニック

### 5-1. 階層の4つの手段

1. **サイズ**: 見出し > 本文 > 注釈
2. **ウェイト**: bold > medium > regular > light
3. **色**: foreground > muted-foreground > muted-foreground/60
4. **間隔**: 関連要素は近く、非関連は離す（近接の法則）

### 5-2. テキストの色階層

```
最高: text-foreground          → 見出し、重要テキスト
高:   text-foreground          → 本文
中:   text-muted-foreground    → 補助テキスト、ラベル
低:   text-muted-foreground/60 → 注釈、日付、出典
最低: text-muted-foreground/40 → 装飾テキスト、ウォーターマーク
```

### 5-3. 視覚的ウェイトの順序

```
Primary ボタン   → 最高（bg-primary + text-primary-foreground）
Secondary ボタン → 高（bg-secondary + text-secondary-foreground）
Outline ボタン   → 中（border + text-foreground）
Ghost ボタン     → 低（text-foreground のみ、hover で bg）
Link テキスト    → 中低（text-primary + underline）
通常テキスト     → ベースライン
Muted テキスト   → 低（text-muted-foreground）
```

### 5-4. F パターンとZ パターン

#### Fパターン（テキスト中心ページ）
```
━━━━━━━━━━━━━━━━━  ← 最初の水平スキャン（ヘッダー/Hero）
┃
━━━━━━━━━━━━        ← 2番目の水平スキャン（サブヘッダー）
┃
┃                      ← 縦方向のスキャン（左寄りのコンテンツを流し読み）
┃
```
- **適合**: コーポレートサイト、ブログ、ニュース
- **設計**: 重要情報は左上、見出しは左揃え

#### Zパターン（ビジュアル中心ページ）
```
1 ━━━━━━━━━━━━━━━━ 2  ← 左上から右上
  ╲                ╱
   ╲              ╱
    ╲            ╱     ← 対角線でスキャン
     ╲          ╱
3 ━━━━━━━━━━━━━━━━ 4  ← 左下から右下
```
- **適合**: LP、Hero セクション
- **設計**: 左上にロゴ、右上にCTA、中央にメイン訴求、左下に詳細、右下にアクション

### 5-5. ホワイトスペースの活用

| 効果 | 実装 |
|---|---|
| 高級感を出す | セクション間余白を広く（py-24〜py-32） |
| 読みやすさを上げる | 本文の max-w を狭く（max-w-prose） |
| グループ化を示す | 関連要素間は狭く（gap-2〜4）、グループ間は広く（gap-8〜12） |
| CTAを目立たせる | CTA の上下に大きな余白（my-8〜12） |
| 呼吸感を出す | セクション内のパディングを十分に取る（p-8〜12） |

---

## 6. アイコンシステム

### 6-1. Lucide Icons（推奨）

shadcn/ui のデフォルトアイコンセット。一貫した outline スタイル。

```jsx
import {
  ArrowRight, Check, ChevronDown, ChevronRight, ChevronUp,
  ExternalLink, Mail, MapPin, Menu, Moon, Phone, Search,
  Sun, X, Clock, Users, Building2, Briefcase, Shield,
  Star, Heart, Zap, Globe, Code, MessageCircle, Calendar
} from "lucide-react";
```

### 6-2. サイズ規約

| コンテキスト | サイズ | Lucide `size` |
|---|---|---|
| インライン（テキスト横） | 14-16px | 14 or 16 |
| ボタン内 | 16-18px | 16 or 18 |
| リスト項目 | 20px | 20 |
| 機能カード（小） | 24px | 24 |
| 機能カード（大） | 32-40px | 32 or 40 |
| ヒーロー機能 | 48px | 48 |

### 6-3. アイコン装飾パターン

```jsx
// パターンA: 丸背景
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
  <Zap className="text-primary" size={24} />
</div>

// パターンB: 角丸背景
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
  <Zap className="text-primary" size={24} />
</div>

// パターンC: ボーダー
<div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center">
  <Zap className="text-primary" size={24} />
</div>

// パターンD: アイコンのみ（ミニマル）
<Zap className="text-primary" size={32} />
```

### 6-4. テーマ別アイコンスタイル

| テーマ | iconStyle | 推奨表示 |
|---|---|---|
| theme-minimal-corporate | outline | パターンA（丸背景） |
| theme-modern-saas | outline | パターンB（角丸背景） |
| theme-big-typography | outline | パターンD（アイコンのみ） |
| theme-glass | outline | パターンA + backdrop-blur |
| theme-brutal | solid | パターンD + 太線 (strokeWidth=3) |
| theme-editorial-lux | outline | パターンD（小さめ、控えめ） |
| theme-pop-illustration | solid | パターンA（カラフル背景） |
| theme-dark-pro | outline | パターンC（ボーダー + glow） |

---

## 7. 影（Shadow）システム

### 7-1. テーマ別影の使い方

| テーマ | shadowStrength | 実装 |
|---|---|---|
| theme-minimal-corporate | soft | `shadow-sm` or `shadow` |
| theme-modern-saas | soft | `shadow-sm hover:shadow-md` |
| theme-big-typography | soft | `shadow-none` or `shadow-sm` |
| theme-glass | soft | `shadow-xl shadow-black/5` |
| theme-brutal | none | `shadow-[4px_4px_0_0_#000]` |
| theme-editorial-lux | soft | `shadow-none` or `shadow-sm` |
| theme-pop-illustration | soft | `shadow-md` |
| theme-dark-pro | soft | `shadow-none` or `shadow-lg shadow-black/20` |

### 7-2. 影のテクニック

```css
/* 自然な影（上方光源） */
.natural-shadow {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 6px rgba(0, 0, 0, 0.05);
}

/* 浮遊影（ホバー用） */
.floating-shadow {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 10px 15px rgba(0, 0, 0, 0.1);
}

/* ダークモードの影 */
.dark .card-shadow {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.3),
    0 10px 15px rgba(0, 0, 0, 0.2);
}

/* Brutal影（オフセット） */
.brutal-shadow {
  box-shadow: 4px 4px 0 0 hsl(var(--foreground));
}
.brutal-shadow:hover {
  box-shadow: 2px 2px 0 0 hsl(var(--foreground));
  transform: translate(2px, 2px);
}

/* カラー影（Primary色の影） */
.color-shadow {
  box-shadow: 0 10px 30px hsl(var(--primary) / 0.2);
}
```

---

## 8. 角丸（Border Radius）システム

### 8-1. テーマ別角丸

| テーマ | cornerRadius | --radius | Tailwind |
|---|---|---|---|
| theme-minimal-corporate | soft | 0.75rem | `rounded-xl` |
| theme-modern-saas | round | 1rem | `rounded-2xl` |
| theme-big-typography | soft | 0.75rem | `rounded-xl` |
| theme-glass | round | 1rem | `rounded-2xl` |
| theme-brutal | sharp | 0px | `rounded-none` |
| theme-editorial-lux | soft | 0.75rem | `rounded-xl` |
| theme-pop-illustration | round | 1rem | `rounded-2xl` |
| theme-dark-pro | soft | 0.75rem | `rounded-xl` |

### 8-2. 要素別角丸ガイド

| 要素 | 計算 | 例（--radius: 0.75rem） |
|---|---|---|
| ボタン | --radius | `rounded-xl` (12px) |
| カード | --radius | `rounded-xl` (12px) |
| 入力フィールド | --radius * 0.67 | `rounded-lg` (8px) |
| バッジ / タグ | --radius * 0.5 | `rounded-md` (6px) |
| アバター | 50% | `rounded-full` |
| モーダル | --radius * 1.33 | `rounded-2xl` (16px) |
| 画像（Hero） | --radius | `rounded-xl` (12px) |
| セクション内カード | --radius | `rounded-xl` (12px) |

---

## 9. レスポンシブタイポグラフィ

### 9-1. clamp() によるフルード・タイポグラフィ

```css
/* 画面幅に応じて滑らかにスケールする見出し */
h1 {
  /* clamp(最小値, 理想値, 最大値) */
  font-size: clamp(2rem, 5vw, 4rem);
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}
```

**Tailwind での近似**:
```html
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">見出し</h1>
```

### 9-2. コンテナクエリ対応

```css
/* コンテナクエリでカード内テキストを調整 */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-title { font-size: 1.5rem; }
}
@container (max-width: 399px) {
  .card-title { font-size: 1.125rem; }
}
```

---

## 10. テーマ別完全リファレンス

### theme-minimal-corporate
```
フォント:    sans / sans
見出しサイズ: text-3xl → text-5xl
行間:        leading-relaxed (1.625)
字間:        tracking-normal
角丸:        0.75rem (rounded-xl)
影:          shadow-sm
スペーシング: py-16 md:py-24 (airy)
Primary:     #1e40af (blue-800)
Motion:      subtle (fade-in only)
```

### theme-modern-saas
```
フォント:    sans / sans
見出しサイズ: text-4xl → text-6xl
行間:        leading-normal (1.5)
字間:        tracking-normal
角丸:        1rem (rounded-2xl)
影:          shadow-sm → hover:shadow-md
スペーシング: py-12 md:py-20 (standard)
Primary:     #7c3aed (violet-600)
Motion:      standard (fade-in + slide-up + stagger)
```

### theme-big-typography
```
フォント:    sans / sans
見出しサイズ: text-5xl → text-8xl
行間:        leading-relaxed (1.625)
字間:        tracking-tight (-0.025em)
角丸:        0.75rem (rounded-xl)
影:          shadow-none
スペーシング: py-20 md:py-36 (airy+)
Primary:     #0ea5e9 (sky-500)
Motion:      subtle (fade-in only)
```

### theme-glass
```
フォント:    sans / sans
見出しサイズ: text-4xl → text-5xl
行間:        leading-normal (1.5)
字間:        tracking-normal
角丸:        1rem (rounded-2xl)
影:          shadow-xl shadow-black/5
スペーシング: py-12 md:py-20 (standard)
Primary:     #16a34a (green-600)
Motion:      standard
特殊:        backdrop-blur-2xl, bg-white/65
```

### theme-brutal
```
フォント:    sans / sans (太めウェイト)
見出しサイズ: text-4xl → text-6xl
行間:        leading-normal (1.5)
字間:        tracking-normal
角丸:        0px (rounded-none)
影:          shadow-[4px_4px_0_0_#000]
スペーシング: py-12 md:py-20 (standard)
Primary:     #000000 (black)
Accent:      #fde047 (yellow-300)
Motion:      none
特殊:        border-2 border-black
```

### theme-editorial-lux
```
フォント:    serif(見出し) / sans(本文)
見出しサイズ: text-3xl → text-5xl
行間:        leading-relaxed (1.625)
字間:        tracking-normal
角丸:        0.75rem (rounded-xl)
影:          shadow-none → shadow-sm
スペーシング: py-16 md:py-32 (airy++)
Primary:     #111827 (gray-900)
Motion:      subtle
特殊:        写真はdesaturated, セリフ見出し
```

### theme-pop-illustration
```
フォント:    sans / sans
見出しサイズ: text-3xl → text-5xl
行間:        leading-normal (1.5)
字間:        tracking-normal
角丸:        1rem (rounded-2xl)
影:          shadow-md
スペーシング: py-12 md:py-20 (standard)
Primary:     #f97316 (orange-500)
Accent:      #a7f3d0 (emerald-200)
Motion:      standard (bouncy)
特殊:        暖色系背景, フラットイラスト前提
```

### theme-dark-pro
```
フォント:    sans / sans
見出しサイズ: text-4xl → text-6xl
行間:        leading-normal (1.5)
字間:        tracking-normal
角丸:        0.75rem (rounded-xl)
影:          shadow-none (glow代用)
スペーシング: py-12 md:py-20 (standard)
Primary:     #22d3ee (cyan-400)
Motion:      subtle
特殊:        ダークモードデフォルト, glow effect, gradient subtleties
```
