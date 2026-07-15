# Cursor AI · BugBot · Agent Skills — PowerPoint outline

Use this file to build a deck. Each `##` is a slide. Copy the **Cursor prompts** at the end into Agent chat as-is.

**Repo:** Canopy storefront (`bugbot-skills`) — Next.js 16 App Router plant catalogue with `/` and `/deals`, used to demo Cursor Bugbot and agent skills.

---

## Slide 1 — Title

**Cursor AI, BugBot & Skills**  
Workshop on the Canopy Next.js storefront

- Routes: `/` (homepage) · `/deals` (promos)
- Stack: Next.js 16 · React 19 · Tailwind 4 · TypeScript

---

## Slide 2 — Agenda

1. What is Cursor AI?
2. What is BugBot?
3. Agent skills in this repo
4. Live prompts: SEO, performance, deals correctness
5. How to run prompts in Cursor

---

## Slide 3 — Cursor AI (what it is)

**Cursor** = AI-native code editor (VS Code fork) with agents that can read, edit, and run tools in your repo.

| Feature | What it does |
| ------- | ------------ |
| **Agent** | Multi-step coding: explore → edit → verify |
| **Chat / Ask** | Q&A without changing files (or with edits in Agent mode) |
| **Rules** | Project guidance (`AGENTS.md`, `.cursor/`) |
| **Skills** | Packaged workflows agents load on demand (`.agents/skills/`) |
| **BugBot** | Automated PR review that flags real bugs |

---

## Slide 4 — Cursor AI (how we use it here)

For Canopy demos, ask Cursor to:

- Audit SEO with `nextjs-seo-optimizer`
- Find slow homepage paths with `nextjs-performance` / `nextjs-bundle-optimizer`
- Verify deals date logic against `lib/plants.ts`
- Review PRs with BugBot rules in `.cursor/BUGBOT.md`

**Tip:** Name the skill or file path in the prompt so the agent loads the right playbook.

---

## Slide 5 — BugBot (what it is)

**BugBot** = Cursor’s automated code review for pull requests.

- Runs on PR diffs (e.g. `stage` → `main`)
- Looks for bugs, security issues, performance regressions
- Project rules live in [`.cursor/BUGBOT.md`](../.cursor/BUGBOT.md)

**This repo’s focus:** App Router / RSC mistakes, client bundle bloat, LCP/hero issues, type errors, a11y blockers — not style nits.

---

## Slide 6 — BugBot (what it flags vs ignores)

**Flag**

- Async work blocking a whole page with no `Suspense`
- Heavy client libs (`lodash`, `moment`) on critical paths
- RSC → client prop bloat
- Type errors / unsafe casts
- Missing auth in Server Actions
- Blocking a11y (icon-only buttons, bad `alt`)

**Ignore**

- Tailwind class order, quote style
- Pages Router APIs in this App Router app
- Suggesting `forwardRef` / `useContext` on React 19 code that already uses `ref` / `use()`

---

## Slide 7 — Agent skills (concept)

A **skill** is a folder under `.agents/skills/<name>/` with a `SKILL.md` the agent follows when the task matches.

```
.agents/skills/
├── nextjs-seo-optimizer/
├── nextjs-performance/
├── nextjs-bundle-optimizer/
├── vercel-react-best-practices/
├── vercel-composition-patterns/
├── vercel-react-view-transitions/
├── deploy-to-vercel/
├── web-design-guidelines/
└── writing-guidelines/
```

Locked in `skills-lock.json`. Add with:

```bash
npx skills add <owner/repo> --skill <skill-name> -y
```

---

## Slide 8 — Skills map (this repo)

| Skill | Use when |
| ----- | -------- |
| `nextjs-seo-optimizer` | Metadata, sitemap, robots, JSON-LD, crawlability |
| `nextjs-performance` | Caching, images, Core Web Vitals patterns |
| `nextjs-bundle-optimizer` | Measure → one fix → re-measure bundle/build |
| `vercel-react-best-practices` | Waterfalls, bundle size, re-renders |
| `vercel-composition-patterns` | Compound components, avoid boolean props |
| `vercel-react-view-transitions` | Route / shared-element animations |
| `deploy-to-vercel` | Preview / production deploy |
| `web-design-guidelines` | UI / a11y review |
| `writing-guidelines` | Docs voice / tone |

