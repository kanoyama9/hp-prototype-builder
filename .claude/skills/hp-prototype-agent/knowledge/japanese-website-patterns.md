# 日本語Webサイト特有のUX・UIパターン

日本の企業Webサイト制作で必須となる、文化的・言語的・法律的なパターンと実装ガイド。

---

## 1. 日本語タイポグラフィ

### 1-1. フォントスタック

#### モダン / クリーン系
```css
font-family:
  "Noto Sans JP",
  "Hiragino Kaku Gothic ProN",
  "Hiragino Sans",
  "Yu Gothic Medium",
  "Yu Gothic",
  "Meiryo",
  sans-serif;
```

#### 伝統 / エディトリアル系
```css
font-family:
  "Noto Serif JP",
  "Hiragino Mincho ProN",
  "Yu Mincho",
  "MS PMincho",
  serif;
```

#### システムフォントのみ（パフォーマンス重視）
```css
font-family:
  system-ui,
  -apple-system,
  "Segoe UI",
  "Hiragino Kaku Gothic ProN",
  "Yu Gothic",
  "Meiryo",
  sans-serif;
```

#### Tailwind 設定
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', 'sans-serif'],
        serif: ['"Noto Serif JP"', '"Hiragino Mincho ProN"', '"Yu Mincho"', 'serif'],
      },
    },
  },
};
```

### 1-2. フォントサイズと行間

| 要素 | PC | モバイル | 行間（line-height） |
|---|---|---|---|
| h1（Hero） | 40-64px (text-4xl〜text-6xl) | 28-40px (text-3xl〜text-4xl) | 1.2〜1.3 |
| h2（セクション見出し） | 28-36px (text-3xl〜text-4xl) | 24-28px (text-2xl〜text-3xl) | 1.3〜1.4 |
| h3（カード見出し） | 20-24px (text-xl〜text-2xl) | 18-20px (text-lg〜text-xl) | 1.4〜1.5 |
| 本文 | 16px (text-base) | 15-16px (text-base) | 1.75〜2.0 |
| 補助テキスト | 14px (text-sm) | 13-14px (text-sm) | 1.6〜1.75 |
| キャプション | 12px (text-xs) | 12px (text-xs) | 1.5〜1.6 |

**重要**: 日本語の本文は英語より行間を広くとる（1.75〜2.0 が読みやすい）。

```css
/* 日本語本文の最適設定 */
body {
  font-size: 16px;
  line-height: 1.875; /* 30px */
  letter-spacing: 0.05em;
  font-feature-settings: "palt" 1; /* プロポーショナル字詰め */
}
```

### 1-3. font-feature-settings

```css
/* プロポーショナル字詰め（見出しに推奨） */
h1, h2, h3 {
  font-feature-settings: "palt" 1;
}

/* カーニング */
body {
  font-kerning: auto;
}
```

**palt（プロポーショナル字詰め）の効果**:
- 句読点やカッコの前後の余白を詰める
- 見出しがきれいに整列する
- 本文では好みが分かれる（長文では使わない選択もあり）

### 1-4. テキスト折り返し

```css
/* 日本語の折り返し設定 */
body {
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: strict; /* 禁則処理を厳格に */
}

/* 見出しの折り返しバランス */
h1, h2 {
  text-wrap: balance; /* Chrome 114+ */
}

/* 長い英単語の折り返し */
.content {
  overflow-wrap: break-word;
  word-break: break-word;
}
```

**Tailwind**:
```html
<h1 className="text-balance">バランスの取れた見出し</h1>
<p className="break-words">長い英単語も折り返す本文</p>
```

### 1-5. 約物（句読点・括弧）の処理

```css
/* 約物半角化（高度な処理） */
.heading {
  font-feature-settings: "halt" 1; /* 約物の前後を詰める */
}

