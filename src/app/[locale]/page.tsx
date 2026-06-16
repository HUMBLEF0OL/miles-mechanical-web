import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata, JsonLd, webPageJsonLd } from '@/lib/seo'
import {
  Hero,
  ServiceCard,
  ReviewCard,
  TrustBar,
  EmergencyCTA,
} from '@/components/marketing'
import { CredentialBadge, Icon } from '@/components/ui'
import { business } from '@/config/business'
import {
  pages,
  services,
  featuredReviews,
  areas,
  credentials,
} from '@/content'

const SEO_TITLE = pages.home.seo.title
const SEO_DESC = pages.home.seo.description
const PATH = '/'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ title: SEO_TITLE, description: SEO_DESC, path: PATH, locale })
}

/** Eyebrow + H2 section heading with the on-brand ember bar motif. */
function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string
  title: string
  /** Applied to the <h2> so a section can reference it via aria-labelledby. */
  id?: string
}) {
  return (
    <div className="mb-8">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-mm-ember-600 sm:text-sm">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 font-display text-3xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-3 h-1 w-16 bg-mm-ember-600" aria-hidden="true" />
    </div>
  )
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="container-page space-y-16 py-12 sm:space-y-20 sm:py-16">
      {/* 1 — Hero (above-the-fold CTAs, FR-CR-1) */}
      <Hero />

      {/* 2 — Trust strip (FR-RV-1) */}
      <TrustBar href="/reviews" />

      {/* 3 — Services grid (FR-CR-2) */}
      <section aria-labelledby="services-heading">
        <SectionHeading id="services-heading" eyebrow="What we do" title="Our services" />
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

      {/* 4 — Emergency band (FR-LC-4, the one reserved alarm-red use) */}
      <EmergencyCTA />

      {/* 5 — Reviews preview (FR-RV-2) */}
      <section aria-labelledby="reviews-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionHeading
              id="reviews-heading"
              eyebrow="The reputation is the product"
              title="What your neighbours say"
            />
          </div>
          <Link
            href="/reviews"
            className="mb-8 inline-flex items-center gap-1.5 rounded-control text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Read all reviews &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <ReviewCard
              key={review.author}
              quote={review.quote}
              author={review.author}
              city={review.city}
              initial={review.initial}
            />
          ))}
        </div>
      </section>

      {/* 6 — Service areas (header nav links to /#service-areas) */}
      <section id="service-areas" aria-labelledby="areas-heading">
        <SectionHeading id="areas-heading" eyebrow="Texans serving Texans" title="Areas we serve" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group flex flex-col rounded-card border border-line bg-card p-6 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-control bg-primary-tint text-primary-ink">
                <Icon name="truck" size={26} aria-hidden />
              </div>
              <h3 className="font-sans text-lg font-bold text-heading">{area.city}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sub">
                {area.localAngle}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                HVAC in {area.city} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7 — Credentials row (FR-RV-3) */}
      <section aria-label="Credentials and trust signals">
        <ul className="flex flex-wrap gap-3">
          {credentials.map((label) => (
            <li key={label}>
              <CredentialBadge label={label} />
            </li>
          ))}
        </ul>
      </section>

      {/* 8 — Final CTA band */}
      <section
        aria-labelledby="final-cta-heading"
        className="flex flex-wrap items-center justify-between gap-6 rounded-card bg-subtle px-8 py-10 sm:px-10"
      >
        <div className="min-w-[260px] flex-1">
          <h2
            id="final-cta-heading"
            className="font-display text-3xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-4xl"
          >
            Ready when you are.
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-sub">
            Family-owned in the {business.region} for {business.yearsExperience}+ years.
            Fair pricing, licensed work, and a real person on the phone.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-control bg-primary px-8 font-sans text-lg font-semibold text-white transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Icon name="schedule" size={20} aria-hidden />
            Request service
          </Link>
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-primary px-8 font-sans text-lg font-semibold text-primary transition-colors hover:bg-primary-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Icon name="phone" size={18} aria-hidden />
            Call {business.phoneDisplay}
          </a>
        </div>
      </section>

      <JsonLd
        data={webPageJsonLd({ title: SEO_TITLE, description: SEO_DESC, path: PATH, locale })}
      />
    </main>
  )
}
