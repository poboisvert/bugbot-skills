# Canopy

Next.js App Router storefront used to exercise Cursor Bugbot and agent skills. Canopy is a plant catalogue with deals and a cart; parts of the app intentionally include performance, composition, and type anti-patterns for review tooling to catch.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Development server         |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                     |

Routes: `/` (catalogue + hero), `/deals` (active promos).

## Project structure

| Path                | Role                                         |
| ------------------- | -------------------------------------------- |
| `app/`              | App Router pages, layout, sitemap, robots    |
| `components/`       | UI — catalogue, hero, deals, cart            |
| `lib/`              | Site URL helpers and plant/promo domain data |
| `docs/`             | Architecture notes                           |
| `.agents/skills/`   | Installed agent skills                       |
| `.cursor/BUGBOT.md` | Project-specific Bugbot review rules         |

Full walkthrough: [`docs/project-structure.md`](docs/project-structure.md).

## Agent skills

Skills live in [`.agents/skills/`](.agents/skills/) and are locked in [`skills-lock.json`](skills-lock.json).

| Skill                           | Source                                                                  | Purpose                                                     |
| ------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| `deploy-to-vercel`              | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Preview and production deploys to Vercel                    |
| `nextjs-bundle-optimizer`       | [pproenca/dot-skills](https://github.com/pproenca/dot-skills)           | Iterative Next.js 16 bundle/build-size optimization loop    |
| `nextjs-performance`            | [FerroxLabs/wayland](https://github.com/FerroxLabs/wayland)             | Next.js performance baselines, caching, and bundle guidance |
| `vercel-composition-patterns`   | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Compound components and React composition patterns          |
| `vercel-react-best-practices`   | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React/Next.js performance rules from Vercel Engineering     |
| `vercel-react-view-transitions` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | View Transition API patterns for React/Next.js              |
| `web-design-guidelines`         | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | UI/UX and accessibility review                              |
| `writing-guidelines`            | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Docs and prose voice/tone review                            |

Add a skill:

```bash
npx skills add <owner/repo> --skill <skill-name> -y
```

For skills nested deep in a monorepo (e.g. `nextjs-performance` in Wayland, or experimental paths like `nextjs-bundle-optimizer`), the CLI may not discover them. Copy the skill directory into `.agents/skills/<name>/` and update `skills-lock.json`.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- TypeScript
