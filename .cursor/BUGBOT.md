# Bugbot — Next.js 16 / React 19

Project-specific review rules for this App Router storefront (`next@16`, `react@19`, Tailwind 4). Prefer real bugs and regressions over style nits.

## Stack context

- App Router only (`app/`). Prefer Server Components by default; `"use client"` only for interactivity.
- React 19: `ref` is a normal prop (no `forwardRef`); prefer `use()` over `useContext()`.
- Next.js 16 defaults to Turbopack. Do not suggest `experimental.optimizePackageImports` for Turbopack-only issues.
- Images: remote hosts must match `images.remotePatterns` in `next.config.ts` (currently `images.unsplash.com`).
- This repo may contain intentional anti-patterns for tooling demos — still report them as bugs when they ship in a PR.

## Flag as bugs

### App Router / RSC boundaries

- Client components importing server-only modules (`fs`, `next/headers`, DB clients, secrets).
- Passing oversized or unnecessary props across the RSC → client boundary (full lists, deep clones, derived arrays the client could compute or fetch).
- Async work that blocks an entire page/layout with no `Suspense` when only a subtree needs the data.
- Missing `"use server"` auth/authorization checks inside Server Actions (treat them like public endpoints).
- Hydration mismatches from `Date.now()`, `Math.random()`, or `window`/`localStorage` during render.

### TypeScript / correctness

- Type errors, unsafe casts (`as any`), or wrong prop/state types that would fail `tsc` (even if `typescript.ignoreBuildErrors` is enabled in config).
- Stringly-typed IDs or quantities where numbers/unions are required (e.g. cart quantity as string).
- Broken event handler signatures, missing null checks before property access, off-by-one in timers/countdowns.

### Performance (blocking)

- Heavy client libraries (`lodash`, `moment`, large icon barrels) imported into client components when a lighter alternative or direct import exists.
- Raw `<img>` / unoptimized remote media for LCP-critical hero content when `next/image` (or equivalent) should be used.
- Scroll/resize listeners without `{ passive: true }` that call `setState` on every event.
- Components defined inside other components (remounts / lost state / restarted effects).
- Layout thrashing: reading layout (`offsetWidth`, `getBoundingClientRect`) interleaved with style writes in the same turn.

### Security

- `dangerouslySetInnerHTML` with unsanitized input.
- Secrets or tokens in client bundles / `NEXT_PUBLIC_*` misuse.
- Open redirects, unchecked `redirect()` targets, or trusting query/body input without validation.
- New dependencies with clearly unsafe patterns in changed code.

### Accessibility (blocking only)

- Icon-only controls missing accessible names.
- Interactive elements that are not keyboard reachable or lack focus styles when introducing new controls.
- Images missing meaningful `alt` (or incorrect empty `alt` for informative images).

## Do not flag

- Tailwind class ordering, quote style, or import sorting.
- Suggesting pages router APIs (`getServerSideProps`, `_app`) in this App Router project.
- Suggesting `forwardRef` or `useContext` as “fixes” on React 19 code that already uses `ref` props / `use()`.
- Demanding tests for purely presentational copy/CSS tweaks with no logic change.
- Requiring Autofix or drive-by refactors outside the PR diff.

## Review focus for stage → main

When reviewing a PR into `main` (especially from `stage`), prioritize:

1. Regressions that break build, types, or runtime on `/` and `/deals`
2. Client-bundle and LCP regressions in hero/catalogue/cart paths
3. RSC serialization and Suspense waterfalls
4. Security and secret handling

Be concise: one finding per distinct bug, with file/line and a concrete fix suggestion.
