import type { IconName } from '@/components/ui/Icon'

/**
 * Company / trust content — the About page (FR-CR-3) plus the credential badges
 * and proof points reused on the home and area pages (FR-RV-3).
 *
 * Several facts here are PLACEHOLDERS pending owner confirmation (Scope §6):
 * licence numbers, the owner photo, and exact warranty terms. The design is
 * asset-light: everything degrades gracefully if a photo or number is missing.
 */

/** Trust / credential badge labels (FR-RV-3). Mirrors the Hi-Fi credential set. */
export const credentials: string[] = [
  'Licensed & insured',
  'American Home Shield approved',
  '10-yr parts / 1-yr labour',
  '20+ years',
  'Military discount',
]

/** Longer proof points for hero/credentials panels. */
export const proofPoints: string[] = [
  'Licensed & insured',
  'American Home Shield approved',
  '10-yr parts / 1-yr labour warranty',
  '20+ years · family-owned',
]

export interface CompanyValue {
  icon: IconName
  title: string
  body: string
}

/** The four brand values (Design System §04 voice). */
export const values: CompanyValue[] = [
  {
    icon: 'reviews',
    title: 'Honest',
    body: 'Fair, transparent pricing. We name the real problem and never sell a system you don’t need.',
  },
  {
    icon: 'truck',
    title: 'Local',
    body: 'Texans serving Texans. Family-owned, neighbourhood by neighbourhood across the Dallas metro.',
  },
  {
    icon: 'warranty',
    title: 'Dependable',
    body: 'On time, licensed, insured. We answer after hours and back our work with a real warranty.',
  },
  {
    icon: 'thermostat',
    title: 'Plainspoken',
    body: 'Short sentences, plain words. We explain the fix like we’d explain it to a neighbour.',
  },
]

export interface TimelineEntry {
  /** Milestone label, e.g. "20+ years". */
  marker: string
  title: string
  body: string
}

/** The 20-year story, as a simple timeline (About page). */
export const timeline: TimelineEntry[] = [
  {
    marker: 'The start',
    title: 'Learning the trade',
    body: 'Years on the tools across the Dallas metro — learning that the work is really about trust, not just refrigerant.',
  },
  {
    marker: 'Going local',
    title: 'A family-owned shop',
    body: 'Miles Mechanical was built on a simple promise: honest pricing, real warranties, and a phone a neighbour actually answers.',
  },
  {
    marker: '20+ years',
    title: 'Still serving Texans',
    body: 'Thousands of repairs and installs later, a 4.9★ reputation, and the same straight-talking approach we started with.',
  },
]

/**
 * Owner story (FR-CR-3, FR-RV-5). The owner photo is optional and pending
 * approval (Scope §6) — when `ownerPhoto` is null the About page falls back to
 * the M monogram, so the page never depends on client imagery.
 */
export const owner = {
  name: 'Charles Miles',
  role: 'Owner / Operator',
  /** Set to a real photo path once approved; null → monogram fallback. */
  photo: null as string | null,
  story: [
    'Miles Mechanical is Charles Miles — and the small, trusted team he’s built around the same idea for over twenty years: do honest work, charge a fair price, and treat every home like it belongs to a neighbour.',
    'There’s no call centre and no commission-driven sales script. When you call, you reach the people who do the work. We’d rather fix what you have than sell you what you don’t need — that’s how you keep customers for twenty years instead of twenty minutes.',
  ],
}
