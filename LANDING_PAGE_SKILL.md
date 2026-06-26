# Datrix — AI Platform Landing Page Build Guide
## (FB Round 1 — 100-Point Scoring Brief)

---

## 0. WHAT THE JUDGES EXPECT AT A GLANCE

| Category | Points | What They're Testing |
|---|---|---|
| Logic, Architecture & State Isolation | 40 | No global re-renders on currency/billing changes |
| SEO & Semantic HTML | 30 | Correct tags, meta, OG, alt attributes |
| UI/UX & Motion Matching | 30 | Pixel-close to the demo.mp4 reference video |

---

## 1. ABOUT THE DEMO VIDEO

**Yes — you must replicate the motion from demo.mp4 as closely as possible.**

The brief says:
> "Replicate Motion Progressively: Implement the transitions, layout animations, and micro-interactions demonstrated in reference_showcase.mp4 as closely as your architecture permits to score maximum points."

Since the video is in the provided assets ZIP (`asset_package.zip`), you must:
1. Watch it carefully before building
2. Note every animation: hero entrance, section reveals, hover states, pricing toggle, bento expand
3. Replicate timing: **micro-interactions = 150–200ms ease-out**, **layout reflows = 300–400ms ease-in-out**
4. Use only native CSS Transitions / Animations / WAAPI — no Framer Motion, no GSAP

---

## 2. COLOR PALETTE (from colorPallet.pdf)

Use these exact hex codes everywhere. No other colors allowed.

```css
:root {
  --arctic-powder:    #F1F6F4;  /* Light bg, card surfaces */
  --mystic-mint:      #D9E8E2;  /* Secondary bg, subtle fills */
  --forsythia:        #FFC801;  /* Primary CTA, highlights, accents */
  --deep-saffron:     #FF9932;  /* Secondary accent, gradients */
  --nocturnal-exp:    #114C5A;  /* Primary dark text, dark sections */
  --oceanic-noir:     #172B36;  /* Darkest bg, footer, code blocks */
}
```

**Gradient combo**: Forsythia → Deep Saffron (warm hero gradient, pricing cards)
**Dark theme**: Nocturnal Expedition + Oceanic Noir backgrounds
**Light theme**: Arctic Powder + Mystic Mint backgrounds

---

## 3. TYPOGRAPHY

Pull the exact font names from the `font_list` file in the assets ZIP and load them via `@font-face` or Google Fonts CSS link in `<head>`. Do NOT use system fonts as substitutes — asset compliance is worth 15 points.

```html
<!-- In <head> — replace with actual font names from font_list asset -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=FONT_1:wght@400;500;600;700&family=FONT_2:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-heading: 'FONT_1', sans-serif;  /* from font_list asset */
  --font-body:    'FONT_2', sans-serif;  /* from font_list asset */
}
```

---

## 4. TECH STACK (Recommended)

**Framework**: Next.js 14 (App Router) — best for SEO, SSR, metadata API
**Styling**: Tailwind CSS v3 with custom config for the color palette
**Deploy**: Vercel (free, instant, optimal for Next.js)
**3D (optional)**: Three.js — permitted for hero visual enhancement

---

## 5. PAGE LAYOUT STRUCTURE

```
<html lang="en">
  <head>  ← SEO metadata, OG tags, font preloads
  <body>
    <header>    ← Nav + logo
    <main>
      <section id="hero">          ← Hero with headline + CTA
      <section id="features">      ← Bento Grid (desktop) / Accordion (mobile)
      <section id="social-proof">  ← Testimonials / logos / stats
      <section id="pricing">       ← Currency switcher + billing toggle + 3 tier cards
    </main>
    <footer>    ← Links, legal
```

**Critical**: Use semantic tags throughout. Every major section gets an `<section>` with a unique `id`. Headings must follow proper H1 → H2 → H3 hierarchy.

---

## 6. FEATURE 1 — PRICING MATRIX (15 pts logic + 15 pts state isolation)

### Data Architecture (multi-dimensional matrix)

