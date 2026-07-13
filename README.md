# bugbot-skills

Next.js App Router demo used to exercise Cursor Bugbot and agent skills. The storefront is a plant catalogue with deals and a cart; parts of the app intentionally include performance and composition anti-patterns for review tooling to catch.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Agent skills

Project skills live in [`.agents/skills/`](.agents/skills/) and are tracked in [`skills-lock.json`](skills-lock.json).

| Skill | Source | Purpose |
| --- | --- | --- |
| `deploy-to-vercel` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Preview/production deploys to Vercel |
| `nextjs-performance` | [FerroxLabs/wayland](https://github.com/FerroxLabs/wayland) | Next.js performance baselines, caching, and bundle guidance |
| `vercel-composition-patterns` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Compound components and React composition patterns |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React/Next.js performance rules from Vercel Engineering |
| `vercel-react-view-transitions` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | View Transition API patterns for React/Next.js |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | UI/UX and accessibility review |
| `writing-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Docs and prose voice/tone review |

To add another skill:

```bash
npx skills add <owner/repo> --skill <skill-name> -y
```

For skills nested deep in a monorepo (like `nextjs-performance` in Wayland), the CLI may not discover them; copy the full skill directory into `.agents/skills/<name>/` and update `skills-lock.json`.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
