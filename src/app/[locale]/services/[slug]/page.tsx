import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import {
  buildMetadata,
  JsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  localizedUrl,
} from '@/lib/seo'
import { getService, serviceSlugs, areas } from '@/content'
import { business } from '@/config/business'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { LeadForm } from '@/components/marketing/LeadForm'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const service = getService(slug)
  if (!service) notFound()
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${slug}`,
    locale,
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const service = getService(slug)
  if (!service) notFound()

  const path = `/services/${slug}`
  const isEmergency = Boolean(service.emergency)

  // Hero accent tints: emergency overrides accent; otherwise blue ('cool') vs ember ('heat').
  const tileClasses = isEmergency
    ? 'bg-alarm text-white'
    : service.accent === 'heat'
      ? 'bg-mm-ember-100 text-mm-ember-600'
      : 'bg-mm-blue-100 text-mm-blue-600'
  const eyebrowClasses = isEmergency ? 'text-alarm-300' : 'text-mm-ember-300'
  const checkAccent = isEmergency
    ? 'text-alarm'
    : service.accent === 'heat'
      ? 'text-mm-ember-600'
      : 'text-mm-blue-600'

  return (
    <main className="container-page space-y-16 py-12 sm:space-y-20 sm:py-16">
      {/* 1 ─ Breadcrumb ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-sans text-sm text-mm-steel-500">
          <li>
            <Link
              href={`/${locale}`}
              className="rounded-control hover:text-mm-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-mm-steel-300">
            /
          </li>
          <li>
            <Link
              href={`/${locale}/services`}
              className="rounded-control hover:text-mm-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Services
            </Link>
          </li>
          <li aria-hidden className="text-mm-steel-300">
            /
          </li>
          <li aria-current="page" className="font-semibold text-heading">
            {service.title}
          </li>
        </ol>
      </nav>

      {/* 2 ─ Service hero ───────────────────────────────────────────────── */}
      <section
        aria-labelledby="service-hero-heading"
        className="relative overflow-hidden rounded-card bg-mm-blue-900 px-7 py-12 text-white sm:px-11 sm:py-14"
      >
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute -top-24 right-[20%] h-80 w-80 rounded-full opacity-20',
            isEmergency
              ? 'bg-[radial-gradient(circle,var(--color-alarm)_0%,transparent_65%)]'
              : 'bg-[radial-gradient(circle,var(--color-mm-ember-500)_0%,transparent_65%)]',
          )}
        />

        <div className="relative max-w-[52ch]">
          <div
            className={cn(
              'mb-5 flex size-14 items-center justify-center rounded-control',
              tileClasses,
            )}
          >
            <Icon name={service.icon} size={30} aria-hidden />
          </div>

          <p
            className={cn(
              'font-sans text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm',
              eyebrowClasses,
            )}
          >
            {service.heroEyebrow}
          </p>

          <h1
            id="service-hero-heading"
            className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl"
          >
            {service.heroHeadline}
          </h1>

          <p className="mt-5 max-w-[46ch] font-sans text-lg leading-relaxed text-mm-blue-200">
            {service.heroSubcopy}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className="inline-flex">
              <Button variant={isEmergency ? 'emergency' : 'primary'} size="lg">
                Get a quote
              </Button>
            </Link>

            {/* Outline tel CTA — real anchor for click-to-call semantics. */}
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
      </section>

      {/* 3 ─ What's included ────────────────────────────────────────────── */}
      <section aria-labelledby="included-heading" className="space-y-6">
        <div>
          <h2
            id="included-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900 sm:text-3xl"
          >
            What&apos;s included
          </h2>
          <div className="mt-3 h-1 w-16 bg-mm-ember-600" aria-hidden />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-card border border-line bg-page p-5 shadow-e1"
            >
              <Icon
                name="check"
                size={22}
                className={cn('mt-0.5 shrink-0', checkAccent)}
                aria-hidden
              />
              <span className="font-sans text-[15px] leading-relaxed text-mm-steel-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 ─ How it works · 1-2-3 ───────────────────────────────────────── */}
      <section aria-labelledby="process-heading" className="space-y-6">
        <div>
          <h2
            id="process-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900 sm:text-3xl"
          >
            How it works
          </h2>
          <div className="mt-3 h-1 w-16 bg-mm-ember-600" aria-hidden />
        </div>

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {service.process.map((step) => (
            <li
              key={step.step}
              className="flex flex-col rounded-card border border-line bg-page p-6 shadow-e1"
            >
              <span
                className={cn(
                  'mb-4 flex size-11 items-center justify-center rounded-control font-display text-xl font-black',
                  tileClasses,
                )}
                aria-hidden
              >
                {step.step}
              </span>
              <h3 className="mb-2 font-sans text-lg font-bold text-heading">{step.title}</h3>
              <p className="text-sm leading-relaxed text-sub">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5 ─ FAQ accordion (native details/summary — no client JS) ───────── */}
      <section aria-labelledby="faq-heading" className="space-y-6">
        <div>
          <h2
            id="faq-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900 sm:text-3xl"
          >
            Frequently asked
          </h2>
          <div className="mt-3 h-1 w-16 bg-mm-ember-600" aria-hidden />
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-card border border-line bg-page shadow-e1 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card p-5 font-sans text-base font-semibold text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
                {faq.question}
                <Icon
                  name="chevron-down"
                  size={20}
                  className="shrink-0 text-mm-steel-500 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="px-5 pb-5 font-sans text-[15px] leading-relaxed text-sub">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 6 ─ Inline lead form ───────────────────────────────────────────── */}
      <section aria-label="Request service">
        <LeadForm />
      </section>

      {/* 7 ─ We serve footer block ──────────────────────────────────────── */}
      <section
        aria-labelledby="areas-heading"
        className="rounded-card border border-line bg-subtle p-8 sm:p-10"
      >
        <h2
          id="areas-heading"
          className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em] text-mm-blue-900"
        >
          We serve the {business.region}
        </h2>
        <p className="mt-3 max-w-[60ch] font-sans text-[15px] leading-relaxed text-mm-steel-700">
          {service.title} across the metro — we come to you. Find your city:
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/${locale}/areas/${area.slug}`}
                className="inline-flex items-center gap-2 rounded-control border-[1.5px] border-mm-blue-600 px-5 py-2.5 font-sans text-sm font-semibold text-mm-blue-600 transition-colors hover:bg-mm-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <Icon name="truck" size={16} aria-hidden />
                {area.city}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={[
          webPageJsonLd({
            title: service.seoTitle,
            description: service.seoDescription,
            path,
            locale,
          }),
          breadcrumbJsonLd([
            { name: 'Home', url: localizedUrl('/', locale) },
            { name: 'Services', url: localizedUrl('/services', locale) },
            { name: service.title, url: localizedUrl(path, locale) },
          ]),
          faqJsonLd(service.faqs),
        ]}
      />
    </main>
  )
}