```javascript
// pricing.config.js
// Base rates in USD cents per month
const BASE_RATES = {
  starter:    { monthly: 2900,  annual: 2320  }, // 20% annual discount
  pro:        { monthly: 7900,  annual: 6320  },
  enterprise: { monthly: 19900, annual: 15920 },
};

// Regional tariff multipliers
const TARIFF = {
  USD: { multiplier: 1.00, symbol: '$', code: 'USD' },
  INR: { multiplier: 83.5, symbol: '₹', code: 'INR' },
  EUR: { multiplier: 0.92, symbol: '€', code: 'EUR' },
};

// Compute price dynamically — NEVER hardcode display values
export function getPrice(tier, cycle, currency) {
  const base = BASE_RATES[tier][cycle];        // cents
  const { multiplier, symbol } = TARIFF[currency];
  const amount = Math.round((base / 100) * multiplier);
  return { display: `${symbol}${amount.toLocaleString()}`, raw: amount };
}
```

### State Isolation Requirement (15 pts — CRITICAL)

**The judge will open Chrome DevTools → Performance tab and watch for layout thrashing.**

You MUST update ONLY the text node content, NOT re-render the parent component.

```javascript
// ✅ CORRECT — Direct DOM text node update (zero re-render)
function updatePriceDisplay(tier, cycle, currency) {
  const el = document.getElementById(`price-${tier}`);
  if (el) el.textContent = getPrice(tier, cycle, currency).display;
}

// ❌ WRONG — Triggers full component re-render
const [price, setPrice] = useState(getPrice('starter', 'monthly', 'USD'));
// Setting state causes React to re-render the entire pricing section
```

**Implementation pattern**: Use `useRef` to hold direct DOM references to price text nodes. On currency/billing change, iterate refs and call `.current.textContent = newPrice`. The surrounding card, toggle, and layout must NOT re-paint.

```jsx
// React implementation with ref-based isolation
const priceRefs = useRef({});

const handleCurrencyChange = useCallback((newCurrency) => {
  // Update state for internal tracking ONLY
  currencyRef.current = newCurrency;
  // Directly mutate text nodes — no setState that affects layout
  Object.entries(priceRefs.current).forEach(([tier, ref]) => {
    if (ref) ref.textContent = getPrice(tier, cycleRef.current, newCurrency).display;
  });
}, []);

// In JSX:
<span ref={el => priceRefs.current['starter'] = el}>
  {getPrice('starter', 'monthly', 'USD').display}
</span>
```

### Currency Switcher UI

```jsx
// Three-way segmented control: INR | USD | EUR
// Position: top-right of pricing section OR above the tier cards
// Animation: 150ms ease-out slide on the active indicator
<div role="group" aria-label="Currency selector" className="currency-switcher">
  {['INR', 'USD', 'EUR'].map(c => (
    <button
      key={c}
      role="radio"
      aria-checked={currency === c}
      onClick={() => handleCurrencyChange(c)}
    >
      {c}
    </button>
  ))}
</div>
```

### Billing Toggle

```jsx
// Monthly / Annual toggle with "Save 20%" badge on annual
<div role="switch" aria-checked={isAnnual} onClick={toggleBilling}>
  <span>Monthly</span>
  <div className="toggle-thumb" />
  <span>Annual <mark>Save 20%</mark></span>
</div>
```

---

## 7. FEATURE 2 — BENTO-TO-ACCORDION (10 pts)

### Desktop: Bento Grid

```css
/* Desktop (≥768px) */
.features-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
/* Feature cards can span columns for visual hierarchy */
.bento-card--wide  { grid-column: span 2; }
.bento-card--tall  { grid-row: span 2; }
```

### Mobile: Accordion (from scratch — NO HeadlessUI, NO Radix)

```css
/* Mobile (<768px) */
@media (max-width: 767px) {
  .features-bento { display: none; }
  .features-accordion { display: block; }
}
@media (min-width: 768px) {
  .features-bento { display: grid; }
  .features-accordion { display: none; }
}

/* Accordion animation — native CSS only */
.accordion-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 350ms ease-in-out, opacity 300ms ease-in-out;
  opacity: 0;
}
.accordion-item.active .accordion-content {
  max-height: 400px; /* must be larger than content */
  opacity: 1;
}
```

