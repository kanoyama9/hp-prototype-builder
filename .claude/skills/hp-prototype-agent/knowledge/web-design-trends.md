# Webデザイントレンド 2024-2026

プロトタイプ生成時に参照するモダンWebデザインのトレンドと実装パターン。

---

## 1. レイアウトトレンド

### 1-1. Bento Grid（ベントーグリッド）

Appleが広めた不均一グリッドレイアウト。情報の重要度に応じてカードサイズを変える。

```
┌─────────────────┬──────────┐
│                 │          │
│   大きな機能     │  機能2   │
│   (2x2)         │  (1x1)   │
│                 ├──────────┤
│                 │  機能3   │
├────────┬────────┤  (1x1)   │
│ 機能4  │ 機能5  │          │
│ (1x1)  │ (1x1)  ├──────────┤
│        │        │  機能6   │
└────────┴────────┴──────────┘
```

**Tailwind実装**:
```css
.bento-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}
.bento-item-featured {
  @apply col-span-2 row-span-2;
}
.bento-item {
  @apply col-span-1 row-span-1;
}
```

**適合**: SaaS製品、テック企業、機能紹介セクション
**適合Theme**: theme-modern-saas, theme-dark-pro

### 1-2. スクロールドリブンアニメーション

スクロール位置に連動したアニメーション。CSS `scroll-timeline` やJSのIntersection Observer。

**実装レベル別**:
- **Level 1（安全）**: `whileInView` でフェードイン（Framer Motion）
- **Level 2（モダン）**: スクロール進捗で opacity/transform を連動
- **Level 3（実験的）**: CSS `animation-timeline: scroll()` （ブラウザ対応注意）

```jsx
// Level 2: Framer Motion useScroll
import { useScroll, useTransform, motion } from "framer-motion";

function ParallaxHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div style={{ y, opacity }}>
      <h1>Hero Content</h1>
    </motion.div>
  );
}
```

**適合**: LP、プロダクトサイト
**注意**: `prefers-reduced-motion` で必ず無効化

### 1-3. 水平スクロールセクション

縦スクロール中に特定セクションで水平スクロールに切り替わるパターン。

