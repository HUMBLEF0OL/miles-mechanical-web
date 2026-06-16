import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { buildMetadata, JsonLd, webPageJsonLd } from '@/lib/seo'
import { business } from '@/config/business'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { CredentialBadge } from '@/components/ui/CredentialBadge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { credentials, values, timeline, owner, pages } from '@/content'

const PATH = '/about'
const SEO_TITLE = pages.about.seo.title
const SEO_DESC = pages.about.seo.description
const { eyebrow, headline, subcopy } = pages.about.hero

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ title: SEO_TITLE, description: SEO_DESC, path: PATH, locale })
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="container-page py-12 sm:py-16">
      <JsonLd data={webPageJsonLd({ title: SEO_TITLE, description: SEO_DESC, path: PATH, locale })} />

      {/* ── 1. Page hero ───────────────────────────────────────────────── */}
      <section aria-labelledby="about-heading" className="max-w-3xl">
        {eyebrow ? (
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ember sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1
          id="about-heading"
          className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-heading sm:text-5xl"
        >
          {headline}
        </h1>
        <p className="mt-5 max-w-[52ch] font-sans text-lg leading-relaxed text-sub">
          {subcopy}
        </p>
      </section>

      {/* ── 2. Owner story (FR-RV-5) ───────────────────────────────────── */}
      <section
        aria-labelledby="owner-heading"
        className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12"
      >
        {/* Owner visual — degrades to the M monogram when photo is null */}
        <figure className="flex flex-col items-center gap-4 rounded-card border border-hero-line bg-hero px-8 py-12 text-center">
          {owner.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={owner.photo}
              alt={`${owner.name}, ${owner.role}`}
              className="h-40 w-40 rounded-card object-cover"
            />
          ) : (
            <span
              className="flex h-40 w-40 items-center justify-center rounded-card border border-dashed border-hero-line bg-white/5"
              aria-hidden
            >
              <Logo variant="mark" tone="dark" size={96} />
            </span>
          )}
          <figcaption className="font-sans">
            <span className="block font-display text-xl font-extrabold uppercase tracking-[-0.01em] text-hero-ink">
              {owner.name}
            </span>
            <span className="mt-1 block text-sm font-semibold text-hero-muted">
              {owner.role}
            </span>
          </figcaption>
        </figure>

        <div>
          <h2
            id="owner-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-3xl"
          >
            The people who do the work
          </h2>
          <div aria-hidden className="mt-3 h-1 w-16 bg-ember" />
          <div className="mt-6 space-y-4">
            {owner.story.map((paragraph) => (
              <p key={paragraph} className="font-sans text-lg leading-relaxed text-sub">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Values ──────────────────────────────────────────────────── */}
      <section aria-labelledby="values-heading" className="mt-16 sm:mt-20">
        <h2
          id="values-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-3xl"
        >
          What we stand for
        </h2>
        <div aria-hidden className="mt-3 h-1 w-16 bg-ember" />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-control bg-primary-tint text-primary-ink"
                  aria-hidden
                >
                  <Icon name={value.icon} size={24} />
                </span>
                <CardTitle className="mt-4">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-sans text-[15px] leading-relaxed text-sub">{value.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 4. 20-year timeline ────────────────────────────────────────── */}
      <section aria-labelledby="timeline-heading" className="mt-16 sm:mt-20">
        <h2
          id="timeline-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-3xl"
        >
          Twenty years, in short
        </h2>
        <div aria-hidden className="mt-3 h-1 w-16 bg-ember" />
        <ol className="mt-8 space-y-0 border-l-2 border-line pl-8">
          {timeline.map((entry, index) => (
            <li key={entry.title} className={cn('relative', index !== timeline.length - 1 && 'pb-10')}>
              <span
                aria-hidden
                className="absolute -left-[2.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ember text-white"
              >
                <Icon name="check" size={14} />
              </span>
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                {entry.marker}
              </span>
              <h3 className="mt-1 font-display text-lg font-extrabold uppercase tracking-[-0.01em] text-heading">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-[60ch] font-sans leading-relaxed text-sub">{entry.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 5. Credentials (FR-RV-3) ───────────────────────────────────── */}
      <section aria-labelledby="credentials-heading" className="mt-16 sm:mt-20">
        <h2
          id="credentials-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-heading sm:text-3xl"
        >
          Licensed, insured, backed
        </h2>
        <div aria-hidden className="mt-3 h-1 w-16 bg-ember" />
        <div className="mt-8 flex flex-wrap gap-3">
          {credentials.map((label) => (
            <CredentialBadge key={label} label={label} />
          ))}
        </div>
      </section>

      {/* ── 6. CTA ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-cta-heading"
        className="mt-16 rounded-card bg-hero px-7 py-12 text-hero-ink sm:mt-20 sm:px-11"
      >
        <h2
          id="about-cta-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] sm:text-3xl"
        >
          Ready when you are
        </h2>
        <p className="mt-3 max-w-[48ch] font-sans text-lg leading-relaxed text-hero-body">
          Honest pricing, licensed work, a real person on the phone. Request service or call us
          direct.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact`}
            className={cn(
              'inline-flex h-14 items-center justify-center gap-2 rounded-control px-8',
              'bg-ember font-sans text-lg font-semibold text-white transition-colors hover:bg-ember-strong',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
            )}
          >
            Request service
          </Link>
          <a
            href={`tel:${business.phoneTel}`}
            className={cn(
              'inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-hero-line px-8',
              'font-sans text-lg font-semibold text-hero-ink transition-colors hover:bg-white/10',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
            )}
          >
            <Icon name="phone" size={18} aria-hidden />
            Call {business.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  )
}