### Context Transfer on Resize (CRITICAL — part of the 10 pts)

This is the tricky part. When the user is hovering/interacting with bento card index N on desktop, and they resize to mobile, that same accordion panel N must open automatically.

```javascript
useEffect(() => {
  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && activeDesktopIndex !== null) {
        // Transfer context: open the same index in accordion
        setActiveAccordionIndex(activeDesktopIndex);
      }
    }, 100); // debounce
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [activeDesktopIndex]);
```

Track `activeDesktopIndex` via `onMouseEnter` on each bento card (not just click), because the spec says "hovering over". On resize past 768px breakpoint, programmatically open the matching accordion panel.

---

## 8. SEO & METADATA (30 pts)

### Full metadata in Next.js App Router

```jsx
// app/layout.tsx
export const metadata = {
  title: 'Datrix — Automate the Impossible. Scale the Rest.',
  description: 'Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.',
  keywords: ['AI automation', 'data platform', 'workflow automation', 'enterprise AI', 'datrix'],
  openGraph: {
    title: 'Datrix — Automate the Impossible. Scale the Rest.',
    description: 'Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.',
    url: 'https://datrix.vercel.app',
    siteName: 'Datrix',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Datrix AI Platform Dashboard' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Datrix — Automate the Impossible. Scale the Rest.',
    description: 'Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  canonical: 'https://datrix.vercel.app',
};
```

### Semantic HTML Checklist

```html
<!-- ✅ Required semantic structure -->
<header role="banner">
  <nav aria-label="Main navigation">
    <a href="/" aria-label="Datrix home"><!-- Logo SVG --></a>
    <ul role="list">
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <section id="hero" aria-labelledby="hero-heading">
    <h1 id="hero-heading">Automate the Impossible. Scale the Rest.</h1>
  </section>

  <section id="features" aria-labelledby="features-heading">
    <h2 id="features-heading">Built Different. By Design.</h2>
    <!-- Bento / Accordion here -->
  </section>

  <section id="social-proof" aria-labelledby="proof-heading">
    <h2 id="proof-heading">Trusted by 10,000+ Data Teams</h2>
  </section>

  <section id="pricing" aria-labelledby="pricing-heading">
    <h2 id="pricing-heading">One Platform. Every Scale.</h2>
  </section>
</main>

<footer role="contentinfo">
  <!-- Footer links, copyright — Datrix © 2026 -->
</footer>
```

### SVG Assets from ZIP

Every SVG from the asset pack must be used. Inline them with proper `aria` attributes:
```html
<svg role="img" aria-label="Feature icon: real-time sync" focusable="false">
  <!-- SVG paths from asset_package -->
</svg>
```

For decorative SVGs: `aria-hidden="true"`

---

## 9. ANIMATION SPEC (from brief)

| Interaction | Duration | Easing |
|---|---|---|
| Hover states | 150–200ms | ease-out |
| Button clicks / toggles | 150–200ms | ease-out |
| Accordion open/close | 300–400ms | ease-in-out |
| Bento layout reflow | 300–400ms | ease-in-out |
| Page entry / hero | ≤500ms total | ease-out |
| Currency number swap | 150ms | ease-out |

```css
/* CSS custom properties for consistent timing */
:root {
  --ease-micro: 175ms ease-out;      /* hover, toggle, click */
  --ease-layout: 350ms ease-in-out;  /* reflow, accordion */
}

/* Example hover */
.btn-primary {
  transition: background-color var(--ease-micro),
              transform var(--ease-micro),
              box-shadow var(--ease-micro);
}
.btn-primary:hover {
  transform: translateY(-2px);
}
```

### Entry Animation (≤500ms TTI constraint)

