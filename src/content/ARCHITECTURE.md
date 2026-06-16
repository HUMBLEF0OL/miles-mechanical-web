# content — Architecture

> Local proximity doc. Module-specific only; shared boundaries and rules are not
> restated here — follow the links.

## Purpose

The content-driven marketing data layer. Holds all page copy, service/city
content, curated reviews, and credentials as typed data so pages render from
data, not hardcoded JSX. Adding a service or city is a content edit here — no
new route file, no rebuild (Scope FR-SA-3).

## Key files & structure

- `services.ts` — the six Phase 1 services (FR-SA-4): card/hero copy, what's
  included, 1-2-3 process, FAQs, per-page SEO. `getService` / `serviceSlugs`.
- `areas.ts` — localized city template content (FR-SA-1/2): unique local copy,
  neighbourhoods, per-page SEO. `getArea` / `areaSlugs`.
- `reviews.ts` — curated testimonials + Google reviews link (FR-RV-2/4).
- `company.ts` — owner story, values, timeline, credential badges (FR-CR-3,
  FR-RV-3).
- `pages.ts` — hero + per-page SEO for the non-templated pages + shared
  "what happens next" copy (FR-LC-3).
- `index.ts` — barrel; pages import from `@/content`.

## Local notes

- Pure data + typed lookups. No React, no side effects, no env reads.
- Several facts are PLACEHOLDERS pending owner confirmation (phone, hours,
  licence #s, owner photo, Google reviews URL) — see `docs/scope` §6.
- Slugs MUST match the route inventory in `docs/scope/Miles-Mechanical-Phase-1-Scope.md` §3.2.

## Related (canonical)

- Aggregate rating / phone / hours single source of truth → `src/config/business.ts`
- SEO metadata + JSON-LD consumers → `src/lib/seo`, the `seo` skill
