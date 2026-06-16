import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import {
  buildMetadata,
  JsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
  localizedUrl,
} from '@/lib/seo'
import { pages, services } from '@/content'
import { business } from '@/config/business'
import { ServiceCard } from '@/components/marketing'
import { Icon } from '@/components/ui/Icon'

const PATH = '/services'
const SEO = pages.services.seo
const HERO = pages.services.hero

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: SEO.title,
    description: SEO.description,
    path: PATH,
    locale,
  })
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="container-page py-12 sm:py-16">
      {/* ── Page hero (FR-CR-2) ─────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="max-w-3xl">
        {HERO.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember sm:text-sm">
            {HERO.eyebrow}
          </p>
        ) : null}
        <h1
          id="services-heading"
          className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-heading sm:text-5xl"
        >
          {HERO.headline}
        </h1>
        {/* Ember accent bar motif */}
        <div className="mt-5 h-1 w-16 rounded-full bg-ember" aria-hidden />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sub">{HERO.subcopy}</p>
      </section>

      {/* ── Services grid (FR-CR-2) ─────────────────────────────────────── */}
      <section aria-label="Our HVAC services" className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              iconName={service.icon}
              title={service.title}
              description={service.cardDescription}
              href={`/services/${service.slug}`}
              accent={service.accent}
              emergency={service.emergency}
            />
          ))}
        </div>
      </section>

      {/* ── Closing "Request service" CTA band ──────────────────────────── */}
      <section
        aria-labelledby="services-cta-heading"
        className="mt-12 overflow-hidden rounded-card bg-hero px-7 py-10 text-hero-ink sm:mt-16 sm:px-11 sm:py-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="services-cta-heading"
              className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] sm:text-3xl"
            >
              Not sure which service you need?
            </h2>
            <p className="mt-3 max-w-xl text-hero-body">
              Tell us the symptoms and we&rsquo;ll point you to the right fix — honest pricing,
              licensed work, no sales pressure.
            </p>
          </div>

          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-control bg-ember px-8 font-sans text-lg font-semibold text-white transition-colors hover:bg-ember-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Request service
            </Link>

            <a
              href={`tel:${business.phoneTel}`}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-hero-line px-8 font-sans text-lg font-semibold text-hero-ink transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <Icon name="phone" size={18} aria-hidden />
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <JsonLd data={webPageJsonLd({ title: SEO.title, description: SEO.description, path: PATH, locale })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: localizedUrl('/', locale) },
          { name: 'Services', url: localizedUrl(PATH, locale) },
        ])}
      />
    </main>
  )
}
