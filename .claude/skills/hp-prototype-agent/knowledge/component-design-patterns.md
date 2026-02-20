# コンポーネントレベル デザインパターン集

React + Tailwind CSS + shadcn/ui + Framer Motion を前提とした、
日本語コーポレートサイト プロトタイプ生成のためのコンポーネント設計リファレンス。

---

## 1. カードデザインパターン

### 1-1. フィーチャーカード（アイコン + タイトル + 説明）

最も汎用的なカード。サービス紹介・機能紹介・選ばれる理由に使用。

```jsx
{/* 基本構造 */}
<div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  {/* アイコン */}
  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
    <Zap className="h-6 w-6" />
  </div>
  {/* タイトル */}
  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
    高速データ処理
  </h3>
  {/* 説明 */}
  <p className="text-sm leading-relaxed text-muted-foreground">
    独自エンジンにより、大量データをリアルタイムで分析・可視化します。
  </p>
</div>
```

**バリエーション:**

| バリエーション | クラス差分 | 用途 |
|---|---|---|
| アイコン左配置 | `flex gap-4`（カード本体）、アイコンは `shrink-0` | コンパクト一覧 |
| アイコン円形背景 | `rounded-full bg-primary/10 p-3` | モダンSaaS |
| ボーダーなし + 影 | `border-0 shadow-md` | glass / editorial |
| アクセントライン上部 | `border-t-4 border-t-primary` | 強調・CTA寄り |
| グラス効果 | `bg-white/65 backdrop-blur-xl border-white/20` | theme-glass |
| ブルータル | `border-2 border-black rounded-none shadow-[4px_4px_0_0_#000]` | theme-brutal |

**Framer Motion 付き（stagger）:**
```jsx
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-80px" }}
>
  {features.map((f, i) => (
    <motion.div key={i} variants={cardVariants} className="group rounded-xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {f.icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
      <p className="text-sm text-muted-foreground">{f.description}</p>
    </motion.div>
  ))}
</motion.div>
```

---

### 1-2. 料金カード（プラン比較）

```jsx
{/* 推奨プランにハイライト */}
<div className={cn(
  "relative rounded-2xl border p-8 transition-all duration-300",
  isRecommended
    ? "border-primary bg-primary/5 shadow-xl scale-105 ring-2 ring-primary"
    : "border-border bg-card hover:shadow-lg hover:-translate-y-1"
)}>
  {/* 推奨バッジ */}
  {isRecommended && (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
      <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
        おすすめ
      </span>
    </div>
  )}

  {/* プラン名 */}
  <h3 className="text-xl font-bold text-card-foreground">{plan.name}</h3>

  {/* 価格 */}
  <div className="mt-4 mb-6">
    <span className="text-4xl font-extrabold tracking-tight text-card-foreground">
      {plan.price === 0 ? "¥0" : `¥${plan.price.toLocaleString()}`}
    </span>
    <span className="text-sm text-muted-foreground">/月</span>
  </div>

  {/* 機能リスト */}
  <ul className="mb-8 space-y-3">
    {plan.features.map((feat, i) => (
      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>{feat}</span>
      </li>
    ))}
  </ul>

  {/* CTA */}
  <Button
    className={cn("w-full", isRecommended ? "" : "variant-outline")}
    variant={isRecommended ? "default" : "outline"}
  >
    {plan.cta}
  </Button>
</div>
```

**料金表レイアウト:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
  {plans.map((plan, i) => (
    <PricingCard key={i} plan={plan} isRecommended={plan.recommended} />
  ))}
</div>
```

**年/月払いトグル:**
```jsx
<div className="flex items-center justify-center gap-3 mb-12">
  <span className={cn("text-sm", !isAnnual && "font-semibold text-foreground", isAnnual && "text-muted-foreground")}>
    月払い
  </span>
  <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
  <span className={cn("text-sm", isAnnual && "font-semibold text-foreground", !isAnnual && "text-muted-foreground")}>
    年払い
    <Badge variant="secondary" className="ml-2 text-xs">2ヶ月分お得</Badge>
  </span>