```css
/* Stagger hero elements — total orchestration under 500ms */
.hero-badge     { animation: fadeUp 400ms ease-out 0ms   both; }
.hero-heading   { animation: fadeUp 400ms ease-out 80ms  both; }
.hero-subtext   { animation: fadeUp 400ms ease-out 160ms both; }
.hero-cta       { animation: fadeUp 400ms ease-out 240ms both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Do NOT block HTML parsing. Animations must use `animation-fill-mode: both` so they start at the `from` state before playing. Never use JavaScript `setTimeout` chains that block TTI.

---

## 10. PERFORMANCE RULES

- No `layout` or `paint` properties in animations — only `transform` and `opacity` (GPU composited)
- Lazy load images below the fold: `<img loading="lazy">`
- Preload hero assets: `<link rel="preload" as="image" href="/hero-visual.webp">`
- Font display: `font-display: swap` in `@font-face`
- No `import` of Framer Motion, GSAP, anime.js, or any runtime animation engine
- No `@emotion`, `styled-components` or any runtime CSS-in-JS

---

## 11. BANNED LIBRARIES (instant disqualification)

- ❌ Framer Motion
- ❌ Radix UI
- ❌ Shadcn/ui
- ❌ HeadlessUI
- ❌ Tailwind UI components
- ❌ GSAP / anime.js
- ❌ Any CSS-in-JS runtime

**Allowed**:
- ✅ React / Next.js
- ✅ Tailwind CSS (utility classes only)
- ✅ Three.js (for 3D effects)
- ✅ Native Web Animations API (WAAPI)
- ✅ CSS Custom Properties + Transitions + `@keyframes`

---

## 12. FILE & ASSET CHECKLIST

From `asset_package.zip`, verify you use ALL of:

- [ ] Every SVG from the SVG pack (inline them in JSX/HTML)
- [ ] Both font families from the font list (loaded in `<head>`)
- [ ] All 6 brand colors applied meaningfully across the UI

Missing or unused assets = heavy point deductions (15-pt category).

---

## 13. FOLDER STRUCTURE (Next.js)

```
/
├── app/
│   ├── layout.tsx          ← Root layout + metadata
│   ├── page.tsx            ← Landing page (all sections)
│   └── globals.css         ← CSS variables, base styles, keyframes
├── components/
│   ├── Hero.tsx
│   ├── Features/
│   │   ├── BentoGrid.tsx
│   │   └── Accordion.tsx
│   ├── Pricing/
│   │   ├── PricingSection.tsx
│   │   ├── PricingCard.tsx
│   │   ├── BillingToggle.tsx
│   │   └── CurrencySwitcher.tsx
│   └── SocialProof.tsx
├── lib/
│   └── pricing.config.ts   ← Multi-dimensional pricing matrix
├── public/
│   ├── svgs/               ← All SVGs from asset pack
│   └── og-image.png        ← 1200×630 OG image
└── tailwind.config.ts      ← Custom colors from palette
```

---

## 14. TAILWIND CONFIG

```javascript
// tailwind.config.ts
module.exports = {
  content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        'arctic-powder':  '#F1F6F4',
        'mystic-mint':    '#D9E8E2',
        'forsythia':      '#FFC801',
        'deep-saffron':   '#FF9932',
        'nocturnal':      '#114C5A',
        'oceanic-noir':   '#172B36',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body:    ['var(--font-body)'],
      },
      transitionDuration: {
        'micro':  '175',
        'layout': '350',
      },
    },
  },
};
```

---

## 15. DEPLOYMENT CHECKLIST

- [ ] `git init`, commit everything, push to **public** GitHub repo
- [ ] Connect repo to Vercel, auto-deploy
- [ ] Verify live URL returns 200 (not 404/500)
- [ ] Test pricing toggle in Chrome DevTools → Performance (no global re-renders)
- [ ] Test bento→accordion resize context transfer
- [ ] Validate semantic HTML with browser DevTools accessibility panel
- [ ] Check OG tags with `https://opengraph.xyz`
- [ ] Record demo video ≤100MB, upload to Drive, make link shareable

---

## 16. SCORING QUICK REFERENCE

| Check | How to verify |
|---|---|
| Currency isolated | Chrome DevTools → Performance → no yellow layout bars on toggle |
| Bento→Accordion | Hover card #2, resize window, accordion #2 opens |
| Semantic HTML | DevTools → Elements → check for `<main>`, `<section>`, `<header>`, `<nav>`, `<footer>` |
| OG tags | Source code → `<meta property="og:title">` etc. |
| Font compliance | Network tab → fonts loaded match the asset font list |
| Color compliance | UI matches the 6 hex codes, no off-palette colors |
| SVG usage | All SVGs from pack appear visibly in the page |
| Animation timing | DevTools → FPS meter, transitions under 400ms, entry under 500ms |