/* or palt で対応 */
.heading {
  font-feature-settings: "palt" 1;
}
```

---

## 2. 日本特有のUIパターン

### 2-1. お知らせ / ニュースリスト

日本の企業サイトで最も一般的なパターン。トップページに必ずと言ってよいほど配置される。

**パターンA: 標準リスト**
```
┌──────────────────────────────────────────────┐
│ お知らせ                      [一覧を見る →] │
├──────────────────────────────────────────────┤
│ 2025.01.15  [お知らせ]  年末年始の営業につい... │
│ 2024.12.20  [プレス]    新サービスを開始しま... │
│ 2024.12.01  [採用]     エンジニア募集を開始... │
│ 2024.11.15  [IR]       第3四半期決算報告     │
└──────────────────────────────────────────────┘
```

```jsx
function NewsList({ items }) {
  return (
    <section className="py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">お知らせ</h2>
          <a href="/news" className="text-sm text-primary hover:underline">
            一覧を見る →
          </a>
        </div>
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id}>
              <a href={item.url} className="flex items-start gap-4 py-4 hover:bg-muted/50 -mx-4 px-4 transition-colors">
                <time className="text-sm text-muted-foreground whitespace-nowrap mt-0.5">
                  {item.date}
                </time>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-sm whitespace-nowrap mt-0.5 font-medium",
                  categoryColors[item.category]
                )}>
                  {item.category}
                </span>
                <span className="text-sm line-clamp-1">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const categoryColors = {
  "お知らせ": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "プレス": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "採用": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "IR": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};
```

**パターンB: カード型ニュース**（画像付き）
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map(item => (
    <a key={item.id} href={item.url} className="group block">
      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <time className="text-xs text-muted-foreground">{item.date}</time>
      <h3 className="text-sm font-medium mt-1 line-clamp-2 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
    </a>
  ))}
</div>
```

### 2-2. 会社概要テーブル（定番パターン）

