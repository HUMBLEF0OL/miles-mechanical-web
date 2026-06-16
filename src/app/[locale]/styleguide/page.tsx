import type { ReactNode } from 'react'
import {
  Button,
  Input,
  Select,
  Textarea,
  Logo,
  Icon,
  CredentialBadge,
  RatingStars,
  type IconName,
} from '@/components/ui'
import {
  ServiceCard,
  ReviewCard,
  TrustBar,
  EmergencyCTA,
  Hero,
  LeadForm,
} from '@/components/marketing'
import { SiteHeader, TopBar, SiteFooter } from '@/components/layout'

export const metadata = {
  robots: { index: false, follow: false },
  title: 'Design System',
}

// ── Token reference data ──────────────────────────────────────────────────
const BLUE_SCALE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
const EMBER_SCALE = [50, 100, 200, 300, 400, 500, 600, 700] as const
const STEEL_SCALE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

const SEMANTIC = [
  { name: 'success', cls: 'bg-success' },
  { name: 'warning', cls: 'bg-warning' },
  { name: 'alarm', cls: 'bg-alarm' },
  { name: 'info', cls: 'bg-info' },
] as const

const SERVICES: ReadonlyArray<{
  iconName: IconName
  title: string
  description: string
  accent?: 'cool' | 'heat'
  emergency?: boolean
}> = [
  {
    iconName: 'cooling',
    title: 'AC repair & tune-ups',
    description:
      'Fast, fair-priced cooling repairs across the Dallas metro — no surprise fees, no upselling.',
    accent: 'cool',
  },
  {
    iconName: 'heating',
    title: 'Heating & furnace',
    description:
      'Furnace not keeping up? We diagnose and fix gas and electric heat the same day.',
    accent: 'heat',
  },
  {
    iconName: 'repair',
    title: 'Install & replace',
    description:
      'Right-sized systems installed by licensed techs, backed by a 10-year parts warranty.',
    accent: 'cool',
  },
  {
    iconName: 'thermostat',
    title: 'Maintenance plans',
    description:
      'Seasonal tune-ups that keep your system efficient and catch problems before they cost you.',
    accent: 'cool',
  },
  {
    iconName: 'airflow',
    title: 'Mini-split systems',
    description:
      'Ductless comfort for additions, garages, and rooms the main system never reaches.',
    accent: 'heat',
  },
  {
    iconName: 'alert',
    title: 'Emergency service',
    description:
      'No cooling or no heat after hours? Call or text and we answer 24/7 — a real person, fast.',
    emergency: true,
  },
]

const REVIEWS = [
  {
    quote:
      'Mr. Miles came out the same afternoon, found the problem in ten minutes, and charged half what the big company quoted. Honest people.',
    author: 'Dana R.',
    city: 'Garland, TX',
    initial: 'D',
  },
  {
    quote:
      'Our heat died on the coldest night of the year. They actually answered the phone and had us warm again before midnight.',
    author: 'Marcus T.',
    city: 'Dallas, TX',
    initial: 'M',
  },
  {
    quote:
      'Family-owned and it shows. No pressure, no upsell — just fixed what was broken and explained everything.',
    author: 'Priya S.',
    city: 'Sachse, TX',
    initial: 'P',
  },
]

const CREDENTIALS = [
  'Licensed & insured',
  'American Home Shield approved',
  '10-yr parts warranty',
  '20+ years family-owned',
]

const DISPLAY_ICONS: IconName[] = [
  'cooling',
  'heating',
  'thermostat',
  'repair',
  'airflow',
  'warranty',
  'call',
  'schedule',
  'reviews',
  'home-warranty',
  'clock',
  'truck',
  'experience',
  'efficiency',
  'check',
  'info',
  'alert',
  'star',
]

// ── Section scaffolding ───────────────────────────────────────────────────
function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-line py-12 first:border-t-0">
      <h2 className="mb-6 font-display text-2xl font-extrabold uppercase tracking-tight text-heading">
        {title}
      </h2>
      {children}
    </section>
  )
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-faint">
      {children}
    </p>
  )
}

