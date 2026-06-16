import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildMetadata, JsonLd, webPageJsonLd } from '@/lib/seo'
import { business } from '@/config/business'
import { pages, reviews, credentials, googleReviewsUrl } from '@/content'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { RatingStars } from '@/components/ui/RatingStars'
import { CredentialBadge } from '@/components/ui/CredentialBadge'
import { ReviewCard } from '@/components/marketing'

const PATH = '/reviews'
const SEO = pages.reviews.seo
const HERO = pages.reviews.hero

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ title: SEO.title, description: SEO.description, path: PATH, locale })
}

export default async function ReviewsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="container-page space-y-16 py-12 sm:space-y-20 sm:py-16">
      {/* ── 1. Aggregate hero (FR-RV-1) ─────────────────────────────────── */}
      <section
        aria-labelledby="reviews-heading"
        className="relative grid grid-cols-1 overflow-hidden rounded-card bg-hero lg:grid-cols-[1.1fr_1fr]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[28%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--color-mm-ember-500)_0%,transparent_65%)] opacity-20"
        />

        {/* Left: eyebrow + headline + subcopy */}
        <div className="relative px-7 py-12 text-hero-ink sm:px-11 sm:py-14">
          {HERO.eyebrow && (
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-mm-ember-300 sm:text-sm">
              {HERO.eyebrow}
            </p>
          )}

          <h1
            id="reviews-heading"
            className="font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl"
          >
            {HERO.headline}
          </h1>

          <p className="mt-5 max-w-[48ch] font-sans text-lg leading-relaxed text-hero-body">
            {HERO.subcopy}
          </p>
        </div>

        {/* Right: aggregate rating proof panel */}
        <div className="relative flex flex-col justify-center gap-5 overflow-hidden border-t border-hero-line bg-gradient-to-br from-hero-strong to-hero px-10 py-12 lg:border-l lg:border-t-0">
          <Logo
            variant="mark-no-badge"
            tone="dark"
            size={220}
            decorative
            className="pointer-events-none absolute -bottom-10 -right-8 opacity-[0.12]"
          />

          <div className="relative flex items-baseline gap-3">
            <span className="font-display text-7xl font-black leading-none text-hero-ink">
              {business.rating}
            </span>
            <RatingStars size="text-2xl" />
          </div>

          <p className="relative font-sans text-base font-semibold text-hero-body">
            {business.reviewCount} Google reviews · rated {business.rating} out of 5
          </p>

          <div className="relative h-px bg-hero-line" aria-hidden />

          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex w-fit items-center gap-1.5 font-sans text-sm font-semibold text-mm-ember-300 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Icon name="reviews" size={16} aria-hidden />
            Verified on Google
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {/* ── 2. Curated testimonials (FR-RV-2) ───────────────────────────── */}
      <section aria-labelledby="testimonials-heading" className="space-y-8">
        <div>
          <h2
            id="testimonials-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-3xl"
          >
            What your neighbours say
          </h2>
          <div className="mt-3 h-1 w-16 bg-ember" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={`${review.author}-${review.city}`}
              quote={review.quote}
              author={review.author}
              city={review.city}
              initial={review.initial}
            />
          ))}
        </div>

        {/* ── 3. See all on Google (FR-RV-4) ──────────────────────────── */}
        <div className="flex justify-center pt-2">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-primary bg-page px-8 font-sans text-lg font-semibold text-primary transition-colors hover:bg-primary-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Icon name="reviews" size={20} aria-hidden />
            See all reviews on Google ↗
          </a>
        </div>
      </section>

      {/* ── 4. Credential strip (FR-RV-3) + Request service CTA ─────────── */}
      <section
        aria-labelledby="trust-cta-heading"
        className="rounded-card border border-line-soft bg-primary-tint px-7 py-10 sm:px-11 sm:py-12"
      >
        <h2
          id="trust-cta-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-primary-ink sm:text-3xl"
        >
          Backed by more than reviews
        </h2>
        <div className="mt-3 h-1 w-16 bg-ember" aria-hidden />

        <ul className="mt-7 flex flex-wrap gap-3">
          {credentials.map((label) => (
            <li key={label}>
              <CredentialBadge label={label} />
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-control bg-primary px-8 font-sans text-lg font-semibold text-white transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
          >
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
        data={webPageJsonLd({
          title: SEO.title,
          description: SEO.description,
          path: PATH,
          locale,
        })}
      />
    </main>
  )
}