---

## Slide 9 — Canopy architecture (context for demos)

```
lib/plants ──► app/page (Hero + Catalogue)
           └─► components/deals ──► DealCard

lib/site   ──► layout metadata, sitemap, robots
```

| Path | Role |
| ---- | ---- |
| `app/page.tsx` | Home — awaits `Hero()` then renders `Catalogue` (intentional waterfall) |
| `app/deals/page.tsx` | Deals metadata + `<Deals />` |
| `components/hero.tsx` | Heavy hero (videos, lodash, moment — demo anti-patterns) |
| `lib/plants.ts` | Promo windows: `isPromoActive`, `getPromoPlants` |
| `.cursor/BUGBOT.md` | BugBot review contract |

---

## Slide 10 — Demo flow

1. Paste a **Cursor prompt** (slides 12–15) into Agent
2. Agent loads the named skill + reads the listed files
3. Review findings (SEO score, slow component, deal mismatches)
4. Optionally: open a PR and let **BugBot** review the fix

---

## Slide 11 — How to paste prompts

In Cursor:

1. Open Agent chat in this repo
2. Paste one prompt block below (keep the skill name and file paths)
3. Let the agent finish before starting the next prompt
4. For SEO: prefer Agent mode so it can follow `nextjs-seo-optimizer`

---

## Slide 12 — Prompt: analyze homepage SEO

**Copy into Cursor:**

```
Use the nextjs-seo-optimizer skill.

Audit SEO for the Canopy homepage (`/`).

Scope:
- app/page.tsx
- app/layout.tsx (root metadata, metadataBase, fonts, head links)
- app/sitemap.ts
- app/robots.ts
- lib/site.ts
- components/hero.tsx, components/hero-carousel.tsx, components/catalogue.tsx (crawlability / Server vs Client)

Check:
1. Metadata API: title, description, Open Graph / Twitter if missing, canonical
2. Whether homepage has page-level metadata vs only root layout defaults
3. robots.ts + sitemap.ts coverage for `/`
4. JSON-LD opportunities (Organization / WebSite / ItemList for catalogue)
5. Server vs Client: is primary SEO content in Server Components?
6. Images/alt and LCP-related SEO/UX issues in the hero

Deliverable:
- Short score (0–100) with top 5 prioritized fixes
- Exact files to change
- Do NOT implement fixes unless I ask — analysis only
```

---

## Slide 13 — Prompt: analyze deals page SEO

**Copy into Cursor:**

```
Use the nextjs-seo-optimizer skill.

Audit SEO for the Canopy deals page (`/deals`).

Scope:
- app/deals/page.tsx
- components/deals.tsx, components/deal-card.tsx
- app/layout.tsx (inherited metadata)
- app/sitemap.ts, app/robots.ts
- lib/site.ts, lib/plants.ts (deal content that search engines see)

Check:
1. Page `metadata` (title, description) quality vs homepage
2. Missing Open Graph / Twitter / canonical for `/deals`
3. Is `/deals` in sitemap.xml?
4. Heading structure (h1), empty-state crawlability (“No active promos”)
5. JSON-LD: Offer / Product / AggregateOffer for active promos
6. Client-only UI (countdowns) vs static promo facts for crawlers

Deliverable:
- Short score (0–100) with top 5 prioritized fixes
- Exact files to change
- Do NOT implement fixes unless I ask — analysis only
```

---

## Slide 14 — Prompt: which homepage component is slow?

**Copy into Cursor:**