**実装**:
```jsx
// CSS: sticky + transform
function HorizontalScroll({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(items.length - 1) * 100}%`]);

  return (
    <section ref={ref} style={{ height: `${items.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex" style={{ x }}>
          {items.map((item, i) => (
            <div key={i} className="min-w-full h-screen flex items-center justify-center">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**適合**: ポートフォリオ、サービス紹介（3〜5項目）
**注意**: モバイルでは縦並びにフォールバック

### 1-4. フルブリード + 交互セクション

セクション毎に背景色を交互に切り替え（白→グレー→白→Primary色→白）。

```jsx
<section className="bg-background py-20">...</section>
<section className="bg-muted py-20">...</section>
<section className="bg-background py-20">...</section>
<section className="bg-primary text-primary-foreground py-20">...</section>  {/* CTA */}
```

**適合**: ほぼ全てのIAタイプ
**効果**: 視覚的にセクション境界が明確、区切り線不要

### 1-5. Sticky サイドバーレイアウト

左にテキスト説明、右にsticky要素（画像/図）が追従するパターン。

```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <div className="space-y-32">
    {features.map(f => <FeatureBlock key={f.id} {...f} />)}
  </div>
  <div className="hidden lg:block">
    <div className="sticky top-24">
      <ProductScreenshot />
    </div>
  </div>
</div>
```

**適合**: ia-saas-product, ia-pro-service
**適合Theme**: theme-modern-saas, theme-minimal-corporate

---

## 2. ビジュアルトレンド

### 2-1. メッシュグラデーション

2色以上が有機的に混ざるグラデーション背景。

**CSS実装**:
```css
.mesh-gradient {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(120, 198, 255, 0.25) 0%, transparent 50%),
    hsl(var(--background));
}
```

**Tailwind実装**:
```html
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
  <div className="relative z-10">...</div>
</div>
```

**適合**: Hero背景、CTA背景
**適合Theme**: theme-glass, theme-modern-saas, theme-dark-pro

### 2-2. グレイン / ノイズテクスチャ

フラットな背景に微細なノイズを加えて質感を出す。

**CSS実装**:
```css
.grain-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.4;
}
```

**適合**: theme-editorial-lux, theme-minimal-corporate（上質感の演出）

### 2-3. オーロラグラデーション

色が流動的に変化するアニメーショングラデーション。

```css
@keyframes aurora {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.aurora-bg {
  background: linear-gradient(-45deg,
    hsl(var(--primary) / 0.15),
    hsl(var(--accent) / 0.15),
    hsl(var(--primary) / 0.1),
    hsl(var(--accent) / 0.2)
  );
  background-size: 400% 400%;
  animation: aurora 15s ease infinite;
}
```

**適合**: Hero背景（theme-glass, theme-dark-pro）
**注意**: `prefers-reduced-motion` で停止

### 2-4. 3D要素とアイソメトリック

CSS transformやThree.jsでの3D表現。プロトタイプではCSS transformに留める。

```css
.isometric-card {
  transform: perspective(1000px) rotateX(5deg) rotateY(-5deg);
  transition: transform 0.3s ease;
}
.isometric-card:hover {
  transform: perspective(1000px) rotateX(0) rotateY(0);
}
```

**適合**: SaaS製品のスクリーンショット表示

### 2-5. Glassmorphism の進化

2024以降のグラスモーフィズムは、より繊細で実用的に。

**現代的実装**:
```html
<div className="
  bg-white/60 dark:bg-slate-900/60
  backdrop-blur-2xl
  border border-white/20 dark:border-white/10
  rounded-2xl
  shadow-xl shadow-black/5
">
```

**ポイント**:
- `backdrop-blur-2xl`（強めのblur）で視認性確保
- ボーダーは `white/20` で微細に
- 影は `shadow-black/5` で控えめ
- 背景にメッシュグラデーションを配置すると映える

---

## 3. インタラクショントレンド

### 3-1. View Transition API

ページ遷移時のスムーズなアニメーション（React Router + View Transitions）。

```jsx
// React Router v7+ with View Transitions
import { useNavigate } from "react-router-dom";

function NavLink({ to, children }) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        if (document.startViewTransition) {
          document.startViewTransition(() => navigate(to));
        } else {
          navigate(to);
        }
      }}
    >
      {children}
    </a>
  );
}
```

```css
::view-transition-old(root) {
  animation: fade-out 0.2s ease;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}
