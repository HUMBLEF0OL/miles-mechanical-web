// Miles Mechanical business facts used across the marketing site.
// NOTE: phoneDisplay / phoneTel / hoursDisplay are PLACEHOLDERS pending owner
// reconciliation (BRD open item) — do not treat as final until confirmed.

export const business = {
  name: 'Miles Mechanical',
  tagline: 'AC & Heating',
  phoneDisplay: '(214) 555-0148',
  phoneTel: '+12145550148',
  // PLACEHOLDER email pending owner confirmation (Scope §6).
  email: 'service@milesmechanicalac.com',
  rating: 4.9,
  reviewCount: 56,
  areas: ['Dallas', 'Garland', 'Sachse'],
  hoursDisplay: 'Mon–Sat 7am–7pm',
  emergency: '24/7',
  yearsExperience: 20,
  // Service-area business — no public storefront address (Scope §7).
  region: 'Dallas–Fort Worth metro, TX',
} as const
