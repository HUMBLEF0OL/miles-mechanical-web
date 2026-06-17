// Miles Mechanical business facts — the single source of truth used across the
// marketing site (NAP, hours, ratings, service area). Edit here and it
// propagates to the header, footer, CTAs, contact page, and JSON-LD.
//
// Facts below are corroborated from public listings (Yelp, MapQuest, Facebook,
// Birdeye, directory listings) per BRD v0.2. Items still pending owner sign-off
// are flagged inline (see BRD §14 / Scope §6): the published email address and
// whether genuine staffed 24/7 emergency service is offered.

/** A block of weekly opening hours — drives both the footer copy and the
 *  schema.org OpeningHoursSpecification (single source, no drift). */
export interface BusinessHours {
  days: readonly string[]
  /** 24h "HH:MM". */
  opens: string
  /** 24h "HH:MM". */
  closes: string
}

export const business = {
  name: 'Miles Mechanical',
  legalName: 'Miles Mechanical A/C And Heating LLC',
  tagline: 'AC & Heating',

  // ─── Contact (NAP) ─────────────────────────────────────────────────────────
  // (214) 584-4164 is corroborated across Yelp, MapQuest, Facebook, Birdeye and
  // directory listings — treated as primary (BRD §3). Google's (214) 429-7734 is
  // the lone outlier (secondary/tracking line, to be reconciled with owner).
  phoneDisplay: '(214) 584-4164',
  phoneTel: '+12145844164',
  // Current business email (Facebook listing). Pending owner decision on a
  // branded address (e.g. info@milesmechanicalac.com) before launch (Scope §6).
  email: 'milesmechanical85@yahoo.com',

  // ─── Reputation ────────────────────────────────────────────────────────────
  // Primary aggregate used for schema.org AggregateRating (single source keeps
  // structured data defensible). Google: 4.9★ / 56.
  rating: 4.9,
  reviewCount: 56,
  ratingSource: 'Google',
  // Secondary corroborating source — surfaced in marketing copy only, NOT mixed
  // into the schema AggregateRating. Birdeye: 5.0★ / 67 (active, growing).
  secondaryRating: { source: 'Birdeye', rating: 5.0, reviewCount: 67 },
  // Combined headline figure ("120+ five-star reviews"). Google 56 + Birdeye 67.
  reviewCountTotal: 120,

  // ─── Service area ──────────────────────────────────────────────────────────
  // Cities with a dedicated landing page built in Phase 1.
  areas: ['Dallas', 'Garland', 'Sachse'],
  // Full confirmed service area (BRD §2.1, from the business's own Facebook
  // listing). The remaining cities are template-ready content additions.
  serviceArea: [
    'Dallas',
    'Garland',
    'Sachse',
    'Plano',
    'Richardson',
    'Wylie',
    'Rowlett',
    'Murphy',
    'Carrollton',
    'Addison',
    'University Park',
  ],

  // ─── Hours ─────────────────────────────────────────────────────────────────
  // Listings converge on Mon–Fri 9–5, Sat 10–3, Sun closed (Yelp/MapQuest/
  // directories). Confirm with owner before launch (Scope §6 item 2).
  hours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    { days: ['Saturday'], opens: '10:00', closes: '15:00' },
  ] as readonly BusinessHours[],
  hoursDisplay: 'Mon–Fri 9am–5pm · Sat 10am–3pm',

  // After-hours posture. Short token composes as "{emergency} emergency line".
  // Reviews evidence after-hours call/text responsiveness — NOT confirmed as
  // staffed 24/7, so we say "after-hours" rather than overclaiming (BRD §14 #2).
  emergency: 'After-hours',
  emergencyNote: 'Call or text after hours — we respond fast.',

  yearsExperience: 20,
  // Equipment brand installed — a recognizable trust/SEO angle (BRD §2.1).
  equipmentBrand: 'Carrier',
  // Service-area business — no public storefront address (Scope §7).
  region: 'Dallas–Fort Worth metro, TX',
} as const