```

**適合**: 複数ページサイト全般
**注意**: ブラウザ対応を確認、フォールバック必須

### 3-2. マグネティックボタン

カーソル接近時にボタンが吸い寄せられるエフェクト。

```jsx
function MagneticButton({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}
```

**適合**: CTA ボタン（motionIntensity: standard 以上）
**注意**: モバイルでは無効化

### 3-3. Reveal アニメーション

テキストが1文字ずつ / 1行ずつ表示されるパターン。

```jsx
function TextReveal({ text }) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

**適合**: Hero見出し（motionIntensity: expressive）

### 3-4. スクロールスパイナビゲーション

LP（1ページ）でスクロール位置に応じてナビのアクティブ項目が変わる。

```jsx
function ScrollSpyNav({ sections }) {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
      {sections.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cn(
            "w-3 h-3 rounded-full border-2 transition-all",
            active === s.id
              ? "bg-primary border-primary scale-125"
              : "border-muted-foreground/40 hover:border-primary"
          )}
        />
      ))}
    </nav>
  );
}
```

**適合**: ia-lp-onepager

### 3-5. カーソル追従エフェクト

カーソル位置に応じてカードの傾きやライトが変わる。

```jsx
function TiltCard({ children }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -10);
    rotateY.set(x * 10);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl border bg-card p-6"
    >
      {children}
    </motion.div>
  );
}
```

**適合**: 機能カード（motionIntensity: expressive）

---

## 4. ダークモードデザイン

### 4-1. ダークモード設計原則

| 要素 | ライトモード | ダークモード |
|---|---|---|
| 背景 | #ffffff | #05070d〜#0b1220 |
| テキスト | #0b1220〜#111827 | #e2e8f0〜#e5e7eb |
| カード | #ffffff | #0f172a〜#111827 |
| ボーダー | #e2e8f0 | #1f2937〜#1f2a44 |
| 影 | `shadow-lg` | `shadow-none` or `shadow-lg shadow-black/30` |
| Primary | そのまま | やや明るい版（明度+10〜20%） |

### 4-2. グローエフェクト

ダークモードで要素が発光するように見せるテクニック。

```html
<!-- ボタンのグロー -->
<button className="
  bg-primary text-primary-foreground
  shadow-[0_0_20px_rgba(34,211,238,0.3)]
  hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]
  transition-shadow
">
  CTAテキスト
</button>

<!-- カードのグロー -->
<div className="
  bg-card border border-border rounded-xl
  hover:border-primary/50
  hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]
  transition-all
">
```

**適合**: theme-dark-pro, theme-glass（ダーク時）

### 4-3. アンビエントライティング

背景に薄い光源を配置して深度感を出す。

```html
<div className="relative min-h-screen bg-[#05070d]">
  <!-- アンビエントライト -->
  <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
  <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />
  <!-- コンテンツ -->
  <div className="relative z-10">...</div>
</div>
```

### 4-4. ダークモード切り替え実装

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", next);
  };

  return (
    <button onClick={toggle} aria-label="テーマ切り替え">
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

**システム設定連動**:
```jsx
useEffect(() => {
  const stored = localStorage.getItem("theme");
  if (stored) {
    document.documentElement.classList.toggle("dark", stored === "dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }
}, []);
```

---

## 5. タイポグラフィトレンド

### 5-1. 超大型見出し

Hero見出しを画面幅いっぱいに。`clamp()` でレスポンシブに。

```css
.hero-heading {
  font-size: clamp(2.5rem, 8vw, 8rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 800;
}
```

**Tailwind**: `text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-none`

**適合Theme**: theme-big-typography, theme-brutal

### 5-2. 可変フォント（Variable Fonts）

1つのフォントファイルでweight/width/slantを連続的に制御。

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
}
h1 { font-variation-settings: 'wght' 800; }
.subtitle { font-variation-settings: 'wght' 350; }
```

**適合**: 全テーマ（パフォーマンスも向上）

### 5-3. ミックスウェイト構成

同一行内でfont-weightを変えて強調する。

```html
<h1 className="text-4xl">
  <span className="font-light">ビジネスを、</span>
  <span className="font-bold">次のステージ</span>
  <span className="font-light">へ。</span>
</h1>
```

**適合Theme**: theme-big-typography, theme-editorial-lux

### 5-4. セリフ × サンセリフのペアリング

```css
:root {
  --font-heading: 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
  --font-body: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif;
}
h1, h2, h3 { font-family: var(--font-heading); }
body { font-family: var(--font-body); }
```

**適合Theme**: theme-editorial-lux

---

## 6. Hero セクションの進化

### 6-1. ビデオ背景Hero

```jsx
function VideoHero({ videoSrc, headline, cta }) {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{headline}</h1>
        <Button size="lg">{cta}</Button>
      </div>
    </section>
  );
}
```

**注意**: `prefers-reduced-motion` で静止画にフォールバック
**適合**: theme-editorial-lux, ia-recruit

### 6-2. アニメーショングラデーントHero

```jsx
function GradientHero({ headline }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{headline}</h1>
      </div>
    </section>
  );
}
```

### 6-3. インタラクティブHero（パーティクル/マウス追従）

```jsx
function InteractiveHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const bgX = useTransform(mouseX, [0, 1], ["-5%", "5%"]);
  const bgY = useTransform(mouseY, [0, 1], ["-5%", "5%"]);

  return (
    <section
      onMouseMove={handleMouse}
      className="relative h-screen overflow-hidden bg-background"
    >
      <motion.div
        className="absolute inset-[-10%] bg-gradient-to-br from-primary/20 to-accent/20"
        style={{ x: bgX, y: bgY }}
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1>Hero Content</h1>
      </div>
    </section>
  );
}
```

**適合**: theme-dark-pro, theme-glass（motionIntensity: expressive）

---

## 7. コンテンツ表現の新パターン

### 7-1. 比較テーブル（Before / After）

```
┌──────────────────┬──────────────────┐
│   Before ❌       │   After ✅       │
├──────────────────┼──────────────────┤
│ 手動で集計       │ 自動レポート生成  │
│ 週次報告に3時間  │ ワンクリックで完了│
│ Excel管理        │ クラウドで一元管理│
└──────────────────┴──────────────────┘
```

**適合**: ia-saas-product, ia-lp-onepager

### 7-2. マーキー / 無限スクロールテキスト

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}
```