function Swatch({ label, cls }: { label: string; cls: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`h-14 rounded-control border border-line-soft ${cls}`} />
      <span className="font-mono text-[11px] text-muted">{label}</span>
    </div>
  )
}

export default function StyleguidePage() {
  return (
    <main className="bg-page py-10">
      <div className="container-page">
        <header className="mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Internal · noindex
          </p>
          <h1 className="mt-1 font-display text-4xl font-black uppercase tracking-tight text-heading">
            Miles Mechanical — Design System
          </h1>
          <p className="mt-2 max-w-2xl text-sub">
            A live assembly of the design tokens, atoms, and marketing
            components. Use this page to verify colour, type, spacing, and
            component fidelity in the browser.
          </p>
        </header>

        {/* ── Logo lockups ──────────────────────────────────────────────── */}
        <Section id="logos" title="Logo lockups">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-card border border-line bg-page p-8">
              <SubLabel>On light surface</SubLabel>
              <div className="flex flex-col gap-6">
                <Logo variant="full" tone="light" size={48} />
                <div className="flex items-center gap-6">
                  <Logo variant="mark" tone="light" size={48} />
                  <Logo variant="wordmark" tone="light" size={28} />
                </div>
              </div>
            </div>
            <div className="rounded-card border border-mm-blue-900 bg-mm-blue-900 p-8">
              <SubLabel>On dark surface</SubLabel>
              <div className="flex flex-col gap-6">
                <Logo variant="full" tone="dark" size={48} />
                <div className="flex items-center gap-6">
                  <Logo variant="mark" tone="dark" size={48} />
                  <Logo variant="wordmark" tone="dark" size={28} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Colour swatches ───────────────────────────────────────────── */}
        <Section id="colour" title="Colour">
          <div className="flex flex-col gap-8">
            <div>
              <SubLabel>mm-blue (primary)</SubLabel>
              <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
                {BLUE_SCALE.map((step) => (
                  <Swatch
                    key={step}
                    label={`mm-blue-${step}`}
                    cls={`bg-mm-blue-${step}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <SubLabel>mm-ember (heating accent)</SubLabel>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
                {EMBER_SCALE.map((step) => (
                  <Swatch
                    key={step}
                    label={`mm-ember-${step}`}
                    cls={`bg-mm-ember-${step}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <SubLabel>mm-steel (text & borders)</SubLabel>
              <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
                {STEEL_SCALE.map((step) => (
                  <Swatch
                    key={step}
                    label={`mm-steel-${step}`}
                    cls={`bg-mm-steel-${step}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <SubLabel>Semantic (alarm = emergency only)</SubLabel>
              <div className="grid grid-cols-4 gap-3">
                {SEMANTIC.map((s) => (
                  <Swatch key={s.name} label={s.name} cls={s.cls} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Typography ────────────────────────────────────────────────── */}
        <Section id="type" title="Typography">
          <div className="flex flex-col gap-8">
            <div>
              <SubLabel>font-display — Archivo (headings, uppercase)</SubLabel>
              <div className="flex flex-col gap-2 text-heading">
                <p className="font-display text-5xl font-black uppercase tracking-tight">
                  Honest HVAC
                </p>
                <p className="font-display text-3xl font-extrabold uppercase">
                  Done right.
                </p>
                <p className="font-display text-xl font-bold uppercase">
                  We answer 24/7
                </p>
              </div>
            </div>
            <div>
              <SubLabel>font-sans — IBM Plex Sans (body & UI)</SubLabel>
              <div className="flex max-w-2xl flex-col gap-2">
                <p className="font-sans text-lg text-heading">
                  Family-owned in Dallas for 20+ years.
                </p>
                <p className="font-sans text-base text-sub">
                  Fair pricing, licensed work, and we actually answer after
                  hours. Serving Dallas, Garland, Sachse and surrounding cities.
                </p>
                <p className="font-sans text-sm text-muted">
                  Licensed &amp; insured · American Home Shield approved.
                </p>
                <p className="font-mono text-sm text-faint">
                  font-mono — IBM Plex Mono · (214) 555-0148
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Buttons ───────────────────────────────────────────────────── */}
        <Section id="buttons" title="Buttons">
          <div className="flex flex-col gap-8">
            <div>
              <SubLabel>Variants (md)</SubLabel>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Request service</Button>
                <Button variant="secondary">Learn more</Button>
                <Button variant="ghost">View details</Button>
                <Button variant="ember">Get a free quote</Button>
                <Button variant="emergency" leftIcon={<Icon name="call" size={18} />}>
                  Call 24/7
                </Button>
              </div>
            </div>
            <div>
              <SubLabel>Sizes</SubLabel>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <SubLabel>States</SubLabel>
              <div className="flex flex-wrap items-center gap-3">
                <Button isLoading>Submitting</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Icons ─────────────────────────────────────────────────────── */}
        <Section id="icons" title="Iconography">
          <div className="flex flex-wrap gap-4">
            {DISPLAY_ICONS.map((name) => (
              <div
                key={name}
                className="flex w-24 flex-col items-center gap-2 rounded-control border border-line-soft p-3"
              >
                <Icon name={name} size={26} className="text-mm-blue-600" />
                <span className="font-mono text-[10px] text-muted">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Form fields ───────────────────────────────────────────────── */}
        <Section id="forms" title="Form fields">
          <div className="grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Name" name="name" placeholder="Your name" required />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              placeholder="(214) 000-0000"
              hint="We'll call you back fast."
            />
            <Select label="Service" name="service" defaultValue="AC repair">
              <option>AC repair</option>
              <option>Heating</option>
              <option>Install</option>
              <option>Maintenance</option>
              <option>Emergency</option>
            </Select>
            <Input
              label="City / ZIP"
              name="cityZip"
              placeholder="Garland, 75040"
              error="Please enter a valid Dallas-area city or ZIP."
            />
            <div className="sm:col-span-2">
              <Textarea
                label="What's going on?"
                name="message"
                placeholder="Describe the issue"
              />
            </div>
          </div>
        </Section>

        {/* ── Service cards ─────────────────────────────────────────────── */}
        <Section id="services" title="Service cards">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.title}
                iconName={s.iconName}
                title={s.title}
                description={s.description}
                href="#"
                accent={s.accent}
                emergency={s.emergency}
              />
            ))}
          </div>
        </Section>

        {/* ── Social proof ──────────────────────────────────────────────── */}
        <Section id="proof" title="Trust & reviews">
          <div className="flex flex-col gap-8">
            <TrustBar href="#" />

            <div>
              <SubLabel>Rating stars</SubLabel>
              <div className="flex flex-col gap-3">
                <RatingStars rating={4.9} count={56} />
                <RatingStars size="text-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r) => (
                <ReviewCard
                  key={r.author}
                  quote={r.quote}
                  author={r.author}
                  city={r.city}
                  initial={r.initial}
                />
              ))}
            </div>

            <div>
              <SubLabel>Credential badges</SubLabel>
              <div className="flex flex-wrap gap-3">
                {CREDENTIALS.map((label) => (
                  <CredentialBadge key={label} label={label} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Emergency CTA ─────────────────────────────────────────────── */}
        <Section id="emergency" title="Emergency CTA">
          <EmergencyCTA />
        </Section>

        {/* ── Assembled page ────────────────────────────────────────────── */}
        <Section id="assembled" title="Assembled page">
          <div className="flex flex-col gap-10">
            <div className="overflow-hidden rounded-card border border-line">
              <TopBar />
              <SiteHeader />
            </div>

            <Hero />

            <LeadForm />

            <SiteFooter />
          </div>
        </Section>
      </div>
    </main>
  )
}
