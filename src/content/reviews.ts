/**
 * Curated review content (FR-RV-1/2/4). The aggregate rating + count come from
 * `business` (single source of truth); these are the hand-picked testimonials
 * selected from the Google corpus (Scope AST-6) plus the link out to live
 * Google reviews (FR-RV-4).
 *
 * Curated and static in Phase 1 — refreshing the featured set is a content edit
 * here, not a code change.
 */

export interface Review {
  quote: string
  author: string
  /** City the customer is in — ties testimonials to the service area. */
  city: string
  /** Single-letter avatar initial. */
  initial: string
  /** Optional service tag, for the (optional) reviews filter. */
  service?: string
}

/**
 * Live Google reviews URL (FR-RV-4). PLACEHOLDER — replace with the real
 * Google Business Profile reviews link before launch (Scope §6).
 */
export const googleReviewsUrl =
  'https://www.google.com/search?q=Miles+Mechanical+AC+%26+Heating+reviews'

export const reviews: Review[] = [
  {
    quote:
      'AC died in the middle of a July heat wave. Miles had someone out the same afternoon and we were cool by dinner. Fair price, no runaround.',
    author: 'Marcus T.',
    city: 'Garland',
    initial: 'M',
    service: 'AC repair',
  },
  {
    quote:
      'Furnace quit during that cold snap. They answered the phone at night, came first thing, and didn’t try to sell me a whole new system. Rare these days.',
    author: 'Brenda K.',
    city: 'Garland',
    initial: 'B',
    service: 'Heating',
  },
  {
    quote:
      'Our upstairs was always 5 degrees hotter. They added a mini-split in the bonus room and it’s finally usable. Clean install, great crew.',
    author: 'Priya S.',
    city: 'Sachse',
    initial: 'P',
    service: 'Mini-split',
  },
  {
    quote:
      'Charles explained exactly what was wrong and showed me the worn part. Honest pricing and he stood behind the work. We’ve found our HVAC guy.',
    author: 'David R.',
    city: 'Dallas',
    initial: 'D',
    service: 'AC repair',
  },
  {
    quote:
      'Got a full system replacement. They sized it properly instead of just selling me the biggest unit. Bills actually went down. Highly recommend.',
    author: 'Angela M.',
    city: 'Garland',
    initial: 'A',
    service: 'Install',
  },
  {
    quote:
      'Signed up for the maintenance plan after they caught a failing capacitor before it left us sweating. Worth every penny for the peace of mind.',
    author: 'Tom W.',
    city: 'Sachse',
    initial: 'T',
    service: 'Maintenance',
  },
  {
    quote:
      'Same-day service on a 104° afternoon when three other companies couldn’t even pick up the phone. Professional, fast, and fairly priced.',
    author: 'Lisa H.',
    city: 'Dallas',
    initial: 'L',
    service: 'Emergency',
  },
  {
    quote:
      'Twenty years in business shows. They’ve maintained our system for years and it just keeps running. No drama, no upsells, just good work.',
    author: 'Robert G.',
    city: 'Garland',
    initial: 'R',
    service: 'Maintenance',
  },
]

/** A small set for previews (home page). */
export const featuredReviews = reviews.slice(0, 3)
