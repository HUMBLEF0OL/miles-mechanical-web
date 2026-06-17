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
    'Miles Mechanical — family-owned AC & heating repair, installation, and fast after-hours emergency HVAC service across Dallas, Garland, Sachse and the northeast Dallas metro. Honest pricing, 20+ years, rated 4.9★.',
  url: env.NEXT_PUBLIC_APP_URL,

  // i18n — mirrors src/i18n/routing.ts (harness-enforced).
  defaultLocale: 'en',
  locales: ['en', 'fr'],

  // Social cards.
  ogImage: '/opengraph-image', // default social card (next/og route)
  ogLocaleMap: { en: 'en_US', fr: 'fr_FR' }, // OG locale / alternateLocale
  // X/Twitter @handle for the `twitter:site` card tag. Empty = tag omitted
  // (better than a bogus handle). Set when the business creates a profile.
  twitter: '',

  // Canonical URL normalization policy.
  trailingSlash: false,

  // → Organization JSON-LD.
  organization: {
    name: env.NEXT_PUBLIC_APP_NAME,
    // Brand mark served by the app's `icon.svg` metadata route (no `public/`
    // dir ships a logo.png). Swap for a raster `/logo.png` once a public asset
    // exists — Google rich results prefer a square raster logo.
    logo: '/icon.svg',
    // Social/citation profile URLs — strengthens entity disambiguation
    // (NFR-4). Verified live business profiles (BRD Appendix A).
    sameAs: [
      'https://www.facebook.com/clientcomfortconnections/',
      'https://www.yelp.com/biz/miles-mechanical-ac-and-heating-dallas-2',
      'https://reviews.birdeye.com/miles-mechanical-a-c-and-heating-llc-165407154968661',
      'https://www.mapquest.com/us/texas/miles-mechanical-ac-heating-378220466',
    ] as string[],
  },

  // Search Console / Bing verification — paste the token from the provider's
  // "HTML tag" method. Empty = no meta tag emitted (verify via DNS instead).
  verification: {
    google: '',
    other: {} as Record<string, string>, // e.g. { 'msvalidate.01': '...' }
  },

  // AI crawler policy (GPTBot/ClaudeBot/PerplexityBot/…) — see robots.ts.
  ai: { allowCrawlers: true },
} as const
