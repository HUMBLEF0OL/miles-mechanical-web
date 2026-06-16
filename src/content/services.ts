import type { IconName } from '@/components/ui/Icon'

/**
 * Service content — the single source of truth for the six Phase 1 services
 * (Scope §3.2 / FR-SA-4). Every service surface is driven from this array:
 *   • the home services grid (FR-CR-2)
 *   • the /services overview list (FR-CR-2)
 *   • the per-service detail template /services/[slug] (FR-SA-3/4)
 *   • the "services we run in {city}" lists on the area pages
 *
 * Adding a service is a content entry here — no new route file, no rebuild
 * (FR-SA-3). `slug` MUST match the route inventory in
 * docs/scope/Miles-Mechanical-Phase-1-Scope.md §3.2.
 */

export type ServiceAccent = 'cool' | 'heat'

export interface ServiceProcessStep {
  /** 1-based step number rendered in the 1-2-3 strip. */
  step: number
  title: string
  body: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceContent {
  /** URL slug under /services/. Matches the Phase 1 route inventory. */
  slug: string
  /** Display title, Title Case, e.g. "AC Repair". */
  title: string
  /** Short label for compact nav / breadcrumb contexts. Defaults to `title`. */
  shortLabel?: string
  /** Icon key from the §06 line-icon set (see ui/Icon). */
  icon: IconName
  /** Icon-tile tint. `cool` = blue (AC), `heat` = ember (heating). */
  accent: ServiceAccent
  /** When true the card/hero use the reserved alarm-red emergency treatment. */
  emergency?: boolean
  /** One-line description used on the home grid + overview list cards. */
  cardDescription: string
  /** Uppercase eyebrow shown above the detail-page hero headline. */
  heroEyebrow: string
  /** Detail-page H1. */
  heroHeadline: string
  /** Detail-page hero supporting paragraph. */
  heroSubcopy: string
  /** "What's included" checklist on the detail page. */
  included: string[]
  /** The 1-2-3 "how it works" strip on the detail page. */
  process: ServiceProcessStep[]
  /** FAQ accordion entries — also emitted as FAQPage JSON-LD (GEO signal). */
  faqs: ServiceFaq[]
  /** Per-page <title> (bare — site name appended by the metadata template). */
  seoTitle: string
  /** Per-page meta description. */
  seoDescription: string
}

export const services: ServiceContent[] = [
  {
    slug: 'ac-repair',
    title: 'AC Repair',
    icon: 'cooling',
    accent: 'cool',
    cardDescription:
      'Warm air, strange noises, or a system that won’t start — we diagnose the real problem and fix it right.',
    heroEyebrow: 'Air Conditioning',
    heroHeadline: 'AC repair that names the real problem',
    heroSubcopy:
      'When the cooling quits in a Texas summer, you want a straight answer fast. We find the actual fault, show you the part and the price, and get you cool again — no upsell.',
    included: [
      'Full system diagnostic — compressor, capacitor, coils, refrigerant charge',
      'Up-front, written price before any work begins',
      'Common parts stocked on the truck for same-visit fixes',
      'Honest repair-vs-replace advice when a unit is near end of life',
    ],
    process: [
      { step: 1, title: 'Call or request', body: 'Tell us the symptoms. We book the soonest slot — often same day.' },
      { step: 2, title: 'Diagnose on site', body: 'We test the system, find the fault, and quote the fix before touching a tool.' },
      { step: 3, title: 'Fix and verify', body: 'We make the repair and confirm the system is cooling to spec before we leave.' },
    ],
    faqs: [
      {
        question: 'How fast can you come out for a broken AC?',
        answer:
          'During business hours we usually reach Dallas-area homes the same day. For no-cooling emergencies we answer 24/7 — call or text and we’ll get to you fast.',
      },
      {
        question: 'Will you try to sell me a whole new system?',
        answer:
          'No. We repair what can be repaired and tell you plainly when a unit is genuinely worn out. The choice is always yours, with the numbers in front of you.',
      },
      {
        question: 'Do you charge a diagnostic fee?',
        answer:
          'We give you the diagnostic and repair price up front before any work starts, so there are no surprises on the invoice.',
      },
    ],
    seoTitle: 'AC Repair in Dallas, Garland & Sachse',
    seoDescription:
      'Fast, honest AC repair across the Dallas metro. Up-front pricing, licensed techs, and same-day service for no-cooling calls. Call Miles Mechanical.',
  },
  {
    slug: 'installation-replacement',
    title: 'Installation & Replacement',
    shortLabel: 'Install & Replace',
    icon: 'airflow',
    accent: 'cool',
    cardDescription:
      'Right-sized systems installed to spec — no overselling tonnage you don’t need.',
    heroEyebrow: 'New Systems',
    heroHeadline: 'A new system, sized for your home',
    heroSubcopy:
      'Replacing an HVAC system is a big decision. We size it to your actual home — not a sales target — and install it clean, so it runs efficiently for years.',
    included: [
      'Load calculation so the system is sized for your home, not oversold',
      'Clear options across efficiency tiers and budgets',
      'Professional install — proper line sets, drainage, and airflow',
      'Old equipment hauled away and the work backed by warranty',
    ],
    process: [
      { step: 1, title: 'Free in-home quote', body: 'We assess your home, ductwork, and needs, then lay out honest options.' },
      { step: 2, title: 'Pick the right fit', body: 'No pressure — we recommend the system that fits your home and budget.' },
      { step: 3, title: 'Install clean', body: 'We install to spec, test the full system, and walk you through it.' },
    ],
    faqs: [
      {
        question: 'How do I know what size system I need?',
        answer:
          'We run a load calculation based on your home’s square footage, insulation, and layout. We never just match the old unit or push extra tonnage to pad the ticket.',
      },
      {
        question: 'Do you offer financing or home-warranty options?',
        answer:
          'We work with American Home Shield (AHS) and can walk you through warranty-covered replacements. Ask about current options when we quote.',
      },
      {
        question: 'What warranty comes with a new install?',
        answer:
          'New installs are backed by manufacturer parts coverage plus our labour warranty. We confirm the exact terms in writing before the job starts.',
      },
    ],
    seoTitle: 'HVAC Installation & Replacement — Dallas Metro',
    seoDescription:
      'Right-sized AC and heating system installation across Dallas, Garland and Sachse. Honest load calcs, clean installs, and warranty-backed work.',
  },
  {
    slug: 'heating-furnace',
    title: 'Heating & Furnace',
    icon: 'heating',
    accent: 'heat',
    cardDescription:
      'Furnace and heat-pump repair for the cold snaps — safe, warm, and quick.',
    heroEyebrow: 'Heating',
    heroHeadline: 'Heat you can count on when it counts',
    heroSubcopy:
      'North Texas cold snaps hit hard and fast. We service furnaces and heat pumps, check for safety issues, and get your home warm again — the right way.',
    included: [
      'Furnace and heat-pump diagnostics and repair',
      'Carbon-monoxide and safety checks on gas equipment',
      'Ignitor, blower, and thermostat repair or replacement',
      'Straightforward pricing before any work starts',
    ],
    process: [
      { step: 1, title: 'Tell us the symptoms', body: 'No heat, weak heat, or odd smells — we book you in fast.' },
      { step: 2, title: 'Inspect for safety', body: 'We diagnose the fault and check the system is safe to run.' },
      { step: 3, title: 'Restore the heat', body: 'We fix it and confirm your home is heating properly before we go.' },
    ],
    faqs: [
      {
        question: 'My furnace smells odd when it kicks on — is that dangerous?',
        answer:
          'A faint dusty smell on first use of the season is normal. Burning, gas, or musty smells are not — turn it off and call us. We always include a safety check on gas equipment.',
      },
      {
        question: 'Do you service heat pumps as well as gas furnaces?',
        answer:
          'Yes. We repair and maintain both gas furnaces and electric heat pumps, including the auxiliary heat and defrost controls.',
      },
      {
        question: 'How often should a furnace be serviced?',
        answer:
          'Once a year, ideally in the fall before you need it. A seasonal tune-up catches small issues before they leave you cold on the coldest night.',
      },
    ],
    seoTitle: 'Heating & Furnace Repair — Dallas, Garland, Sachse',
    seoDescription:
      'Furnace and heat-pump repair and safety checks across the Dallas metro. Fast, safe, honestly priced heating service from Miles Mechanical.',
  },
  {
    slug: 'maintenance',
    title: 'Seasonal Maintenance',
    shortLabel: 'Maintenance',
    icon: 'schedule',
    accent: 'cool',
    cardDescription:
      'Tune-ups that catch small problems before they become hot-day breakdowns.',
    heroEyebrow: 'Stay Ahead Of It',
    heroHeadline: 'Maintenance that prevents the breakdown',
    heroSubcopy:
      'The cheapest repair is the one you never need. A seasonal tune-up keeps your system efficient and catches small faults before they strand you on a 100° afternoon.',
    included: [
      'Full system inspection and performance check',
      'Coil cleaning, refrigerant check, and airflow tuning',
      'Electrical and safety component inspection',
      'A clear report of anything worth watching — no scare tactics',
    ],
    process: [
      { step: 1, title: 'Book your tune-up', body: 'Schedule before the season turns so you’re ready when it does.' },
      { step: 2, title: 'Full inspection', body: 'We clean, test, and tune every key component of the system.' },
      { step: 3, title: 'Honest report', body: 'You get a plain-English summary and only the work you actually need.' },
    ],
    faqs: [
      {
        question: 'Is a maintenance plan worth it?',
        answer:
          'For most homes, yes — a yearly tune-up extends equipment life, keeps efficiency (and bills) in check, and heads off the breakdowns that always seem to happen on the worst day.',
      },
      {
        question: 'When’s the best time to schedule maintenance?',
        answer:
          'Spring for cooling and fall for heating — before the season’s first heavy demand. Book early; those slots fill up fast.',
      },
      {
        question: 'Will you push repairs I don’t need?',
        answer:
          'Never. You get an honest report. If everything checks out, we tell you so and you’re done.',
      },
    ],
    seoTitle: 'Seasonal HVAC Maintenance & Tune-Ups — Dallas Metro',
    seoDescription:
      'Preventive AC and heating tune-ups across Dallas, Garland and Sachse. Catch small faults early, keep efficiency high, and avoid hot-day breakdowns.',
  },
  {
    slug: 'mini-split',
    title: 'Mini-Splits',
    icon: 'thermostat',
    accent: 'heat',
    cardDescription:
      'Ductless comfort for additions, garages, and rooms that never feel right.',
    heroEyebrow: 'Ductless Comfort',
    heroHeadline: 'Mini-splits for the rooms that never feel right',
    heroSubcopy:
      'Garages, additions, sunrooms, that one bedroom that’s always too hot — ductless mini-splits add efficient, quiet comfort exactly where you need it, without new ductwork.',
    included: [
      'Mini-split sizing, installation, and repair',
      'Single-zone and multi-zone setups',
      'Quiet, high-efficiency operation with precise room control',
      'Clean installs with tidy line-set routing',
    ],
    process: [
      { step: 1, title: 'Tell us the room', body: 'We assess the space and how you want to use it.' },
      { step: 2, title: 'Right-size the zone', body: 'We recommend the unit and placement for even, quiet comfort.' },
      { step: 3, title: 'Install and tune', body: 'We mount it clean, charge it, and confirm it’s holding temperature.' },
    ],
    faqs: [
      {
        question: 'Can a mini-split heat as well as cool?',
        answer:
          'Yes. Modern mini-splits are heat pumps — they cool in summer and heat in winter, which makes them ideal for additions and garages with no existing ductwork.',
      },
      {
        question: 'Do I need ductwork for a mini-split?',
        answer:
          'No — that’s the point. A mini-split mounts on the wall and connects to a small outdoor unit through a compact line set, so there’s no ducting to install.',
      },
      {
        question: 'How many rooms can one system handle?',
        answer:
          'A single outdoor unit can run multiple indoor heads (multi-zone), so you can condition several rooms independently from one system.',
      },
    ],
    seoTitle: 'Ductless Mini-Split Install & Repair — Dallas Metro',
    seoDescription:
      'Ductless mini-split sizing, installation and repair across Dallas, Garland and Sachse. Quiet, efficient comfort for additions, garages and problem rooms.',
  },
  {
    slug: 'emergency',
    title: 'Emergency Service',
    shortLabel: 'Emergency',
    icon: 'clock',
    accent: 'heat',
    emergency: true,
    cardDescription:
      'No cooling or no heat? We answer 24/7 and get to you fast.',
    heroEyebrow: 'No Cooling · No Heat',
    heroHeadline: 'We answer the phone at 2 a.m.',
    heroSubcopy:
      'When the AC dies in July or the heat fails on a freezing night, you can’t wait days for a callback. We answer 24/7 — a real person, not a call centre — and get to you fast.',
    included: [
      'Live 24/7 phone and text — a real person answers',
      'Priority response for no-cooling and no-heat calls',
      'Up-front emergency pricing before any work begins',
      'Stocked trucks for the most common after-hours failures',
    ],
    process: [
      { step: 1, title: 'Call or text now', body: 'Day or night, we pick up and triage your situation right away.' },
      { step: 2, title: 'Fast dispatch', body: 'We head out with the parts most likely to get you running again.' },
      { step: 3, title: 'Get you comfortable', body: 'We make the system safe and working, and plan any follow-up clearly.' },
    ],
    faqs: [
      {
        question: 'Do you really answer 24/7?',
        answer:
          'Yes. After-hours calls reach a real person, not an answering service that just takes a message. If your home has no cooling or no heat, call or text and we’ll respond.',
      },
      {
        question: 'Does emergency service cost a lot more?',
        answer:
          'After-hours work carries a fair premium, and we tell you the price up front before any work begins. No surprise charges on the invoice.',
      },
      {
        question: 'What counts as an emergency?',
        answer:
          'No cooling in extreme heat, no heat in a freeze, burning smells, or anything that feels unsafe. When in doubt, call — we’ll help you decide.',
      },
    ],
    seoTitle: '24/7 Emergency HVAC Service — Dallas Metro',
    seoDescription:
      '24/7 emergency AC and heating service across Dallas, Garland and Sachse. A real person answers, fast dispatch, up-front pricing. Call Miles Mechanical now.',
  },
]

/** Look up a service by slug. Returns `undefined` for unknown slugs. */
export function getService(slug: string): ServiceContent | undefined {
  return services.find((service) => service.slug === slug)
}

/** All service slugs — drives generateStaticParams and the sitemap children. */
export const serviceSlugs = services.map((service) => service.slug)

/**
 * The three services featured in the home-page "What we do" grid (hi-fi spec:
 * the home grid surfaces a curated trio, not the full list). Order and selection
 * mirror the hi-fi desktop home: AC repair, Heating & furnace, Install & replace.
 */
const FEATURED_SLUGS = ['ac-repair', 'heating-furnace', 'installation-replacement'] as const
export const featuredServices: ServiceContent[] = FEATURED_SLUGS.map(
  (slug) => services.find((service) => service.slug === slug),
).filter((service): service is ServiceContent => Boolean(service))
