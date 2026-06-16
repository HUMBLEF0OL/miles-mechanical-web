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
    <main className="container-page py-12 sm:py-16">
      <div className="space-y-12 sm:space-y-16">
        {/* ── 1. Localized hero ──────────────────────────────────────────── */}
        <section
          aria-labelledby="area-hero-heading"
          className="relative grid grid-cols-1 overflow-hidden rounded-card bg-mm-blue-900 lg:grid-cols-[1.2fr_1fr]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--color-mm-ember-500)_0%,transparent_65%)] opacity-20"
          />

          {/* Left: localized headline + CTAs */}
          <div className="relative px-7 py-12 text-white sm:px-11 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mm-ember-300 sm:text-sm">
              Serving {area.city}, TX
            </p>

            <h1
              id="area-hero-heading"
              className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl"
            >
              {area.heroHeadline}
            </h1>

            <p className="mt-5 max-w-[52ch] font-sans text-lg leading-relaxed text-mm-blue-300">
              {area.heroSubcopy}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  'inline-flex h-14 items-center justify-center gap-2.5 rounded-control bg-mm-ember-600 px-8',
                  'font-sans text-lg font-semibold text-white transition-colors hover:bg-mm-ember-700',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                )}
              >
                Get a quote
              </Link>

              {/* tel CTA — real anchor for click-to-call semantics. */}
              <a
                href={`tel:${business.phoneTel}`}
                className={cn(
                  'inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-white/40 px-8',
                  'font-sans text-lg font-semibold text-white transition-colors hover:bg-white/10',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                )}
              >
                <Icon name="phone" size={18} aria-hidden />
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right: asset-light "we come to you" service-area panel.
              No storefront -> no map pin (per task + wireframe note). */}
          <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden border-t border-white/10 bg-[linear-gradient(160deg,var(--color-mm-blue-700),var(--color-mm-blue-900))] px-10 py-12 text-center lg:border-l lg:border-t-0">
            <Logo
              variant="mark-no-badge"
              tone="dark"
              size={200}
              decorative
              className="pointer-events-none absolute -bottom-10 -right-8 opacity-[0.12]"
            />
            <span className="relative flex size-16 items-center justify-center rounded-control bg-white/10 text-mm-ember-300">
              <Icon name="truck" size={34} aria-hidden />
            </span>
            <p className="relative font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-white">
              We come to you
            </p>
            <p className="relative max-w-[34ch] font-sans text-[15px] leading-relaxed text-mm-blue-200">
              No storefront, no showroom markup — a mobile {business.tagline} crew
              that shows up at your {area.city} door, on time.
            </p>
          </div>
        </section>

        {/* ── 2. Unique local content (FR-SA-2) ──────────────────────────── */}
        <section aria-labelledby="local-heading" className="space-y-8">
          <div>
            <h2
              id="local-heading"
              className="font-display text-3xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900 sm:text-4xl"
            >
              HVAC built for {area.city} homes
            </h2>
            <div className="mt-3 h-1 w-16 bg-mm-ember-600" aria-hidden />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5">
              {area.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-sans text-[17px] leading-relaxed text-mm-steel-700"
                >
                  {paragraph}
                </p>
              ))}

              {/* localAngle as a highlighted note */}
              <div className="flex items-start gap-3 rounded-control border border-mm-ember-200 bg-mm-ember-50 px-5 py-4 text-mm-ember-800">
                <Icon name="info" size={20} className="mt-0.5 shrink-0" aria-hidden />
                <p className="font-sans text-[15px] leading-relaxed">{area.localAngle}</p>
              </div>
            </div>

            {/* Neighbourhoods as chips */}
            <div className="rounded-card border border-line bg-subtle p-6 sm:p-7">
              <h3 className="font-display text-lg font-bold uppercase tracking-[-0.01em] text-mm-blue-900">
                Neighbourhoods we serve
              </h3>
              <p className="mt-1.5 font-sans text-sm text-mm-steel-600">
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
                  className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900"
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
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900">
                Services we run in {area.city}
              </h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cityServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className={cn(
                        'group flex items-center gap-3 rounded-control border border-line bg-page px-4 py-3.5',
                        'transition-colors hover:border-mm-blue-300 hover:bg-mm-blue-50',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-10 flex-none items-center justify-center rounded-control',
                          service.accent === 'heat'
                            ? 'bg-mm-ember-100 text-mm-ember-600'
                            : 'bg-mm-blue-100 text-mm-blue-600',
                        )}
                      >
                        <Icon name={service.icon} size={22} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 font-sans text-[15px] font-semibold text-mm-blue-900">
                        {service.title}
                      </span>
                      <Icon
                        name="chevron-down"
                        size={18}
                        className="-rotate-90 flex-none text-mm-steel-400 transition-transform group-hover:translate-x-0.5"
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
