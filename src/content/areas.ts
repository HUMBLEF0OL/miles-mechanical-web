/**
 * Service-area content — the localized city template source (FR-SA-1/2/3).
 *
 * Each entry MUST carry genuinely unique, non-boilerplate local content
 * (FR-SA-2): real neighbourhoods, landmarks, and a city-specific angle. The
 * acceptance bar (Scope §5.6) is that no two city pages read as duplicates.
 *
 * Adding a city is a content entry here — the /areas/[city] template and the
 * sitemap pick it up with no rebuild (FR-SA-3). Miles Mechanical is a
 * service-area business with no public storefront, so there is no map pin or
 * street address — the copy reflects "we come to you".
 */

export interface AreaReview {
  quote: string
  author: string
  /** Single-letter avatar initial. */
  initial: string
}

export interface AreaContent {
  /** URL slug under /areas/. */
  slug: string
  /** City name, e.g. "Dallas". */
  city: string
  /** Detail-page H1, e.g. "HVAC in Dallas". */
  heroHeadline: string
  /** Hero supporting paragraph — localized. */
  heroSubcopy: string
  /** Two to three paragraphs of unique local content (FR-SA-2). */
  intro: string[]
  /** Real neighbourhoods / sub-areas served — proves genuine local coverage. */
  neighbourhoods: string[]
  /** A city-specific angle: climate, housing stock, or landmark emphasis. */
  localAngle: string
  /** Optional localized testimonial for extra local proof. */
  review?: AreaReview
  /** Per-page <title> (bare). */
  seoTitle: string
  /** Per-page meta description. */
  seoDescription: string
}

export const areas: AreaContent[] = [
  {
    slug: 'dallas',
    city: 'Dallas',
    heroHeadline: 'HVAC in Dallas',
    heroSubcopy:
      'Honest, licensed AC and heating across Dallas — from a family-owned team that’s worked these neighbourhoods for 20+ years. Same-day repairs and a real person on the phone.',
    intro: [
      'Dallas summers don’t ease in — they slam the door shut at 100°+ for weeks on end, and a tired AC picks exactly that week to quit. We’ve spent two decades keeping Dallas homes cool through it, which means we know the housing stock: the older units in East Dallas and Lakewood bungalows, the bigger systems in newer builds out toward the suburbs.',
      'Because we’re local, we’re not routing you through a call center three states away. You talk to the people who’ll actually show up. We fix what can be fixed, size replacements to the real home, and tell you straight when a 20-year-old condenser is finally done.',
    ],
    neighbourhoods: [
      'Lakewood',
      'East Dallas',
      'Oak Cliff',
      'Lake Highlands',
      'Preston Hollow',
      'White Rock',
    ],
    localAngle:
      'Older Dallas homes often run undersized or aging ductwork — we diagnose airflow, not just the unit, so the whole house actually gets comfortable.',
    review: {
      quote:
        'AC died in the middle of a July heat wave. Miles had someone out the same afternoon and we were cool by dinner. Fair price, no runaround.',
      author: 'Marcus T.',
      initial: 'M',
    },
    seoTitle: 'AC & Heating Repair in Dallas, TX',
    seoDescription:
      'Family-owned, licensed HVAC in Dallas, TX. Same-day AC repair, heating service, and honest pricing across Lakewood, Oak Cliff, East Dallas and more.',
  },
  {
    slug: 'garland',
    city: 'Garland',
    heroHeadline: 'HVAC in Garland',
    heroSubcopy:
      'Your Garland neighbours’ go-to for AC and heating. Licensed, insured, and genuinely local — we’re a short drive from your door, not an hour out on the tollway.',
    intro: [
      'Garland is full of solid 1970s–90s homes, and the HVAC systems in a lot of them are right at the age where small problems turn into no-cool days. We see it constantly — a failing capacitor, a clogged coil, a furnace ignitor on its last season. Catching those early is most of what we do here.',
      'We treat Garland like home turf because it is. That means quick arrival times, parts on the truck for the common failures in this housing stock, and the kind of straight talk you’d give a neighbour — because half the time, you are one.',
    ],
    neighbourhoods: [
      'Firewheel',
      'Duck Creek',
      'South Garland',
      'Camelot',
      'Club Hill',
      'Oakridge',
    ],
    localAngle:
      'Garland’s mature housing means a lot of aging systems — we’re big on seasonal tune-ups here to head off the breakdowns before peak summer and the winter freezes.',
    review: {
      quote:
        'Furnace quit during that cold snap. They answered the phone at night, came first thing, and didn’t try to sell me a whole new system. Rare these days.',
      author: 'Brenda K.',
      initial: 'B',
    },
    seoTitle: 'AC & Heating Repair in Garland, TX',
    seoDescription:
      'Local, licensed HVAC in Garland, TX. Fast AC repair, furnace service, and seasonal tune-ups across Firewheel, Duck Creek, South Garland and more.',
  },
  {
    slug: 'sachse',
    city: 'Sachse',
    heroHeadline: 'HVAC in Sachse',
    heroSubcopy:
      'Sachse’s newer homes deserve HVAC done right. We install, repair, and maintain across the area with honest pricing and work backed by a real warranty.',
    intro: [
      'Sachse has grown fast, and a lot of its homes are newer builds — which sounds like it should mean fewer HVAC headaches, but a builder-grade system that was sized to a spreadsheet often struggles with real Texas summers. We dial those systems in, fix airflow imbalances, and add zoning or mini-splits where a bonus room or addition never quite cooled.',
      'As a service-area team, we come to you across Sachse and the surrounding stretch toward Wylie and Murphy. No storefront overhead, no padded tickets — just the right fix, sized to your home, from a crew that’s been doing this for 20+ years.',
    ],
    neighbourhoods: [
      'Woodbridge',
      'The Ranch',
      'Heritage Park',
      'Stone Canyon',
      'Sachse Meadows',
      'toward Wylie & Murphy',
    ],
    localAngle:
      'Many Sachse homes are newer builds with builder-grade systems and bonus rooms that never cool evenly — zoning and mini-splits are a frequent fix here.',
    review: {
      quote:
        'Our upstairs was always 5 degrees hotter. They added a mini-split in the bonus room and it’s finally usable. Clean install, great crew.',
      author: 'Priya S.',
      initial: 'P',
    },
    seoTitle: 'AC & Heating Service in Sachse, TX',
    seoDescription:
      'Licensed HVAC in Sachse, TX. AC repair, system installs, mini-splits and zoning for newer homes across Woodbridge, Heritage Park and surrounding areas.',
  },
]

/** Look up a service area by slug. Returns `undefined` for unknown slugs. */
export function getArea(slug: string): AreaContent | undefined {
  return areas.find((area) => area.slug === slug)
}

/** All city slugs — drives generateStaticParams and the sitemap children. */
export const areaSlugs = areas.map((area) => area.slug)
