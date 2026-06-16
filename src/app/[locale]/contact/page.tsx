import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata, JsonLd, webPageJsonLd } from '@/lib/seo'
import { pages, whatHappensNext } from '@/content'
import { business } from '@/config/business'
import { Icon } from '@/components/ui/Icon'
import { EmergencyCTA, LeadForm } from '@/components/marketing'

const PATH = '/contact'
const SEO_TITLE = pages.contact.seo.title
const SEO_DESC = pages.contact.seo.description

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ title: SEO_TITLE, description: SEO_DESC, path: PATH, locale })
}

/** NAP-style contact facts (no street address — service-area business). */
const CONTACT_FACTS = [
  {
    icon: 'clock' as const,
    label: 'Business hours',
    value: business.hoursDisplay,
    detail: `${business.emergency} emergency line for no-cooling / no-heat calls.`,
  },
  {
    icon: 'truck' as const,
    label: 'Service area',
    value: business.areas.join(' · '),
    detail: business.region,
  },
  {
    icon: 'alert' as const,
    label: '24/7 emergency',
    value: 'Call or text anytime',
    detail: 'After-hours? A real person answers — fast.',
  },
  {
    icon: 'info' as const,
    label: 'Email',
    value: business.email,
    detail: 'For non-urgent questions and quotes.',
  },
]

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="container-page space-y-12 py-12 sm:space-y-16 sm:py-16">
      {/* ── 1. Page hero ──────────────────────────────────────────────── */}
      <section aria-labelledby="contact-heading" className="max-w-3xl">
        {pages.contact.hero.eyebrow ? (
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ember sm:text-sm">
            {pages.contact.hero.eyebrow}
          </p>
        ) : null}
        <h1
          id="contact-heading"
          className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-heading sm:text-5xl"
        >
          {pages.contact.hero.headline}
        </h1>
        <p className="mt-5 max-w-[52ch] font-sans text-lg leading-relaxed text-sub">
          {pages.contact.hero.subcopy}
        </p>
      </section>

      {/* ── 2. Prominent click-to-call panel (FR-LC-1) ────────────────── */}
      <section aria-labelledby="call-heading" className="space-y-6">
        {/* Standard call affordance — mm-blue, NOT alarm red. */}
        <div className="flex flex-wrap items-center gap-6 rounded-card border border-line bg-subtle px-7 py-7 sm:px-9">
          <div className="min-w-[240px] flex-1">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              Fastest way to reach us
            </p>
            <h2
              id="call-heading"
              className="mt-2 font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.01em] text-heading sm:text-4xl"
            >
              Call or text — we pick up
            </h2>
            <p className="mt-2.5 inline-flex items-center gap-2 font-sans text-[15px] leading-snug text-sub">
              <Icon name="clock" size={16} className="text-primary" aria-hidden />
              {business.hoursDisplay} · same-day where we can
            </p>
          </div>

          {/* Big tel: link — primary blue call affordance. */}
          <a
            href={`tel:${business.phoneTel}`}
            aria-label={`Call Miles Mechanical at ${business.phoneDisplay}`}
            className="inline-flex min-h-14 items-center gap-3 rounded-control bg-primary px-7 py-4 font-display text-2xl font-extrabold tracking-[-0.01em] text-white shadow-e2 transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:text-3xl"
          >
            <Icon name="call" size={26} aria-hidden />
            {business.phoneDisplay}
          </a>
        </div>

        {/* 24/7 emergency line — the one reserved alarm-red use. */}
        <EmergencyCTA />
      </section>

      {/* ── 3. Lead / quote + appointment-request form ────────────────── */}
      <section aria-label="Request service or a free quote">
        <LeadForm />
      </section>

      {/* ── 4. What happens next (FR-LC-3) ────────────────────────────── */}
      <section aria-labelledby="next-heading">
        <div className="rounded-card border border-line bg-primary-tint px-7 py-8 sm:px-9 sm:py-9">
          <h2
            id="next-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-primary-ink sm:text-3xl"
          >
            {whatHappensNext.title}
          </h2>
          <div className="mt-3 h-1 w-16 bg-ember" aria-hidden />
          <ol className="mt-6 space-y-4">
            {whatHappensNext.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-primary font-display text-base font-extrabold text-white"
                >
                  {index + 1}
                </span>
                <p className="font-sans text-[15px] leading-relaxed text-primary-ink">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. Contact facts / NAP block ──────────────────────────────── */}
      <section aria-labelledby="facts-heading">
        <h2
          id="facts-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-3xl"
        >
          Hours, area &amp; contact
        </h2>
        <div className="mt-3 h-1 w-16 bg-ember" aria-hidden />
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTACT_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex items-start gap-4 rounded-card border border-line bg-card p-6 shadow-e1"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-primary-tint text-primary"
              >
                <Icon name={fact.icon} size={22} />
              </span>
              <div>
                <dt className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {fact.label}
                </dt>
                {fact.label === 'Email' ? (
                  <dd className="mt-1 font-display text-lg font-extrabold tracking-[-0.01em] text-heading">
                    <a
                      href={`mailto:${business.email}`}
                      className="break-all transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {fact.value}
                    </a>
                  </dd>
                ) : (
                  <dd className="mt-1 font-display text-lg font-extrabold tracking-[-0.01em] text-heading">
                    {fact.value}
                  </dd>
                )}
                <p className="mt-1 font-sans text-[13px] leading-normal text-sub">
                  {fact.detail}
                </p>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <JsonLd data={webPageJsonLd({ title: SEO_TITLE, description: SEO_DESC, path: PATH, locale })} />
    </main>
  )
}
