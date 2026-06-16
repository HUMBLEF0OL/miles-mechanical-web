---
name: seo
description: AI SEO + GEO for the Starter — config-driven metadata, canonical/hreflang, JSON-LD, robots/sitemap/llms.txt, and the AI-crawler policy. Use when adding pages, registering public routes, or touching anything under src/app, src/lib/seo, or the SEO config.
paths:
  - src/app/**
  - src/lib/seo/**
  - src/config/site.ts
  - src/config/routes.ts
---

# AI SEO + GEO

SEO is **config-driven infrastructure**, not per-page hand-work. One registry
feeds metadata, sitemap, llms.txt, and robots so they never drift. The harness
(`npm run check:harness`) enforces completeness.

## The single source of truth

- `src/config/site.ts` — locale-neutral facts (`name`, `url`, `locales`,
  `ogLocaleMap`, `trailingSlash`, `organization`, `verification`, `ai`). Its
  `locales`/`defaultLocale` MUST match `src/i18n/routing.ts` (harness-checked).
- `src/config/routes.ts` — `routes` (all paths) **and** `seoRoutes` (public +
  indexable subset, keyed by the same keys). Absent key ⇒ not indexable.
- `src/lib/seo/` — `buildMetadata`, JSON-LD builders + `<JsonLd>`, and the
  `publicRoutes()` / `privatePaths()` registry helpers.

## Every page gets metadata

Call `buildMetadata` inside `generateMetadata`. Title/description are localized
in next-intl messages; config holds only locale-neutral facts.

```tsx
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from '@/lib/intl'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/config'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'seo.home' })
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: routes.home,
    locale,
  })
}
```

`buildMetadata` emits canonical (self-referencing, trailing-slash-normalized),
hreflang alternates incl. `x-default`, OG locale/alternateLocale, a Twitter card,
and — when you pass `noindex: true` — `robots: { index: false, follow: false }`.

## Adding a public page

1. Add the route to `routes` in `src/config/routes.ts`.
2. Add a matching entry to `seoRoutes` with `changeFrequency`, `priority`, and a
   stable `lastModified` (a real ISO date — never `new Date()`).
3. Call `buildMetadata` in the page's `generateMetadata`.
4. Add localized title/description under a `seo.*` namespace in every messages file.

Sitemap, llms.txt, and robots pick it up automatically.

## Private / auth pages

Never add them to `seoRoutes` (omission excludes them from sitemap + llms.txt and
robots disallows them). Also pass `noindex: true` to `buildMetadata` on the page —
defense in depth. The harness fails if a private key appears in `seoRoutes`.

## JSON-LD per content type

`<JsonLd>` renders sanitized `application/ld+json`. Pick the builder:

- `organizationJsonLd()` + `websiteJsonLd(locale)` — sitewide, already in `[locale]/layout.tsx`.
- `webPageJsonLd({ title, description, path, locale })` — standard page.
- `articleJsonLd(...)` — blog/news; `breadcrumbJsonLd(items)` — trails.
- `faqJsonLd(qa[])` — strongest GEO signal; answers surface directly to AI engines.

## AI-crawler policy

`src/app/robots.ts` gates GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot/…
on `siteConfig.ai.allowCrawlers`. Set it `false` to disallow AI crawlers sitewide.

## GEO content guidance

Write **answer-first** headings (lead with the answer, then explain), use semantic
HTML, and add FAQ schema where natural — these are what generative engines extract.

## Production URL

`metadataBase` derives from `NEXT_PUBLIC_APP_URL` (defaults to localhost).
Production MUST set the real domain or every canonical/OG URL is wrong.

## Related

- Core Web Vitals are a direct ranking factor but out of scope here — see the
  `nextjs-perf` skill.
- General routing/layout patterns → the `routing` skill.