**適合**: ロゴウォール、キーワード表示

### 7-3. タブ切り替え型コンテンツ

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="feature1">
  <TabsList className="grid grid-cols-3">
    <TabsTrigger value="feature1">機能A</TabsTrigger>
    <TabsTrigger value="feature2">機能B</TabsTrigger>
    <TabsTrigger value="feature3">機能C</TabsTrigger>
  </TabsList>
  <TabsContent value="feature1">
    <div className="grid grid-cols-2 gap-8 py-8">
      <div>説明テキスト...</div>
      <div><img src="..." alt="機能A" /></div>
    </div>
  </TabsContent>
  ...
</Tabs>
```

**適合**: ia-saas-product（機能紹介）

### 7-4. インタラクティブ料金計算

```jsx
function PricingCalculator() {
  const [users, setUsers] = useState(10);
  const [annual, setAnnual] = useState(true);
  const price = users * (annual ? 800 : 980);

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl border bg-card">
      <label className="text-sm font-medium">ユーザー数: {users}人</label>
      <Slider value={[users]} onValueChange={([v]) => setUsers(v)} min={1} max={100} />
      <div className="flex items-center gap-2 mt-4">
        <Switch checked={annual} onCheckedChange={setAnnual} />
        <span className="text-sm">年払い（17%お得）</span>
      </div>
      <div className="mt-6 text-center">
        <span className="text-4xl font-bold">¥{price.toLocaleString()}</span>
        <span className="text-muted-foreground">/月</span>
      </div>
    </div>
  );
}
```

---

## 8. SEO・パフォーマンストレンド

### 8-1. Core Web Vitals 対応

| 指標 | 目標 | 対策 |
|---|---|---|
| LCP | < 2.5s | Hero画像に `priority`/`fetchpriority="high"`、フォント `preload` |
| FID/INP | < 200ms | 重い処理は `useTransition`、イベントハンドラを軽量に |
| CLS | < 0.1 | 画像に `width`/`height` 指定、フォントに `font-display: swap` + `size-adjust` |

### 8-2. フォント最適化

```html
<!-- プリロード -->
<link rel="preload" href="/fonts/NotoSansJP-Variable.woff2" as="font" type="font/woff2" crossorigin />

<!-- font-display: swap -->
<style>
@font-face {
  font-family: 'Noto Sans JP';
  src: url('/fonts/NotoSansJP-Variable.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+3000-9FFF, U+F900-FAFF; /* 日本語文字範囲 */
}
</style>
```

### 8-3. 画像最適化

- フォーマット: WebP / AVIF 優先
- レスポンシブ: `srcset` + `sizes` で適切なサイズ配信
- 遅延読み込み: `loading="lazy"` （ファーストビュー以外）
- プレースホルダ: LQIP（低品質画像プレビュー）or `blur` プレースホルダ

---

## 9. 2025-2026の注目トレンド

### 9-1. AIインタラクション統合
- チャットボット風のCTAセクション
- テキスト生成風のタイピングアニメーション
- 「AIに相談する」ボタンの増加

### 9-2. マイクロフロントエンドの影響
- セクション単位での独立レンダリング
- Islands Architecture（部分的にインタラクティブ）

### 9-3. デザインシステムの標準化
- shadcn/ui に代表される「コピー&ペースト」型コンポーネント
- テーマトークンによる一括デザイン変更
- Figma → コード の自動変換の精度向上

### 9-4. サステナビリティデザイン
- ダークモードデフォルト（消費電力低減）
- 軽量ページ（不要なアニメーション/画像を削減）
- 「グリーンWebデザイン」の概念
