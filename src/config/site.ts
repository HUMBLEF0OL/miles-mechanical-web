import { env } from './env'

/**
 * Locale-neutral SEO facts — the single source of truth for the SEO module.
 *
 * Locale-specific copy (page titles/descriptions) lives in next-intl messages,
 * NOT here. This object holds only facts that don't change per locale.
 *
 * `locales`/`defaultLocale` MUST stay consistent with `src/i18n/routing.ts`
 * (the harness check `npm run check:harness` asserts this). `url` derives from
 * `NEXT_PUBLIC_APP_URL`, which defaults to http://localhost:3000 — production
 * deployments MUST set the real domain or every canonical/OG URL is wrong.
 */
export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description:
    'Miles Mechanical — family-owned AC & heating repair, installation, and 24/7 emergency HVAC service across Dallas, Garland, and Sachse. Honest pricing, 20+ years, rated 4.9★.',
  url: env.NEXT_PUBLIC_APP_URL,

  // i18n — mirrors src/i18n/routing.ts (harness-enforced).
  defaultLocale: 'en',
  locales: ['en', 'fr'],

  // Social cards.
  ogImage: '/opengraph-image', // default social card (next/og route)
  ogLocaleMap: { en: 'en_US', fr: 'fr_FR' }, // OG locale / alternateLocale
  twitter: '@handle',

  // Canonical URL normalization policy.
  trailingSlash: false,

  // → Organization JSON-LD.
  organization: {
    name: env.NEXT_PUBLIC_APP_NAME,
    logo: '/logo.png',
    sameAs: [] as string[], // social profile URLs
  },

  // Search Console / Bing verification — optional, empty by default.
  verification: {
    google: '',
    other: {} as Record<string, string>, // e.g. { 'msvalidate.01': '...' }
  },

  // AI crawler policy (GPTBot/ClaudeBot/PerplexityBot/…) — see robots.ts.
  ai: { allowCrawlers: true },
} as const
