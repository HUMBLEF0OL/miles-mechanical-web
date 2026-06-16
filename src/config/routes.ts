export const routes = {
  home: '/',

  // ── Marketing (Phase 1) ──────────────────────────────────────────────────
  // Per-service (/services/[slug]) and per-city (/areas/[city]) pages are
  // content-driven (src/content) and expanded into the sitemap/llms.txt from
  // their slug lists, so they need no individual route keys here (FR-SA-3).
  services: '/services',
  about: '/about',
  reviews: '/reviews',
  contact: '/contact',

  // ── Auth / app (not built in Phase 1; kept for the SEO noindex contract) ──
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
} as const

export type RouteKey = keyof typeof routes

/**
 * SEO descriptors keyed by the SAME route keys as `routes`. An absent key ⇒ the
 * route is NOT indexable: it is excluded from `sitemap.ts` and `llms.txt`, and
 * pages for it MUST be marked `noindex` (defense in depth).
 *
 * Only public, indexable routes belong here. Private/auth routes (`login`,
 * `signup`, `forgotPassword`, `dashboard`, `profile`, `settings`) are omitted on
 * purpose — the harness check asserts none of them ever appear here.
 *
 * When you add a public page, register it here so the sitemap and llms.txt pick
 * it up (see the `seo` skill).
 */
export const seoRoutes = {
  home: { indexable: true, changeFrequency: 'monthly', priority: 1, lastModified: '2026-06-16' },
  services: { indexable: true, changeFrequency: 'monthly', priority: 0.9, lastModified: '2026-06-16' },
  reviews: { indexable: true, changeFrequency: 'weekly', priority: 0.8, lastModified: '2026-06-16' },
  about: { indexable: true, changeFrequency: 'yearly', priority: 0.6, lastModified: '2026-06-16' },
  contact: { indexable: true, changeFrequency: 'yearly', priority: 0.8, lastModified: '2026-06-16' },
} as const satisfies Partial<
  Record<
    RouteKey,
    {
      indexable: boolean
      changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
      priority: number
      /** Stable ISO date (YYYY-MM-DD). Bump when the page's content changes —
       *  do NOT use `new Date()`, which churns the sitemap on every build. */
      lastModified: string
    }
  >
>

export type SeoRouteKey = keyof typeof seoRoutes