---

## 17. BRAND IDENTITY — DATRIX

### Brand Name
**Datrix** — data + matrix. Directly echoes the "matrix-driven pricing" language of the brief. Premium, technical, memorable.

### Tagline
> Automate the Impossible. Scale the Rest.

### Sub-tagline (hero paragraph)
> Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.

---

## 18. FULL PAGE COPY

### Navigation
```
Logo: DATRIX
Links: Features  |  Pricing  |  Docs  |  Sign In
CTA Button: Get Started Free
```

### Hero Section
```html
<!-- Badge above heading -->
<span class="hero-badge">Next-Gen AI Automation Platform</span>

<!-- H1 -->
<h1>Automate the Impossible.<br>Scale the Rest.</h1>

<!-- Subtext -->
<p>
  Datrix turns raw data chaos into intelligent workflows —
  in real time, at any scale, across every team.
</p>

<!-- CTA row -->
<a href="#pricing" class="btn-primary">Start Free Trial</a>
<a href="#features" class="btn-secondary">See It in Action →</a>

<!-- Trust signal below CTAs -->
<p class="hero-trust">No credit card required · Setup in 60 seconds · Cancel anytime</p>
```

### Social Proof Bar (between Hero and Features)
```
Trusted by 10,000+ data teams across 40 countries
[Logo] [Logo] [Logo] [Logo] [Logo]   ← company logos from SVG pack
```

### Features Section Header
```html
<h2>Built Different. By Design.</h2>
<p>Every feature engineered for teams that can't afford to be slow.</p>
```

### Pricing Section Header
```html
<h2>One Platform. Every Scale.</h2>
<p>No hidden fees. No vendor lock-in. Switch plans anytime.</p>
```

### Footer
```
Datrix — Where data meets intelligence.
© 2026 Datrix Inc. All rights reserved.
Links: Privacy · Terms · Docs · Status · Contact
```

---

## 19. BENTO GRID — FEATURE CARDS (6 nodes)

Use these for both the desktop Bento Grid and the mobile Accordion.
Each card has: `index`, `title`, `description`, `badge` (optional), and `span` for grid layout.

```javascript
// features.config.ts
export const FEATURES = [
  {
    index: 0,
    title: "Real-Time Data Matrix",
    description: "Process millions of events per second with zero-latency pipelines. Datrix's streaming core transforms raw inputs into structured intelligence before your next breath.",
    badge: "Core Engine",
    span: "wide",   // grid-column: span 2 on desktop
    icon: "icon-matrix.svg",  // from SVG pack
  },
  {
    index: 1,
    title: "Autonomous Workflow Engine",
    description: "Build complex multi-step automations visually. Datrix handles branching logic, error recovery, and retry orchestration — no code required.",
    badge: null,
    span: "normal",
    icon: "icon-workflow.svg",
  },
  {
    index: 2,
    title: "Universal Connector Hub",
    description: "Plug into 200+ data sources in one click. REST, GraphQL, webhooks, databases, cloud storage — Datrix speaks every protocol natively.",
    badge: "200+ Integrations",
    span: "normal",
    icon: "icon-connector.svg",
  },
  {
    index: 3,
    title: "Predictive Intelligence Layer",
    description: "Don't just move data — understand it. Datrix surfaces anomalies, forecasts trends, and flags issues before they become incidents.",
    badge: "AI-Powered",
    span: "normal",
    icon: "icon-predict.svg",
  },
  {
    index: 4,
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II certified. End-to-end encryption, role-based access control, audit logs, and GDPR compliance built into every layer.",
    badge: "SOC 2 Certified",
    span: "normal",
    icon: "icon-security.svg",
  },
  {
    index: 5,
    title: "Infinite Scale Architecture",
    description: "Start with one workflow. Grow to a billion events. Datrix auto-scales horizontally with no configuration, no downtime, no ceiling.",
    badge: null,
    span: "wide",   // grid-column: span 2 on desktop
    icon: "icon-scale.svg",
  },
];
```

