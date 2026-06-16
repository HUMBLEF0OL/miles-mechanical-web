---
name: design-tokens
description: Design-token and theming conventions for the Starter — semantic CSS variables in theme.css, Tailwind v4 @theme registration in globals.css, dark mode, and the Figma token-sync flow. Use when extracting repeated design values, adding/editing tokens, theming, or syncing tokens from Figma.
paths:
  - src/app/theme.css
  - src/app/globals.css
---

# Design Tokens

Tokens are **config-driven theming**, not per-component hand-values. Two files own
the whole palette; everything else consumes Tailwind utilities. This is Tailwind
v4 — there is **no `tailwind.config.*`**; token registration lives in CSS.

## The two source files

- **`src/app/theme.css`** — semantic color _values_ as CSS variables, split into
  a `:root` (light) block and a `.dark` block. This is the single place to change
  the palette. Names are intent-based (`--th-heading`, `--th-muted`, `--th-page`,
  `--th-line`), never raw hues. Each value carries a comment naming the source hue.
- **`src/app/globals.css`** — the `@theme { … }` block registers tokens as
  Tailwind utilities. Semantic colors map the `--th-*` variables to
  `--color-*` (e.g. `--color-heading: var(--th-heading)`), which generates
  `text-heading`, `bg-page`, `border-line`, etc. Brand scale, typography, spacing,
  radius, and animations also live here.

## How a token flows

```
theme.css   --th-heading: #111827   (+ [data-theme='dark'] override)
   │
globals.css @theme  --color-heading: var(--th-heading)
   │
JSX         className="text-heading"
```

Light/dark switching is automatic: `.dark` overrides `--th-*` and the same
`text-heading` utility resolves to the dark value. Dark mode is class-based via
`@custom-variant dark` (next-themes).

## Rules

- **Never hardcode raw color/spacing values in components.** Use the semantic
  utility (`text-muted`, `bg-subtle`, `border-line`). If the value repeats and has
  no token, add one — don't sprinkle arbitrary values.
- **Add a semantic token, not a one-off.** New color → add the value to _both_
  `:root` and `.dark` in `theme.css`, then map it under `@theme` in `globals.css`.
  Name by role (`--th-accent`), not by hue (`--th-blue`).
- **Brand scale, typography, spacing, radius, animations** are defined directly in
  the `@theme` block (`--color-brand-*`, `--font-sans`, `--spacing-18`,
  `--radius-4xl`, `--animate-fade-in`). Extend there.
- Prefer the **nearest existing token** before inventing one. Arbitrary Tailwind
  values (`text-[#abc]`) are a smell — they bypass theming and dark mode.

## Adding a token

1. Add the value to `:root` **and** `.dark` in `src/app/theme.css` (with a comment).
2. Map it under `@theme` in `src/app/globals.css`
   (`--color-<name>: var(--th-<name>)`).
3. Consume it as the generated utility (`text-<name>`, `bg-<name>`, …).

## Figma token sync

The `figma` agent runs token sync (`/sync-tokens <figma-url>`, or `--token-sync`).
It is additive: it reads existing `theme.css`, preserves manual tokens, applies
adds/updates only (never auto-removes), and updates the `@theme` mappings in
`globals.css` for new semantic tokens. It logs a summary to
`.claude/agent-memory/figma/last-token-sync.md`. Output files are `theme.css` and
`globals.css` — **never** a Tailwind config file. Requires `FIGMA_API_KEY` in
`.env.local` (gitignored; documented in `.env.example`).

## Related

- Component patterns that consume tokens → the `components` skill.
- Per-page metadata/theming-color → the `seo` skill.
