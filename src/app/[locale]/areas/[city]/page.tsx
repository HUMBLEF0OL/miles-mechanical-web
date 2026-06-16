import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  buildMetadata,
  JsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
  localizedUrl,
} from '@/lib/seo'
import { getArea, areaSlugs, getService } from '@/content'
import { business } from '@/config/business'
import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { ReviewCard, LeadForm } from '@/components/marketing'

interface PageProps {
  params: Promise<{ locale: string; city: string }>
}

// FR-SA-3: every city slug is statically generated; unknown slugs 404.
export function generateStaticParams() {
  return areaSlugs.map((city) => ({ city }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, city } = await params
  const area = getArea(city)
  if (!area) notFound()
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/areas/${city}`,
    locale,
  })
}

// A compact, curated set of services to surface on each city page.
const FEATURED_SERVICE_SLUGS = [
  'ac-repair',
  'heating-furnace',
  'installation-replacement',
  'maintenance',
] as const

export default async function ServiceAreaPage({ params }: PageProps) {
  const { locale, city } = await params
  setRequestLocale(locale)

  const area = getArea(city)
  if (!area) notFound()

  const path = `/areas/${city}`

  // Resolve the curated service list against real content, skipping any
  // slug that isn't present so the template never links to a dead route.
  const cityServices = FEATURED_SERVICE_SLUGS.map((slug) => getService(slug)).filter(
    (service): service is NonNullable<typeof service> => Boolean(service),
  )

  return (
    <main className="container-page pb-12 sm:pb-16">
      <div className="space-y-12 sm:space-y-16">
        {/* ── 1. Localized hero — full-bleed navy band ───────────────────── */}
        <section
          aria-labelledby="area-hero-heading"
          className="full-bleed relative overflow-hidden bg-hero"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--color-mm-ember-500)_0%,transparent_65%)] opacity-20"
          />

          <div className="band-inner grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
            {/* Left: localized headline + CTAs */}
            <div className="relative py-12 text-hero-ink sm:py-14 lg:pr-10">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ember-strong sm:text-sm">
                Serving {area.city}, TX
              </p>

              <h1
                id="area-hero-heading"
                className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl"
              >
                {(() => {
                  const idx = area.heroHeadline.lastIndexOf(area.city)
                  if (idx === -1) return area.heroHeadline
                  return (
                    <>
                      {area.heroHeadline.slice(0, idx)}
                      <span className="text-ember-strong">
                        {area.heroHeadline.slice(idx)}
                      </span>
                    </>
                  )
                })()}
              </h1>

              <p className="mt-5 max-w-[52ch] font-sans text-lg leading-relaxed text-hero-body">
                {area.heroSubcopy}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    'inline-flex h-14 items-center justify-center gap-2.5 rounded-control bg-ember px-8',
                    'font-sans text-lg font-semibold text-white transition-colors hover:bg-ember-strong',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                  )}
                >
                  Get a quote
                </Link>

                {/* tel CTA — real anchor for click-to-call semantics. */}
                <a
                  href={`tel:${business.phoneTel}`}
                  className={cn(
                    'inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-hero-line px-8',
                    'font-sans text-lg font-semibold text-hero-ink transition-colors hover:bg-white/10',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                  )}
                >
                  <Icon name="phone" size={18} aria-hidden />
                  Call {business.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Right: asset-light "we come to you" service-area trust panel.
                No storefront -> no map pin (per task + wireframe note); the
                check-marked proof list carries the local social-proof points. */}
            <div className="relative mb-12 flex flex-col justify-center gap-5 overflow-hidden rounded-card border border-hero-line bg-gradient-to-br from-hero-strong to-hero px-8 py-10 sm:px-10 lg:mb-0 lg:rounded-none lg:border-y-0 lg:border-l lg:border-r-0 lg:bg-transparent lg:px-10 lg:py-12">
              <Logo
                variant="mark-no-badge"
                tone="dark"
                size={200}
                decorative
                className="pointer-events-none absolute -bottom-10 -right-8 opacity-[0.12]"
              />

              <div className="relative flex items-center gap-3">
                <span className="flex size-12 flex-none items-center justify-center rounded-control bg-hero-chip text-ember-strong">
                  <Icon name="truck" size={26} aria-hidden />
                </span>
                <p className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-hero-ink">
                  We come to you
                </p>
              </div>

              <div className="relative h-px bg-hero-line" aria-hidden />

              <ul className="relative flex flex-col gap-3">
                {[
                  'No storefront — no showroom markup',
                  `Same-day service in ${area.city} where we can`,
                  'Licensed & insured',
                ].map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-2.5 font-sans text-[15px] font-semibold text-hero-body"
                  >
                    <Icon name="check" size={18} className="text-hero-muted" aria-hidden />
                    {point}
                  </li>
                ))}
                <li className="inline-flex items-center gap-2.5 font-sans text-[15px] font-semibold text-hero-body">
                  <Icon name="check" size={18} className="text-hero-muted" aria-hidden />
                  {business.rating}
                  <span className="text-ember-strong" aria-hidden>
                    ★
                  </span>{' '}
                  from local homeowners
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 2. Unique local content (FR-SA-2) ──────────────────────────── */}
        <section aria-labelledby="local-heading" className="space-y-8">
          <div>
            <h2
              id="local-heading"
              className="font-display text-3xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-4xl"
            >
              HVAC built for {area.city} homes
            </h2>
            <div className="mt-3 h-1 w-16 bg-ember" aria-hidden />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5">
              {area.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-sans text-[17px] leading-relaxed text-sub"
                >
                  {paragraph}
                </p>
              ))}

              {/* localAngle as a highlighted note */}
              <div className="flex items-start gap-3 rounded-control border border-ember bg-ember-tint px-5 py-4 text-ember">
                <Icon name="info" size={20} className="mt-0.5 shrink-0" aria-hidden />
                <p className="font-sans text-[15px] leading-relaxed">{area.localAngle}</p>
              </div>
            </div>

            {/* Neighbourhoods as chips */}
            <div className="rounded-card border border-line bg-subtle p-6 sm:p-7">
              <h3 className="font-display text-lg font-bold uppercase tracking-[-0.01em] text-heading">
                Neighbourhoods we serve
              </h3>
              <p className="mt-1.5 font-sans text-sm text-muted">
                Genuine local coverage across {area.city} and nearby.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.neighbourhoods.map((hood) => (
                  <li key={hood}>
                    <Badge variant="info">{hood}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 3. Local proof + services ──────────────────────────────────── */}
        <section aria-labelledby="proof-heading" className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
            {/* Localized review */}
            {area.review ? (
              <div className="space-y-4">
                <h2
                  id="proof-heading"
                  className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading"
                >
                  From a {area.city} neighbour
                </h2>
                <ReviewCard
                  quote={area.review.quote}
                  author={area.review.author}
                  city={area.city}
                  initial={area.review.initial}
                />
              </div>
            ) : (
              <h2 id="proof-heading" className="sr-only">
                Services we run in {area.city}
              </h2>
            )}

            {/* Services in this city */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading">
                Services we run in {area.city}
              </h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cityServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className={cn(
                        'group flex items-center gap-3 rounded-control border border-line bg-card px-4 py-3.5',
                        'transition-colors hover:border-primary hover:bg-primary-tint',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-10 flex-none items-center justify-center rounded-control',
                          service.accent === 'heat'
                            ? 'bg-ember-tint text-ember'
                            : 'bg-primary-tint text-primary',
                        )}
                      >
                        <Icon name={service.icon} size={22} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 font-sans text-[15px] font-semibold text-heading">
                        {service.title}
                      </span>
                      <Icon
                        name="chevron-down"
                        size={18}
                        className="-rotate-90 flex-none text-faint transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 4. Localized lead form (FR-LC-2) ───────────────────────────── */}
        <section aria-labelledby="lead-form-heading">
          <LeadForm />
        </section>
      </div>

      <JsonLd
        data={[
          webPageJsonLd({
            title: area.seoTitle,
            description: area.seoDescription,
            path,
            locale,
          }),
          breadcrumbJsonLd([
            { name: 'Home', url: localizedUrl('/', locale) },
            { name: area.city, url: localizedUrl(path, locale) },
          ]),
        ]}
      />
    </main>
  )
}