### Bento Grid Layout Map (desktop)

```
┌─────────────────────────┬─────────────┐
│  Real-Time Data Matrix  │  Autonomous │
│  (span 2)               │  Workflow   │
├──────────────┬──────────┤  Engine     │
│  Universal   │Predictive│             │
│  Connector   │Intelligence             │
├──────────────┴──────────┼─────────────┤
│  Enterprise Security    │  Infinite   │
│                         │  Scale      │
│  Infinite Scale (span 2)│  (span 2)   │
└─────────────────────────┴─────────────┘
```

Actual recommended 3-col grid arrangement:
```
Row 1: [Real-Time Matrix ×2] [Autonomous Workflow ×1]
Row 2: [Universal Connector ×1] [Predictive Intelligence ×1] [Enterprise Security ×1]
Row 3: [Infinite Scale ×2] [empty or stats card ×1]
```

### Accordion (mobile) — same data, different render

```jsx
// Each FEATURES item renders as:
<div className="accordion-item" data-index={feature.index}>
  <button
    className="accordion-trigger"
    aria-expanded={activeIndex === feature.index}
    aria-controls={`panel-${feature.index}`}
    onClick={() => setActiveIndex(
      activeIndex === feature.index ? null : feature.index
    )}
  >
    <svg aria-hidden="true">{/* icon from SVG pack */}</svg>
    <span>{feature.title}</span>
    <svg className="chevron" aria-hidden="true">{/* chevron icon */}</svg>
  </button>
  <div
    id={`panel-${feature.index}`}
    className="accordion-content"
    role="region"
    aria-labelledby={`trigger-${feature.index}`}
  >
    {feature.badge && <span className="badge">{feature.badge}</span>}
    <p>{feature.description}</p>
  </div>
</div>
```

---

## 20. PRICING TIER COPY

```javascript
export const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For individuals and small teams getting started.',
    highlight: false,
    features: [
      'Up to 500K events/month',
      '5 active workflows',
      '10 connectors',
      'Community support',
      'Basic analytics dashboard',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing teams that need power and speed.',
    highlight: true,   // "Most Popular" badge, forsythia border
    features: [
      'Up to 10M events/month',
      'Unlimited workflows',
      '50 connectors',
      'Priority email support',
      'Advanced analytics + alerts',
      'Team collaboration tools',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For orgs that need unlimited scale and compliance.',
    highlight: false,
    features: [
      'Unlimited events',
      'Unlimited workflows',
      '200+ connectors',
      'Dedicated support + SLA',
      'SOC 2 audit logs',
      'Custom SSO / SAML',
      'On-prem deployment option',
    ],
    cta: 'Contact Sales',
  },
];
```

### Pricing card badge copy
- Starter tier: no badge
- Pro tier: `⚡ Most Popular`
- Enterprise tier: `🏢 Custom Pricing`

### Below pricing cards
```
"All plans include: 14-day free trial · No setup fees · Cancel anytime"
```

---

## 21. SOCIAL PROOF COPY

### Stats bar
```
10,000+         200+            99.99%          <50ms
Teams           Integrations    Uptime SLA      Avg. Latency
```

### Testimonial cards (3 cards minimum)

```javascript
export const TESTIMONIALS = [
  {
    quote: "Datrix cut our data pipeline build time from 3 weeks to 3 hours. It's the backbone of our entire analytics stack.",
    name: "Priya Nair",
    role: "Head of Data Engineering",
    company: "Zeta Financial",
  },
  {
    quote: "The pricing matrix feature alone saved us hours of spreadsheet work. Datrix just gets enterprise complexity.",
    name: "Marcus Chen",
    role: "CTO",
    company: "Loopline Systems",
  },
  {
    quote: "We process 50 million events a day through Datrix. It's never missed a beat — and the UI is genuinely beautiful.",
    name: "Aisha Okonkwo",
    role: "VP Engineering",
    company: "Novu Analytics",
  },
];
```