```jsx
function CompanyProfile({ profile }) {
  const rows = [
    { label: "会社名", value: profile.legalName },
    { label: "代表者", value: profile.representative },
    { label: "設立", value: profile.established },
    { label: "資本金", value: profile.capital },
    { label: "従業員数", value: profile.employees },
    { label: "所在地", value: profile.address },
    { label: "電話番号", value: profile.phone },
    { label: "事業内容", value: profile.business },
    { label: "主要取引先", value: profile.clients },
    { label: "取引銀行", value: profile.banks },
    { label: "許認可", value: profile.licenses },
  ].filter(row => row.value); // 値がないものは除外

  return (
    <section className="py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">会社概要</h2>
        <dl className="divide-y divide-border">
          {rows.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] py-4 gap-4">
              <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
              <dd className="text-sm whitespace-pre-line">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

### 2-3. 沿革（History Timeline）

```jsx
function HistoryTimeline({ events }) {
  return (
    <section className="py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">沿革</h2>
        <div className="relative">
          {/* 縦線 */}
          <div className="absolute left-[60px] md:left-[100px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-sm font-bold text-right pr-4 pt-0.5">
                  {event.year}
                  {event.month && <span className="text-muted-foreground font-normal">.{event.month}</span>}
                </div>
                <div className="relative pl-6">
                  {/* ドット */}
                  <div className="absolute -left-[5px] top-2 w-[10px] h-[10px] rounded-full bg-primary border-2 border-background" />
                  <p className="text-sm">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 2-4. アクセス / 地図セクション

```jsx
function AccessSection({ locations }) {
  return (
    <section className="py-16 bg-muted">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">アクセス</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 地図 */}
          <div className="aspect-video rounded-xl overflow-hidden bg-muted-foreground/10">
            {/* プロトタイプではプレースホルダ */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <MapPin className="mr-2" /> Google Maps
            </div>
          </div>
          {/* 情報 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">{locations[0].name}</h3>
              <p className="text-sm">〒{locations[0].postalCode}</p>
              <p className="text-sm">{locations[0].address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">交通アクセス</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {locations[0].access.map((a, i) => (
                  <li key={i}>・{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">お問い合わせ</h4>
              <p className="text-sm">TEL: <a href={`tel:${locations[0].phone}`} className="text-primary">{locations[0].phone}</a></p>
              <p className="text-sm">FAX: {locations[0].fax}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 2-5. 採用ページパターン

#### 募集職種カード
```jsx
function JobCard({ job }) {
  return (
    <div className="border rounded-xl p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs px-2 py-0.5 rounded-sm bg-primary/10 text-primary font-medium">
            {job.type} {/* 正社員/契約社員/パート */}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-sm bg-muted text-muted-foreground font-medium ml-2">
            {job.department}
          </span>
        </div>
        {job.isNew && (
          <span className="text-xs px-2 py-0.5 rounded-sm bg-destructive text-destructive-foreground font-medium">
            NEW
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2">{job.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.summary}</p>
      <dl className="grid grid-cols-[80px_1fr] gap-y-2 text-sm">
        <dt className="text-muted-foreground">勤務地</dt>
        <dd>{job.location}</dd>
        <dt className="text-muted-foreground">給与</dt>
        <dd>{job.salary}</dd>
      </dl>
      <div className="mt-4 pt-4 border-t">
        <a href={job.url} className="text-sm text-primary font-medium hover:underline">
          詳細を見る →
        </a>
      </div>
    </div>
  );
}
```

#### 選考フロー
```jsx
function RecruitProcess({ steps }) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center text-center w-[140px]">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-2">
              {i + 1}
            </div>
            <span className="text-sm font-medium">{step.name}</span>
            <span className="text-xs text-muted-foreground mt-1">{step.note}</span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight className="text-muted-foreground mx-2 hidden md:block" />
          )}
        </div>
      ))}
    </div>
  );
}
```

### 2-6. 営業時間テーブル

```jsx
function BusinessHours({ hours }) {
  const days = ["月", "火", "水", "木", "金", "土", "日"];
  return (
    <div className="rounded-xl border overflow-hidden">
      <h3 className="text-sm font-bold bg-muted px-4 py-3">営業時間</h3>
      <div className="divide-y divide-border">
        {days.map((day) => {
          const h = hours[day];
          return (
            <div key={day} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="font-medium w-8">{day}</span>
              {h ? (
                <span>{h.open} 〜 {h.close}</span>
              ) : (
                <span className="text-muted-foreground">定休日</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 3. ナビゲーションパターン

### 3-1. 日本語サイトのヘッダー構成

```
┌──────────────────────────────────────────────────────────┐
│ [ロゴ]        サービス  会社概要  採用  お知らせ  [問い合わせ] │ ← PC
├──────────────────────────────────────────────────────────┤
│ [ロゴ]                                          [≡]     │ ← モバイル
└──────────────────────────────────────────────────────────┘
```

```jsx
function Header({ config }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ロゴ */}
        <a href="/" className="font-bold text-lg">
          {config.assets?.logo?.primary ? (
            <img src={config.assets.logo.primary} alt={config.content?.company?.profile?.legalName || ""} className="h-8" />
          ) : (
            config.content?.company?.profile?.legalName || "サイト名"
          )}
        </a>

        {/* PC ナビ */}
        <nav className="hidden md:flex items-center gap-6">
          {config.navigation?.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            お問い合わせ
          </a>
        </nav>

        {/* モバイル ハンバーガー */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイル メニュー */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background overflow-hidden"
          >
            <div className="container px-4 py-4 space-y-2">
              {config.navigation?.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="block py-3 text-sm font-medium border-b border-border"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact"
                className="block w-full text-center rounded-lg bg-primary text-primary-foreground py-3 text-sm font-medium mt-4"
              >
                お問い合わせ
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

### 3-2. パンくずリスト

```jsx
function Breadcrumb({ items }) {
  return (
    <nav aria-label="パンくずリスト" className="py-3">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <a href="/" className="hover:text-foreground transition-colors">ホーム</a>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} />
            {i === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">{item.label}</span>
            ) : (
              <a href={item.path} className="hover:text-foreground transition-colors">{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### 3-3. フッターリンク構成（日本語サイト典型）

```jsx
const footerLinks = {
  "サービス": [
    { label: "サービス一覧", path: "/services" },
    { label: "料金プラン", path: "/pricing" },
    { label: "導入事例", path: "/case-studies" },
    { label: "よくある質問", path: "/faq" },
  ],
  "会社情報": [
    { label: "会社概要", path: "/company" },
    { label: "代表メッセージ", path: "/company#message" },
    { label: "沿革", path: "/company#history" },
    { label: "アクセス", path: "/company#access" },
  ],
  "採用情報": [
    { label: "採用トップ", path: "/careers" },
    { label: "募集職種", path: "/careers#positions" },
    { label: "福利厚生", path: "/careers#benefits" },
  ],
  "その他": [
    { label: "お知らせ", path: "/news" },
    { label: "ブログ", path: "/blog" },
    { label: "お問い合わせ", path: "/contact" },
  ],
};

const legalLinks = [
  { label: "プライバシーポリシー", path: "/privacy" },
  { label: "利用規約", path: "/terms" },
  { label: "特定商取引法に基づく表記", path: "/tokushoho" },
  { label: "サイトマップ", path: "/sitemap" },
];
```

### 3-4. 「ページトップへ戻る」ボタン

```jsx
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="ページトップへ戻る"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

---

## 4. フォームパターン

### 4-1. 日本語フォームの基本構成

```jsx
function ContactForm() {
  return (
    <form className="space-y-6 max-w-xl mx-auto">
      {/* 姓名（分離フィールド） */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
            姓
            <span className="text-xs px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">必須</span>
          </label>
          <input
            type="text"
            placeholder="山田"
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
            名
            <span className="text-xs px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">必須</span>
          </label>
          <input
            type="text"
            placeholder="太郎"
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* フリガナ */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
            セイ
            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">任意</span>
          </label>
          <input type="text" placeholder="ヤマダ" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
            メイ
            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">任意</span>
          </label>
          <input type="text" placeholder="タロウ" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
        </div>
      </div>

      {/* 会社名 */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
          会社名
          <span className="text-xs px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">必須</span>
        </label>
        <input type="text" placeholder="株式会社〇〇" required className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
      </div>

      {/* メールアドレス */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
          メールアドレス
          <span className="text-xs px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">必須</span>
        </label>
        <input type="email" placeholder="info@example.com" required className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
        <p className="text-xs text-muted-foreground mt-1">半角英数字で入力してください</p>
      </div>

      {/* 電話番号 */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
          電話番号
          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">任意</span>
        </label>
        <input type="tel" placeholder="03-1234-5678" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
        <p className="text-xs text-muted-foreground mt-1">半角数字・ハイフンで入力してください</p>
      </div>

      {/* お問い合わせ種別 */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
          お問い合わせ種別
          <span className="text-xs px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">必須</span>
        </label>
        <select required className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm">
          <option value="">選択してください</option>
          <option>サービスについて</option>
          <option>料金について</option>
          <option>導入について</option>
          <option>採用について</option>
          <option>その他</option>
        </select>
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
          お問い合わせ内容
          <span className="text-xs px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">必須</span>
        </label>
        <textarea
          rows={5}
          required
          placeholder="お問い合わせ内容をご記入ください"
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm resize-y"
        />
      </div>

      {/* 個人情報同意 */}
      <div className="flex items-start gap-3">
        <input type="checkbox" id="privacy" required className="mt-1 rounded" />
        <label htmlFor="privacy" className="text-sm">
          <a href="/privacy" target="_blank" className="text-primary underline">プライバシーポリシー</a>
          に同意の上、送信してください。
        </label>
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        送信する
      </button>

      <p className="text-xs text-muted-foreground text-center">
        通常2営業日以内にご返信いたします。
      </p>
    </form>
  );
}
```

### 4-2. 郵便番号→住所自動入力

```jsx
// プロトタイプでは簡易実装
function PostalCodeInput() {
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");

  const lookupAddress = async (code) => {
    // 実際にはzipcloud等のAPIを使用
    // https://zipcloud.ibsnet.co.jp/api/search?zipcode=1000001
    // プロトタイプでは省略
    console.log("住所検索:", code);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1.5 block">郵便番号</label>
          <div className="flex gap-2 items-center">
            <span className="text-sm">〒</span>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                if (e.target.value.replace("-", "").length === 7) {
                  lookupAddress(e.target.value);
                }
              }}
              placeholder="100-0001"
              maxLength={8}
              className="w-32 rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
            />
            <button type="button" onClick={() => lookupAddress(postalCode)} className="text-sm text-primary hover:underline">
              住所検索
            </button>
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">住所</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="東京都千代田区千代田1-1"
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
        />
      </div>
    </div>
  );
}
```

### 4-3. 確認画面パターン（日本特有）

```jsx
function ContactFormWithConfirmation() {
  const [step, setStep] = useState("input"); // "input" | "confirm" | "complete"
  const [data, setData] = useState({});

  if (step === "confirm") {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-center">入力内容の確認</h2>
        <p className="text-sm text-muted-foreground text-center">以下の内容でよろしければ「送信する」をクリックしてください。</p>
        <dl className="divide-y divide-border">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="grid grid-cols-[120px_1fr] py-3 gap-4">
              <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
              <dd className="text-sm">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setStep("input")} className="px-6 py-2.5 border rounded-lg text-sm">修正する</button>
          <button onClick={() => setStep("complete")} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm">送信する</button>
        </div>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <CheckCircle className="mx-auto text-primary mb-4" size={48} />
        <h2 className="text-xl font-bold mb-2">送信が完了しました</h2>
        <p className="text-sm text-muted-foreground">
          お問い合わせいただきありがとうございます。<br />
          内容を確認の上、担当者よりご連絡いたします。<br />
          通常2営業日以内にご返信いたします。
        </p>
        <a href="/" className="inline-block mt-6 text-sm text-primary hover:underline">トップページに戻る</a>
      </div>
    );
  }

  return <form>...</form>;
}
```

---

## 5. 色彩 / カラー慣例

### 5-1. 業界別カラー慣例

| 業界 | メインカラー | 理由 |
|---|---|---|
| 金融・保険 | 紺・青（#1e3a8a, #1e40af） | 信頼・安定 |
| IT・テック | 紫・青・シアン（#7c3aed, #0ea5e9） | 先進性・革新 |
| 医療・ヘルスケア | 青・緑（#0284c7, #059669） | 清潔・安心 |
| 飲食・食品 | 赤・オレンジ・茶（#dc2626, #ea580c） | 食欲・温かみ |
| 不動産・建設 | 緑・茶・紺（#059669, #78350f） | 安心・堅実 |
| 教育 | 青・緑・オレンジ（#2563eb, #16a34a） | 知性・成長 |
| 美容・ファッション | 黒・ゴールド・ピンク（#111827, #d97706） | 高級・洗練 |
| 法律・士業 | 紺・ゴールド（#1e3a8a, #b45309） | 権威・信頼 |
| 製造業 | 紺・グレー・赤（#1e3a8a, #dc2626） | 信頼・技術力 |

### 5-2. 和色（Japanese Traditional Colors）の活用

日本らしさを出す場合に有効な伝統色パレット。

| 色名 | Hex | 用途例 |
|---|---|---|
| 藍色（あいいろ） | #165B95 | 和風コーポレート、信頼感 |
| 紺色（こんいろ） | #223A5E | 堅実な企業、法律事務所 |
| 朱色（しゅいろ） | #EB6101 | 和食、神社仏閣、伝統産業 |
| 若草色（わかくさいろ） | #68BE8D | 環境、農業、ヘルスケア |
| 桜色（さくらいろ） | #FEEEED | 春のキャンペーン、美容、女性向け |
| 墨色（すみいろ） | #343434 | 高級和風、書道、茶道 |
| 金色（きんいろ） | #C9A84C | ラグジュアリー、受賞、記念 |
| 江戸紫（えどむらさき） | #745399 | 文化、芸術、クリエイティブ |
| 鬱金色（うこんいろ） | #FABF14 | 食品、伝統工芸 |
| 浅葱色（あさぎいろ） | #48929B | 和モダン、旅館、温泉 |

**使い方の指針**:
- メインカラーに和色を使う場合は、テーマ全体をミニマルに
- アクセントカラーとして和色を1色だけ使うのが無難
- 和色同士の組み合わせは慎重に（濁りやすい）

### 5-3. アクセシビリティのためのコントラスト

```
WCAG AA基準:
- 通常テキスト: 4.5:1 以上
- 大テキスト（18px bold or 24px以上）: 3:1 以上
- UI コンポーネント: 3:1 以上

よくある問題と対策:
- ライトグレーテキスト（#9ca3af）on 白: 2.7:1 ❌
  → #6b7280 に変更: 4.6:1 ✅
- Primary ボタン上の白テキスト: Primary色の明度を確認
  → #3b82f6（blue-500）on 白: 3.1:1（大テキストOK、通常テキストNG）
  → #2563eb（blue-600）on 白: 4.6:1 ✅
```

---

## 6. モバイル特有のパターン

### 6-1. 電話発信ボタン（tap-to-call）

```jsx
function PhoneButton({ phone }) {
  return (
    <a
      href={`tel:${phone.replace(/-/g, "")}`}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground py-4 text-center font-bold flex items-center justify-center gap-2"
    >
      <Phone size={20} />
      {phone}
    </a>
  );
}
```

### 6-2. LINE 連携ボタン

```jsx
function LineButton({ lineId }) {
  return (
    <a
      href={`https://line.me/R/ti/p/${lineId}`}
      className="inline-flex items-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#05b04d] transition-colors"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        {/* LINE アイコン SVG */}
      </svg>
      LINEで相談する
    </a>
  );
}
```

### 6-3. QR コード表示

```jsx
function QRCodeSection({ url, description }) {
  return (
    <div className="hidden md:flex flex-col items-center gap-3 p-6 rounded-xl border bg-card">
      <div className="w-32 h-32 bg-white p-2 rounded-lg">
        {/* QRコード画像 or ライブラリで生成 */}
        <img src={`/api/qr?url=${encodeURIComponent(url)}`} alt="QRコード" className="w-full h-full" />
      </div>
      <p className="text-xs text-muted-foreground text-center">{description}</p>
    </div>
  );
}
```

### 6-4. ボトムナビゲーション（モバイル）

```jsx
function BottomNav({ items }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <item.icon size={20} className={item.active ? "text-primary" : "text-muted-foreground"} />
            <span className={cn("text-[10px]", item.active ? "text-primary font-medium" : "text-muted-foreground")}>
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
```

**適合**: ia-local-store（店舗サイト）

### 6-5. セーフエリア対応

```css
/* iPhone ノッチ/ダイナミックアイランド対応 */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## 7. エラー・空状態のパターン

### 7-1. 404 ページ

```jsx
function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-muted-foreground/20 mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">ページが見つかりません</h1>
      <p className="text-muted-foreground mb-8">
        お探しのページは削除されたか、URLが変更された可能性があります。
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium"
      >
        トップページに戻る
      </a>
    </div>
  );
}
```

### 7-2. 空のセクション処理

```jsx
// セクションレンダラー：データが空なら非表示
function SectionRenderer({ section, data }) {
  // 空配列チェック
  if (Array.isArray(data) && data.length === 0) return null;
  // null/undefinedチェック
  if (!data) return null;
  // 空オブジェクトチェック
  if (typeof data === "object" && Object.keys(data).length === 0) return null;

  return <section>{/* レンダリング */}</section>;
}
```

---

## 8. OGP / メタ情報

### 8-1. メタタグテンプレート

```jsx
function MetaTags({ page, config }) {
  const siteName = config.content?.company?.profile?.legalName || "サイト名";
  const title = page.title ? `${page.title} | ${siteName}` : siteName;
  const description = page.description || config.content?.home?.hero?.subheadline || "";
  const ogImage = config.assets?.ogp?.image || "/og-image.png";

  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OGP */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* 日本語 */}
      <meta httpEquiv="content-language" content="ja" />
      <html lang="ja" />
    </head>
  );
}
```

### 8-2. 構造化データ（JSON-LD）

```jsx
function StructuredData({ config }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.content?.company?.profile?.legalName,
    url: config.siteUrl,
    logo: config.assets?.logo?.primary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "東京都",
      streetAddress: config.content?.company?.profile?.address,
      addressCountry: "JP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.content?.contact?.phone,
      email: config.content?.contact?.email,
      contactType: "customer service",
      availableLanguage: "Japanese",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```
