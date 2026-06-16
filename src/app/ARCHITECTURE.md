# app — Architecture

> Local proximity doc. Module-specific only; shared boundaries, layering, and
> rules are not restated here — follow the links.

## Purpose

Next.js App Router routes, layouts, pages, route groups, and API route handlers.

## Key files & structure

- `layout.tsx`, `page.tsx`, `not-found.tsx`, `globals.css`
- `[locale]/` — locale segment (next-intl)
- `(auth)/`, `(dashboard)/` — route groups
- `api/` — route handlers (e.g. `api/health/route.ts`)

## Local notes

- Route folders are kebab-case; `page.tsx` / `layout.tsx` use default exports.

## Related (canonical)

- Server/Client rules → `CONSTRAINTS.md`
- Component hierarchy & service flow → `docs/ARCHITECTURE.md`
- Routing patterns → `routing` skill
