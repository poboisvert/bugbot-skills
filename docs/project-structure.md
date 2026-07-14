# Project structure

Canopy is a Next.js App Router storefront: a plant catalogue with promo pricing and a client-side cart. The app is also a workshop for Cursor Bugbot and agent skills — some paths intentionally include anti-patterns for review tooling to catch.

```
bugbot-skills/
├── app/                 # Routes, layout, metadata, SEO
├── components/          # UI (Server + Client Components)
│   └── cart/            # Compound cart (provider, trigger, drawer)
├── lib/                 # Shared data and helpers (no React)
├── public/              # Static assets
├── docs/                # Project documentation
├── .agents/skills/      # Installed agent skills
├── .cursor/             # Bugbot / Cursor project rules
└── .github/workflows/   # CI (e.g. stage → main)
```

| Path | Role |
| ---- | ---- |
| `app/` | App Router entrypoints: pages, root layout, `robots` / `sitemap` |
| `components/` | Presentational and interactive UI composed by pages |
| `lib/` | Domain types, catalogue data, promo math, site URL |
| `public/` | Files served as-is |
| `.agents/skills/` | Agent skill packs used when editing this repo |
| `.cursor/BUGBOT.md` | Project-specific Bugbot review rules |

Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. Path alias `@/` maps to the repo root (`tsconfig.json`).

---

## `lib/`

Shared, framework-light modules. Prefer importing from here instead of duplicating plant or URL logic in components.

### `lib/site.ts`

Resolves the canonical site origin for metadata, sitemap, and robots:

1. `NEXT_PUBLIC_SITE_URL` (trailing slash stripped), else
2. `https://${VERCEL_URL}` on Vercel, else
3. `http://localhost:3000`

Used by `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`, and `app/robots.ts`.

### `lib/plants.ts`

Catalogue domain layer:

| Export | Purpose |
| ------ | ------- |
| `Plant`, `PlantPromo`, `PlantCategory`, `PromoPlant` | Types for inventory and promos |
| `plants` | Static catalogue array (Unsplash image URLs) |
| `plantCategories` | Filter labels for the catalogue UI |
| `isPromoActive` / `getActivePromo` / `hasPromo` | Active promo selection (lowest price; flash wins ties) |
| `getPromoPlants` | Active promo plants, soonest-ending first (deals page) |
| `getPromoEndTime` | Promo end timestamp for countdowns |
| `displayPrice` / `formatPrice` | Price for display / USD formatting |

#### Promo date range (inclusive)

Each `PlantPromo` has `startDate` and `endDate` as `YYYY-MM-DD` calendar days. **Both ends are included:** a promo is active on the start day and on the end day. Display the plant as a deal whenever `today` satisfies `startDate <= today <= endDate` (see `isPromoActive`). Do not treat the end date as exclusive.

Example: `startDate: "2026-07-01"`, `endDate: "2026-07-17"` → show the deal from July 1 through July 17 inclusive.

Some helpers (`getPlantListPrice`, `promoEndsAfter`) are intentionally mistyped so Bugbot / type tooling can surface them. Prefer the correctly typed helpers above for new UI.

---

## `app/` (pages and routing)

App Router only. Prefer Server Components; add `"use client"` only where interactivity requires it.

| File | Route | Role |
| ---- | ----- | ---- |
| `layout.tsx` | all | Root HTML shell: fonts, metadata, `SiteShell` wrapper |
| `page.tsx` | `/` | Home: hero + catalogue |
| `deals/page.tsx` | `/deals` | Active promos with countdowns |
| `sitemap.ts` | `/sitemap.xml` | Home + deals URLs via `getSiteUrl()` |
| `robots.ts` | `/robots.txt` | Allow all; points at sitemap |
| `globals.css` | — | Design tokens and global styles |
| `favicon.ico` | — | Favicon |

### Root layout

`app/layout.tsx` sets `metadataBase` from `getSiteUrl()`, loads display/body fonts, and wraps every page in `SiteShell` (header, footer, cart provider + drawer).

### Home (`/`)

`app/page.tsx` renders the skip link, async `Hero`, and client `Catalogue` fed by `plants` from `lib/plants`. The hero is awaited before JSX returns (no `Suspense`) — an intentional waterfall for review demos.

### Deals (`/deals`)

`app/deals/page.tsx` sets page metadata and renders `Deals`, which calls `getPromoPlants()` and maps each entry to `DealCard`.

Only plants with an **active** promo appear. Activity uses the inclusive `startDate`–`endDate` window above: if today is on either boundary day, the item still shows on `/deals` (and catalogue promo pricing applies).

---

## `components/`

UI composed by pages and the shell. Client boundaries are marked with `"use client"`.

| Component | Notes |
| --------- | ----- |
| `site-shell.tsx` | Layout chrome: `Cart.Provider`, header, main, footer, drawer |
| `site-header.tsx` | Nav + cart trigger |
| `hero.tsx` / `hero-carousel.tsx` | Home hero (carousel is client) |
| `catalogue.tsx` | Filterable plant grid (client) |
| `plant-card.tsx` | Catalogue card + add to cart |
| `deals.tsx` / `deal-card.tsx` | Deals list and card |
| `promo-countdown.tsx` | Live promo end countdown (client) |
| `cart/` | Compound cart API |

### Cart compound component

```ts
// components/cart/index.tsx
Cart = { Provider, Trigger, Drawer }
```

State lives in `cart-context.tsx`; the trigger opens the drawer. Use the compound export from `@/components/cart` rather than importing pieces ad hoc unless you need a single submodule.

---

## Data flow (high level)

```
lib/plants ──► app/page (Catalogue) ──► PlantCard ──► Cart context
           └─► components/deals ──► DealCard ──► PromoCountdown / Cart

lib/site ──► layout metadata, sitemap, robots
```

There is no database or API route layer yet: catalogue and promos are in-memory from `lib/plants.ts`. Checkout is a reservation mock in the cart drawer.

---

## Config and tooling

| File | Notes |
| ---- | ----- |
| `next.config.ts` | Unsplash `images.remotePatterns`; `typescript.ignoreBuildErrors` enabled for intentional type bugs |
| `package.json` | Scripts: `dev`, `build`, `start`, `lint` |
| `AGENTS.md` / `CLAUDE.md` | Pointers for coding agents (Next.js 16 docs under `node_modules/next/dist/docs/`) |
| `.cursor/BUGBOT.md` | What Bugbot should flag vs ignore in this repo |

For agent skills and how to add them, see the root [README](../README.md).