</div>
```

---

### 1-3. チームメンバーカード

```jsx
<div className="group text-center">
  {/* アバター */}
  <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full bg-muted">
    {member.photo ? (
      <img
        src={member.photo}
        alt={member.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-primary/10 text-3xl font-bold text-primary">
        {member.name.charAt(0)}
      </div>
    )}
  </div>
  {/* 名前 */}
  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
  {/* 役職 */}
  <p className="text-sm text-primary">{member.role}</p>
  {/* 紹介文 */}
  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
  {/* SNS リンク */}
  <div className="mt-3 flex justify-center gap-3">
    {member.links?.map((link, i) => (
      <a key={i} href={link.url} className="text-muted-foreground transition-colors hover:text-primary" aria-label={link.label}>
        {link.icon}
      </a>
    ))}
  </div>
</div>
```

**横型バリエーション（代表メッセージ向け）:**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
    <img src={ceo.photo} alt={ceo.name} className="h-full w-full object-cover" />
  </div>
  <div>
    <p className="text-sm text-primary font-medium mb-1">{ceo.role}</p>
    <h3 className="text-2xl font-bold mb-4">{ceo.name}</h3>
    <div className="prose prose-sm text-muted-foreground">
      {ceo.message}
    </div>
  </div>
</div>
```

---

### 1-4. テスティモニアルカード

```jsx
{/* パターンA: カード型 */}
<div className="rounded-xl border border-border bg-card p-6">
  {/* 星評価（任意） */}
  <div className="mb-3 flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn("h-4 w-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")}
      />
    ))}
  </div>
  {/* 引用文 */}
  <blockquote className="mb-4 text-sm leading-relaxed text-card-foreground">
    「{testimonial.quote}」
  </blockquote>
  {/* 発言者 */}
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
      {testimonial.avatar ? (
        <img src={testimonial.avatar} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">
          {testimonial.name.charAt(0)}
        </div>
      )}
    </div>
    <div>
      <p className="text-sm font-semibold text-card-foreground">{testimonial.name}</p>
      <p className="text-xs text-muted-foreground">{testimonial.company} {testimonial.title}</p>
    </div>
  </div>
</div>

{/* パターンB: 引用符装飾型 */}
<div className="relative rounded-xl bg-muted/50 p-8">
  <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
  <blockquote className="relative z-10 text-base leading-relaxed text-foreground pl-6">
    {testimonial.quote}
  </blockquote>
  <div className="mt-6 pl-6">
    <p className="font-semibold">{testimonial.name}</p>
    <p className="text-sm text-muted-foreground">{testimonial.company}　{testimonial.title}</p>
  </div>
</div>
```

---

### 1-5. ブログ/ニュースカード

```jsx
<article className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  {/* サムネイル */}
  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
    <img
      src={post.thumbnail}
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    {/* カテゴリバッジ */}
    <div className="absolute top-3 left-3">
      <Badge variant="secondary" className="text-xs">{post.category}</Badge>
    </div>
  </div>
  {/* コンテンツ */}
  <div className="p-5">
    <time className="text-xs text-muted-foreground">{post.date}</time>
    <h3 className="mt-1 text-base font-semibold leading-snug text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
      {post.title}
    </h3>
    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
  </div>
</article>
```

**横型バリエーション（ニュース一覧）:**
```jsx
<article className="group flex gap-4 border-b border-border py-4 last:border-0">
  <time className="shrink-0 text-sm text-muted-foreground w-24">{post.date}</time>
  <Badge variant="outline" className="shrink-0 text-xs">{post.category}</Badge>
  <h3 className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
    <a href={post.url}>{post.title}</a>
  </h3>
</article>
```

---

### 1-6. ケーススタディ / 導入事例カード

```jsx
<div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
  {/* カバー画像 */}
  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
    <img
      src={caseStudy.image}
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    {/* オーバーレイ + 業界タグ */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute bottom-3 left-4">
      <Badge className="bg-white/20 text-white backdrop-blur-sm text-xs">
        {caseStudy.industry}
      </Badge>
    </div>
  </div>
  {/* コンテンツ */}
  <div className="p-5">
    <p className="text-xs text-primary font-medium">{caseStudy.company}</p>
    <h3 className="mt-1 text-base font-semibold text-card-foreground line-clamp-2">
      {caseStudy.title}
    </h3>
    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
      {caseStudy.summary}
    </p>
    {/* 成果数値 */}
    <div className="mt-4 flex gap-4">
      {caseStudy.metrics?.map((m, i) => (
        <div key={i} className="text-center">
          <p className="text-lg font-bold text-primary">{m.value}</p>
          <p className="text-xs text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </div>
  </div>
</div>
```

---

### 1-7. 数値/メトリクスカード

```jsx
{/* パターンA: シンプル（Proof セクション向け） */}
<div className="text-center p-6">
  <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
    {stat.value}
  </p>
  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
</div>

{/* パターンB: カード型 */}
<div className="rounded-xl border border-border bg-card p-6 text-center">
  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
    {stat.icon}
  </div>
  <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
</div>

{/* パターンC: 横並び Proof バー */}
<div className="border-t border-b border-border bg-muted/30 py-12">
  <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
    {stats.map((stat, i) => (
      <div key={i} className="text-center">
        <p className="text-3xl md:text-4xl font-extrabold text-foreground">{stat.value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
      </div>
    ))}
  </div>
</div>
```

**カウンターアニメーション（Framer Motion）:**
```jsx
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return controls.stop;
  }, [isInView, target, duration, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

// 使用例
<AnimatedCounter target={500} suffix="+" />    // → 500+
<AnimatedCounter target={99.5} suffix="%" />   // → 100% (整数化)
```

---

### 1-8. インタラクティブホバーステート一覧

全カード共通で使えるホバーパターン:

| パターン | Tailwind クラス | 効果 |
|---|---|---|
| リフト | `hover:-translate-y-1 transition-transform duration-300` | 1段浮く |
| リフト＋影 | `hover:-translate-y-1 hover:shadow-lg transition-all duration-300` | 浮いて影が伸びる |
| 影のみ | `hover:shadow-xl transition-shadow duration-300` | 静かに強調 |
| ボーダー色変化 | `border-border hover:border-primary transition-colors duration-300` | 枠線が色付く |
| 背景色スイープ | `hover:bg-primary/5 transition-colors duration-300` | 面が薄く塗られる |
| スケール | `hover:scale-[1.02] transition-transform duration-300` | わずかに拡大 |
| グループ内画像拡大 | カードに `group`、画像に `group-hover:scale-105 transition-transform duration-500` | 画像だけズーム |
| ブルータル影移動 | `shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200` | 押し込み感 |

---

## 2. ボタンデザインパターン

### 2-1. バリアント定義

shadcn/ui の Button コンポーネントをベースに拡張:

```jsx
// shadcn/ui Button variants (cva ベース)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### 2-2. アイコン + テキストボタン

```jsx
{/* アイコン左 */}
<Button>
  <Mail className="mr-2 h-4 w-4" />
  お問い合わせ
</Button>

{/* アイコン右（矢印） */}
<Button variant="ghost">
  サービス詳細
  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>

{/* アイコンのみ */}
<Button variant="outline" size="icon" aria-label="メニューを開く">
  <Menu className="h-4 w-4" />
</Button>
```

### 2-3. ボタングループ

```jsx
{/* CTA ペア（Primary + Secondary） */}
<div className="flex flex-col sm:flex-row gap-3">
  <Button size="lg">
    お問い合わせ
  </Button>
  <Button variant="outline" size="lg">
    サービス詳細を見る
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</div>

{/* トグルグループ */}
<div className="inline-flex rounded-lg border border-border p-1 bg-muted">
  <button className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground bg-background shadow-sm">
    月払い
  </button>
  <button className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
    年払い
  </button>
</div>
```

### 2-4. ローディングステート

```jsx
<Button disabled className="min-w-[120px]">
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  送信中...
</Button>

{/* フルコンポーネント */}
function LoadingButton({ loading, children, ...props }) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          処理中...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
```

### 2-5. 日本語 CTA ボタンテキスト慣例

| 目的 | Primary CTA | Secondary CTA | 備考 |
|---|---|---|---|
| 問い合わせ獲得 | お問い合わせ / 無料相談する | サービス詳細を見る | 「する」動詞形が行動喚起に効果的 |
| 資料DL | 資料をダウンロード | 料金プランを見る | DLの方がCVR高い（心理的障壁低） |
| SaaS 導入 | 無料で始める / デモを予約 | 機能一覧を見る | 「無料」は強い訴求 |
| 採用 | エントリーする / 応募する | カジュアル面談に申し込む | 面談はハードル低め |
| 店舗 / 予約 | 予約する / 電話する | アクセスを見る | `tel:` リンク必須 |
| LP / キャンペーン | まずは無料で試す | 詳しく見る | 「まずは」で障壁を下げる |
| EC | カートに入れる / 今すぐ購入 | お気に入りに追加 | 「今すぐ」は日本語サイトでは控えめに |

**マイクロコピー（ボタン周辺テキスト）の例:**
- 「お気軽にご相談ください」
- 「※ 無理な営業は一切いたしません」
- 「最短1分で完了」
- 「詳細・料金はサービス資料で確認できます」

---

## 3. バッジ / タグパターン

### 3-1. ステータスバッジ

```jsx
{/* 基本スタイル（shadcn/ui Badge ベース） */}
const statusConfig = {
  new:     { label: "新着",   className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  open:    { label: "受付中", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  closed:  { label: "終了",   className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  urgent:  { label: "急募",   className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  coming:  { label: "近日公開", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
};

function StatusBadge({ status }) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      config.className
    )}>
      {config.label}
    </span>
  );
}
```

### 3-2. カテゴリタグ

```jsx
{/* 丸角タグ */}
<span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
  テクノロジー
</span>

{/* 選択状態つき（フィルター用） */}
<button
  className={cn(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "border border-border text-muted-foreground hover:bg-accent"
  )}
  onClick={() => toggleCategory(cat)}
>
  {cat.label}
</button>
```

### 3-3. プランティアバッジ

```jsx
const tierConfig = {
  free:       { label: "Free",       className: "bg-gray-100 text-gray-700" },
  pro:        { label: "Pro",        className: "bg-primary/10 text-primary" },
  enterprise: { label: "Enterprise", className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white" },
};

function TierBadge({ tier }) {
  const config = tierConfig[tier];
  return (
    <span className={cn(
      "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
      config.className
    )}>
      {config.label}
    </span>
  );
}
```

### 3-4. フォーム必須バッジ（日本語サイト特有）

```jsx
{/* 「必須」赤バッジ */}
<label className="flex items-center gap-2 text-sm font-medium">
  お名前
  <span className="inline-flex items-center rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
    必須
  </span>
</label>

{/* 「任意」グレーバッジ */}
<label className="flex items-center gap-2 text-sm font-medium">
  電話番号
  <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
    任意
  </span>
</label>
```

---

## 4. セクション区切りパターン

### 4-1. ウェーブ区切り（SVG）

```jsx
{/* 上向きウェーブ（セクション上部に配置） */}
function WaveDivider({ className, flip = false }) {
  return (
    <div className={cn("w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] md:h-[80px]"
      >
        <path
          d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
          className="fill-background"
        />
      </svg>
    </div>
  );
}

// 使い方: セクション間に挟む
<section className="bg-primary py-20">
  {/* コンテンツ */}
</section>
<WaveDivider className="-mt-1 text-primary" />
<section className="bg-background py-20">
  {/* コンテンツ */}
</section>
```

### 4-2. 斜め区切り（Diagonal）

```jsx
function DiagonalDivider({ className }) {
  return (
    <div className={cn("w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px]"
      >
        <polygon points="0,0 1200,120 0,120" className="fill-background" />
      </svg>
    </div>
  );
}
```

### 4-3. グラデーションフェード区切り

```jsx
{/* 上から下へフェードアウト */}
<div className="h-24 bg-gradient-to-b from-muted/50 to-background" />

{/* 左右グラデーションライン */}
<div className="flex items-center gap-4 py-8">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
  <span className="text-xs text-muted-foreground">OR</span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
</div>

{/* メッシュグラデーション背景 */}
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
  {/* コンテンツ */}
</div>
```

### 4-4. ドット / パターン区切り

```jsx
{/* ドットパターン背景 */}
<div
  className="h-16 opacity-20"
  style={{
    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  }}
/>

{/* グリッドパターン背景 */}
<div
  className="absolute inset-0 opacity-[0.03]"
  style={{
    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                      linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  }}
/>

{/* Tailwind で作る CSS ドットパターン区切り */}
<div className="py-2">
  <div className="flex justify-center gap-1.5">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
    ))}
  </div>
</div>
```

---

## 5. 画像トリートメントパターン

### 5-1. アスペクト比

| 用途 | アスペクト比 | Tailwind クラス | 備考 |
|---|---|---|---|
| ヒーロー | 16:9 | `aspect-video` | フルブリード時は `h-[80vh]` |
| ブログカード | 4:3 | `aspect-[4/3]` | `16/10` も一般的 |
| ケーススタディ | 16:9 | `aspect-video` | OGP と兼用可 |
| アバター | 1:1 | `aspect-square` | `rounded-full` と併用 |
| サービス画像 | 3:2 | `aspect-[3/2]` | 横長で安定感 |
| ロゴ | 任意 | `h-8` or `h-10` | 高さ固定、幅は `w-auto` |
| OGP | 1200x630 | `aspect-[1200/630]` | ≒ 1.91:1 |

### 5-2. 画像オーバーレイ

```jsx
{/* グラデーションオーバーレイ（下から上） */}
<div className="relative overflow-hidden">
  <img src={src} alt="" className="h-full w-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  <div className="absolute bottom-4 left-4 text-white">
    <h3>テキスト</h3>
  </div>
</div>

{/* 単色オーバーレイ */}
<div className="absolute inset-0 bg-primary/40" />

{/* ブランドカラーオーバーレイ + ブレンドモード */}
<div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />

{/* ホバーで出現するオーバーレイ */}
<div className="group relative overflow-hidden">
  <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      詳細を見る
    </span>
  </div>
</div>
```

### 5-3. 画像マスク

```jsx
{/* 角丸 */}
<img className="rounded-xl" />
<img className="rounded-2xl" />
<img className="rounded-full" />  {/* 正円: aspect-square と併用 */}

{/* ブロブ形状（CSS clip-path） */}
<div
  className="overflow-hidden"
  style={{ clipPath: "ellipse(45% 48% at 50% 50%)" }}
>
  <img src={src} alt="" className="h-full w-full object-cover" />
</div>

{/* 不規則ブロブ */}
<div
  className="overflow-hidden"
  style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
>
  <img src={src} alt="" className="h-full w-full object-cover" />
</div>
```

### 5-4. 遅延読み込みとスケルトン

```jsx
{/* ネイティブ遅延読み込み */}
<img loading="lazy" decoding="async" src={src} alt={alt} className="h-full w-full object-cover" />

{/* React + IntersectionObserver パターン */}
function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

{/* スケルトン付き画像 */}
function ImageWithSkeleton({ src, alt, aspectRatio = "aspect-video" }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-muted", aspectRatio)}>
      {!loaded && (
        <div className="absolute inset-0">
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/5 to-muted bg-[length:200%_100%]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
```

---

## 6. リスト / グリッドパターン

### 6-1. オートフィット レスポンシブグリッド

```jsx
{/* 基本: 1→2→3列 */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>

{/* 4列（stats / ロゴ向け） */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>

{/* CSS grid auto-fit（カード幅ベース） */}
<div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
  {items.map(item => <Card key={item.id} />)}
</div>

{/* 最大幅制限付き中央配置 */}
<div className="mx-auto max-w-6xl px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => <Card key={item.id} />)}
  </div>
</div>
```

### 6-2. Bento グリッド

```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* メインカード: 2x2 */}
  <div className="md:col-span-2 md:row-span-2 rounded-2xl border border-border bg-card p-8">
    <h3 className="text-2xl font-bold">メイン機能</h3>
    <p className="mt-2 text-muted-foreground">説明テキスト</p>
  </div>
  {/* サブカード: 1x1 */}
  <div className="rounded-2xl border border-border bg-card p-6">
    <h4 className="font-semibold">機能A</h4>
  </div>
  <div className="rounded-2xl border border-border bg-card p-6">
    <h4 className="font-semibold">機能B</h4>
  </div>
  {/* ワイドカード: 2x1 */}
  <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6">
    <h4 className="font-semibold">機能C</h4>
  </div>
</div>
```

### 6-3. 交互行背景（ストライプ）

```jsx
{/* テーブル行のストライプ */}
<div className="divide-y divide-border">
  {items.map((item, i) => (
    <div key={i} className={cn("px-4 py-3", i % 2 === 0 ? "bg-background" : "bg-muted/50")}>
      {item.content}
    </div>
  ))}
</div>

{/* セクション全体の交互背景 */}
{sections.map((section, i) => (
  <section key={i} className={cn("py-20", i % 2 === 0 ? "bg-background" : "bg-muted/30")}>
    {section.content}
  </section>
))}
```

### 6-4. 密度バリエーション

```jsx
{/* コンパクト密度（一覧ページ向け） */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
  {items.map(item => (
    <div key={item.id} className="rounded-lg border border-border p-3">
      <h4 className="text-sm font-medium">{item.title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
    </div>
  ))}
</div>

{/* ゆったり密度（トップページ向け） */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
  {items.map(item => (
    <div key={item.id} className="rounded-2xl border border-border p-8">
      <h3 className="text-xl font-semibold">{item.title}</h3>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>
```

---

## 7. マイクロインタラクション

### 7-1. ホバーリフト（translateY + shadow）

```jsx
{/* Tailwind のみ */}
<div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" />

{/* Framer Motion */}
<motion.div
  whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```

### 7-2. スケールオンホバー

```jsx
{/* Tailwind のみ */}
<div className="transition-transform duration-300 hover:scale-[1.03]" />

{/* Framer Motion */}
<motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

### 7-3. ボーダー色トランジション

```jsx
{/* Tailwind のみ */}
<div className="border-2 border-transparent hover:border-primary transition-colors duration-300 rounded-xl p-6" />

{/* Framer Motion */}
<motion.div
  className="border-2 rounded-xl p-6"
  initial={{ borderColor: "transparent" }}
  whileHover={{ borderColor: "hsl(var(--primary))" }}
  transition={{ duration: 0.3 }}
/>
```

### 7-4. 背景色スイープ

```jsx
{/* Tailwind のみ */}
<div className="relative overflow-hidden rounded-xl bg-card p-6 transition-colors duration-300 hover:bg-primary/5" />

{/* CSS スイープ効果（擬似要素） */}
// globals.css に追加:
// .sweep-hover {
//   position: relative;
//   overflow: hidden;
// }
// .sweep-hover::before {
//   content: '';
//   position: absolute;
//   inset: 0;
//   background: hsl(var(--primary) / 0.05);
//   transform: translateX(-100%);
//   transition: transform 0.4s ease;
// }
// .sweep-hover:hover::before {
//   transform: translateX(0);
// }
<div className="sweep-hover rounded-xl p-6" />
```

### 7-5. リンクアンダーラインアニメーション

```jsx
{/* 左から右へ伸びるアンダーライン */}
<a className="relative inline-block text-primary">
  <span>サービス詳細</span>
  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
</a>

{/* 中央から外へ広がるアンダーライン */}
<a className="relative inline-block text-primary">
  <span>詳しく見る</span>
  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 hover:w-full" />
</a>

{/* ナビゲーション用（Framer Motion layout animation） */}
function NavLink({ href, label, isActive }) {
  return (
    <a href={href} className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="nav-underline"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </a>
  );
}
```

### 7-6. マグネティックボタン効果

```jsx
function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
```

### 7-7. Framer Motion variants まとめ

```jsx
// --- 全パターンの variants 定義 ---

// フェードイン（subtle 向け）
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

// フェードイン + スライドアップ（standard 向け）
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// フェードイン + スライド左から（standard 向け）
const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// フェードイン + スライド右から（standard 向け）
const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// フェードイン + スケール（expressive 向け）
const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// スタガーコンテナ
const staggerContainer = (staggerDelay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: staggerDelay } },
});

// ホバーリフト
const hoverLift = {
  rest: { y: 0, boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" },
  hover: { y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" },
};

// ホバースケール（ボタン向け）
const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.97 },
};

// 使用例:
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-80px" }}
>
  <h2>セクション見出し</h2>
</motion.div>

// prefers-reduced-motion 対応のヘルパー
function useMotionVariants(variants) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return {
      hidden: {},
      show: {},
      rest: {},
      hover: {},
      tap: {},
    };
  }
  return variants;
}
```

---

## 8. ソーシャルプルーフパターン

### 8-1. ロゴカルーセル / ストリップ

```jsx
{/* 静的ロゴグリッド */}
<section className="py-12 border-y border-border">
  <div className="container mx-auto px-4">
    <p className="text-center text-sm text-muted-foreground mb-8">
      導入企業
    </p>
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {logos.map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className="h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        />
      ))}
    </div>
  </div>
</section>

{/* 無限スクロール ロゴカルーセル（CSS アニメーション） */}
function LogoCarousel({ logos }) {
  return (
    <div className="overflow-hidden py-8">
      <p className="text-center text-sm text-muted-foreground mb-6">
        500社以上の企業様にご利用いただいています
      </p>
      <div className="relative">
        {/* マスク */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        {/* スクロールトラック */}
        <div className="flex animate-scroll gap-12">
          {/* 2回分繰り返し（無限ループ用） */}
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto shrink-0 grayscale opacity-50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// tailwind.config.js に追加:
// animation: { scroll: "scroll 30s linear infinite" }
// keyframes: { scroll: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } }
```

### 8-2. 星評価

```jsx
function StarRating({ rating, max = 5, size = "sm" }) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6";
  return (
    <div className="flex gap-0.5" aria-label={`${rating}/${max}の評価`}>
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-muted text-muted-foreground/20"
          )}
        />
      ))}
    </div>
  );
}

{/* 集約スコア表示 */}
<div className="flex items-center gap-2">
  <StarRating rating={4.8} />
  <span className="text-sm font-semibold">4.8</span>
  <span className="text-sm text-muted-foreground">(1,234件のレビュー)</span>
</div>
```

### 8-3. トラストバッジ

```jsx
{/* セキュリティ / 認証バッジ */}
<div className="flex flex-wrap justify-center gap-6 py-8">
  {[
    { icon: <Shield />, label: "ISO 27001 認証取得" },
    { icon: <Lock />, label: "SSL/TLS 暗号化通信" },
    { icon: <Award />, label: "プライバシーマーク取得" },
    { icon: <CheckCircle />, label: "ISMS 適合性評価" },
  ].map((badge, i) => (
    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="text-primary">{badge.icon}</span>
      <span>{badge.label}</span>
    </div>
  ))}
</div>
```

### 8-4. 「メディア掲載」ロゴ

```jsx
<section className="py-12">
  <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
    メディア掲載実績
  </p>
  <div className="flex flex-wrap justify-center items-center gap-10">
    {mediaLogos.map((logo, i) => (
      <img
        key={i}
        src={logo.src}
        alt={logo.alt}
        className="h-6 w-auto grayscale opacity-40"
      />
    ))}
  </div>
</section>
```

### 8-5. パートナーロゴグリッド

```jsx
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <h2 className="text-center text-2xl font-bold mb-4">パートナー企業</h2>
    <p className="text-center text-muted-foreground mb-12">
      信頼のパートナーと共に、最高のソリューションを提供します。
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {partners.map((p, i) => (
        <div key={i} className="flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:shadow-md">
          <img
            src={p.logo}
            alt={p.name}
            className="h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 9. 通知 / バナーパターン

### 9-1. トップアナウンスメントバー

```jsx
function AnnouncementBar({ message, link, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2 text-sm">
        <span>{message}</span>
        {link && (
          <a href={link.url} className="font-semibold underline underline-offset-2 hover:no-underline">
            {link.text}
            <ArrowRight className="ml-1 inline-block h-3 w-3" />
          </a>
        )}
        <button
          onClick={() => { setIsVisible(false); onDismiss?.(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-primary-foreground/10 transition-colors"
          aria-label="閉じる"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

{/* グラデーションバリエーション */}
<div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-2 text-center text-sm">
  新機能リリース！ <a href="#" className="font-semibold underline">詳しく見る →</a>
</div>
```

### 9-2. Cookie 同意バナー

```jsx
function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl"
    >
      <p className="text-sm text-card-foreground mb-4">
        当サイトでは、利便性向上のためにCookieを使用しています。
        サイトの閲覧を続けることで、Cookieの使用に同意したものとみなします。
        <a href="/privacy" className="text-primary underline ml-1">プライバシーポリシー</a>
      </p>
      <div className="flex gap-3">
        <Button size="sm" onClick={() => { setIsVisible(false); setCookie("cookie_consent", "true"); }}>
          同意する
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIsVisible(false)}>
          拒否
        </Button>
      </div>
    </motion.div>
  );
}
```

### 9-3. フラッシュメッセージ（通知）

```jsx
function FlashMessage({ type = "info", message, onDismiss }) {
  const config = {
    info:    { icon: <Info />,        bg: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300" },
    success: { icon: <CheckCircle />, bg: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300" },
    warning: { icon: <AlertTriangle />, bg: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300" },
    error:   { icon: <AlertCircle />, bg: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300" },
  };
  const c = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={cn("flex items-start gap-3 rounded-lg border p-4", c.bg)}
    >
      <span className="shrink-0 mt-0.5">{c.icon}</span>
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
```

---

## 10. スケルトン / ローディングパターン

### 10-1. コンテンツスケルトンスクリーン

```jsx
{/* shadcn/ui Skeleton ベース */}
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

{/* カードスケルトン */}
function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

{/* テスティモニアルスケルトン */}
function TestimonialSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-4 w-4 rounded-full" />)}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
}

{/* ブログカードスケルトン */}
function BlogCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

{/* ページ全体のスケルトン */}
function PageSkeleton() {
  return (
    <div className="space-y-8 py-12">
      {/* Hero skeleton */}
      <div className="container mx-auto px-4 space-y-4 text-center">
        <Skeleton className="mx-auto h-10 w-3/4 max-w-lg" />
        <Skeleton className="mx-auto h-5 w-1/2 max-w-md" />
        <Skeleton className="mx-auto h-10 w-32 rounded-md mt-4" />
      </div>
      {/* Cards skeleton */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
```

### 10-2. シマー効果

```jsx
// tailwind.config.js に追加:
// keyframes: {
//   shimmer: {
//     "0%": { backgroundPosition: "-200% 0" },
//     "100%": { backgroundPosition: "200% 0" },
//   },
// },
// animation: {
//   shimmer: "shimmer 2s ease-in-out infinite",
// },

function ShimmerSkeleton({ className }) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-muted via-muted-foreground/5 to-muted bg-[length:200%_100%] animate-shimmer",
        className
      )}
    />
  );
}

{/* 使用例 */}
<ShimmerSkeleton className="h-40 w-full" />  {/* 画像プレースホルダ */}
<ShimmerSkeleton className="h-5 w-3/4" />    {/* テキスト行 */}
<ShimmerSkeleton className="h-10 w-10 rounded-full" />  {/* アバター */}
```

### 10-3. パルスアニメーション

```jsx
{/* Tailwind 標準の animate-pulse */}
<div className="animate-pulse space-y-4">
  <div className="h-48 rounded-xl bg-muted" />
  <div className="h-4 w-3/4 rounded bg-muted" />
  <div className="h-4 w-1/2 rounded bg-muted" />
</div>

{/* 遅延付きパルス（stagger 効果） */}
{[...Array(3)].map((_, i) => (
  <div
    key={i}
    className="animate-pulse rounded-xl bg-muted h-32"
    style={{ animationDelay: `${i * 150}ms` }}
  />
))}

{/* カスタムパルス（速度調整） */}
// globals.css:
// @keyframes slow-pulse {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.4; }
// }
// .animate-slow-pulse { animation: slow-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```

---

## 付録: tailwind.config.js カスタム設定

プロトタイプ生成時に必要なカスタム animation / keyframes 設定をまとめたもの。

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        // ロゴカルーセル（無限スクロール）
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // シマースケルトン
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // スロープルス
        "slow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        // フェードインアップ（CSS版）
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "slow-pulse": "slow-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
};
```

---

## 付録: テーマ別コンポーネントスタイル早見表

各テーマでコンポーネントに適用すべきクラスの差分をまとめる。

| コンポーネント | minimal-corporate | modern-saas | glass | brutal | editorial-lux | big-typography | pop-illustration | dark-pro |
|---|---|---|---|---|---|---|---|---|
| カード角丸 | `rounded-xl` | `rounded-2xl` | `rounded-2xl` | `rounded-none` | `rounded-xl` | `rounded-xl` | `rounded-2xl` | `rounded-xl` |
| カード背景 | `bg-card border` | `bg-card border` | `bg-white/65 backdrop-blur-xl border-white/20` | `bg-card border-2 border-black` | `bg-card border` | `bg-card border` | `bg-card border` | `bg-card border-white/10` |
| カード影 | `shadow-sm` | `shadow-sm` | なし | `shadow-[4px_4px_0_0_#000]` | `shadow-none` | `shadow-none` | `shadow-sm` | `shadow-none` |
| ボタン角丸 | `rounded-md` | `rounded-lg` | `rounded-lg` | `rounded-none` | `rounded-md` | `rounded-md` | `rounded-full` | `rounded-md` |
| アイコンスタイル | outline | outline + 円形背景 | outline | solid | outline 最小限 | outline 最小限 | solid + カラフル | outline |
| セクション余白 | `py-20 md:py-32` | `py-16 md:py-24` | `py-16 md:py-24` | `py-12 md:py-20` | `py-20 md:py-32` | `py-24 md:py-40` | `py-16 md:py-24` | `py-16 md:py-24` |
| 見出しサイズ | `text-3xl md:text-4xl` | `text-3xl md:text-4xl` | `text-3xl md:text-4xl` | `text-3xl md:text-4xl font-black` | `text-3xl md:text-4xl font-serif` | `text-5xl md:text-7xl` | `text-3xl md:text-4xl` | `text-3xl md:text-4xl` |
| ホバー効果 | リフト + 影 | スケール + 影 | ボーダー光彩 | 影移動 | 控えめ背景色 | なし〜微小 | スケール + バウンス | ボーダー色変化 |
| モーション | subtle | standard | standard | none | subtle | subtle | standard〜expressive | standard |

---

## 付録: motionIntensity 別 Framer Motion 設定

生成時に `site.config.json` の `motionIntensity` に応じて適用する設定。

```jsx
const motionPresets = {
  none: {
    section: {},
    card: {},
    hover: {},
  },
  subtle: {
    section: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.4 },
    },
    card: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.4 },
    },
    hover: {},
  },
  standard: {
    section: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    card: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      whileHover: { y: -4 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    stagger: 0.1,
  },
  expressive: {
    section: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    card: {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      whileHover: { y: -6, scale: 1.02 },
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    stagger: 0.12,
  },
};
```
