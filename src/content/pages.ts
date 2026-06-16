/**
 * Page-level copy + per-page SEO strings for the non-templated marketing pages
 * (home, services overview, about, reviews, contact). Service- and city-page
 * SEO lives alongside their content in services.ts / areas.ts.
 *
 * Pages pass these literals straight to `buildMetadata` — the marketing copy is
 * English and content-driven (matching the rest of the design system), so it
 * does not flow through the next-intl message catalogs.
 */

export interface PageSeo {
  title: string
  description: string
}

export interface PageHero {
  eyebrow?: string
  headline: string
  subcopy: string
}

export interface PageContent {
  seo: PageSeo
  hero: PageHero
}

export const pages = {
  home: {
    seo: {
      title: 'Honest AC & Heating in Dallas, Garland & Sachse',
      description:
        'Family-owned HVAC for the Dallas metro for 20+ years. Fair pricing, licensed work, 24/7 emergency service, and a 4.9★ Google rating. Call or request service.',
    },
  } satisfies { seo: PageSeo },

  services: {
    seo: {
      title: 'HVAC Services — AC, Heating, Install & More',
      description:
        'AC repair, installation, heating and furnace service, seasonal maintenance, mini-splits, and 24/7 emergency HVAC across Dallas, Garland and Sachse.',
    },
    hero: {
      eyebrow: 'What We Do',
      headline: 'HVAC done right, top to bottom',
      subcopy:
        'Six core services, one standard: honest pricing, licensed work, and a fix sized to your home — not a sales target. Pick a service to see what’s included.',
    },
  } satisfies PageContent,

  about: {
    seo: {
      title: 'About Miles Mechanical — 20+ Years, Family-Owned',
      description:
        'Meet the family-owned HVAC team Texans have trusted for 20+ years. Honest pricing, licensed work, and a real warranty across the Dallas metro.',
    },
    hero: {
      eyebrow: 'Texans Serving Texans',
      headline: 'Twenty years of doing it right',
      subcopy:
        'No call center, no commission scripts. Just a family-owned crew that fixes what’s broken, charges fairly, and treats your home like a neighbour’s.',
    },
  } satisfies PageContent,

  reviews: {
    seo: {
      title: 'Reviews — 4.9★ from 56 Google Reviews',
      description:
        'Read why Dallas-area homeowners rate Miles Mechanical 4.9★ across 56 Google reviews. Honest pricing, fast service, and work backed by a real warranty.',
    },
    hero: {
      eyebrow: 'The Reputation Is The Product',
      headline: 'Rated 4.9★ by your neighbours',
      subcopy:
        'We’d rather earn the next twenty years than the next twenty minutes. Here’s what Dallas, Garland and Sachse homeowners say about the work.',
    },
  } satisfies PageContent,

  contact: {
    seo: {
      title: 'Contact & Request Service — Miles Mechanical',
      description:
        'Request HVAC service or a free quote across Dallas, Garland and Sachse. Click to call, or send a request with your preferred time — a real person calls you back.',
    },
    hero: {
      eyebrow: 'Let’s Get You Comfortable',
      headline: 'Request service or a free quote',
      subcopy:
        'Call or text for the fastest response, or send the form below. Your request goes straight to the team — no call center, no bots.',
    },
  } satisfies PageContent,
} as const

/**
 * Shared "what happens next" reassurance copy (FR-LC-3) — used on the contact
 * page and the lead form.
 */
export const whatHappensNext = {
  title: 'What happens next',
  steps: [
    'Your request goes straight to the team — no call center.',
    'A real person calls or texts you back, usually within the hour during business hours.',
    'We confirm the details and book the soonest slot that works for you.',
  ],
}