```
Use the nextjs-performance and vercel-react-best-practices skills. Optionally use nextjs-bundle-optimizer if you need a measure-first approach.

Find which homepage components are slow and why.

Scope:
- app/page.tsx
- components/hero.tsx
- components/hero-carousel.tsx
- components/catalogue.tsx
- components/plant-card.tsx
- components/site-shell.tsx / site-header.tsx
- app/layout.tsx (fonts / blocking resources)

Investigate:
1. Server waterfalls (e.g. awaiting Hero before Catalogue / missing Suspense)
2. Client bundle weight (lodash, moment, large media, barrel imports)
3. LCP: hero images/videos, next/image vs raw media, eager loading
4. Re-render / scroll listener issues on the client
5. Layout-level blocking CSS (e.g. runtime Google Fonts)

Deliverable:
- Ranked list: slowest → least impact (component + root cause + evidence from code)
- One recommended first fix (highest impact / lowest risk)
- Do NOT implement unless I ask — analysis only
```

---

## Slide 15 — Prompt: do all matching deals display?

**Copy into Cursor:**

```
Review the deals pipeline and verify every plant that should show as a deal actually appears on `/deals`.

Scope:
- lib/plants.ts — isPromoActive, getActivePromo, hasPromo, getPromoPlants, getPromoEndTime, promo date fields
- components/deals.tsx
- components/deal-card.tsx
- app/deals/page.tsx
- docs/project-structure.md (inclusive startDate–endDate rule)

Rules to enforce:
1. Promo window is inclusive calendar days: startDate <= today <= endDate (both ends included)
2. Only promos with price < plant.price qualify
3. When multiple promos are active, lowest price wins; flash wins ties
4. Catalogue promo pricing (getActivePromo / hasPromo) and deals list (getPromoPlants) must agree on who is “on deal”

Tasks:
1. Trace each plant with promos and list which should be active TODAY
2. Compare isPromoActive / getActivePromo vs getPromoPlants filtering (watch exclusive vs inclusive end dates, timezone / start-of-day vs end-of-day)
3. Confirm UI maps every getPromoPlants() entry to a DealCard with no extra filters
4. Call out mismatches, off-by-one end dates, and countdown end-time bugs

Deliverable:
- Table: plant id/name | expected on /deals? | actually returned by getPromoPlants? | pass/fail
- List of concrete bugs with file + function
- Suggested fix for any mismatch — do NOT implement unless I ask
```

---

## Slide 16 — Cheat sheet (files)

| Topic | Start here |
| ----- | ---------- |
| BugBot rules | `.cursor/BUGBOT.md` |
| Skills list | `README.md` → Agent skills |
| Home page | `app/page.tsx` |
| Deals page | `app/deals/page.tsx` |
| Promo logic | `lib/plants.ts` |
| Site URL / SEO base | `lib/site.ts` |
| Architecture | `docs/project-structure.md` |

---

## Slide 17 — Closing

**Cursor** writes and investigates.  
**Skills** encode expert playbooks.  
**BugBot** guards the PR.

Next: paste one prompt → review findings → optionally fix → open PR for BugBot.

---

## Appendix — Prompt-only (quick copy)

### A. Homepage SEO

```
Use the nextjs-seo-optimizer skill. Audit SEO for `/` using app/page.tsx, app/layout.tsx, app/sitemap.ts, app/robots.ts, lib/site.ts, and home components. Score 0–100, top 5 fixes, files to change. Analysis only — do not implement unless I ask.
```

### B. Deals SEO

```
Use the nextjs-seo-optimizer skill. Audit SEO for `/deals` using app/deals/page.tsx, components/deals.tsx, deal-card, sitemap/robots, and lib/site.ts. Score 0–100, top 5 fixes including OG/JSON-LD/sitemap. Analysis only — do not implement unless I ask.
```

### C. Homepage slow component

```
Use nextjs-performance and vercel-react-best-practices. Rank which homepage components are slow (app/page.tsx, hero, hero-carousel, catalogue, layout fonts). Cover waterfalls, bundle weight, LCP media. Ranked list + one first fix. Analysis only.
```

### D. Deals matching / display

```
Verify /deals shows every plant that should be on promo. Compare isPromoActive / getActivePromo vs getPromoPlants in lib/plants.ts against inclusive startDate–endDate. Produce plant-by-plant pass/fail table and list mismatches. Analysis only.
```
