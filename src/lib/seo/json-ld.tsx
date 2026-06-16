import { siteConfig } from '@/config'
import { localizedUrl } from './metadata'

/**
 * Typed schema.org JSON-LD builders. Each returns a plain object and sets
 * `inLanguage` + a stable `@id` so identities stay correct across locales.
 * Render the result with `<JsonLd data={…} />`.
 */

type JsonLdObject = Record<string, unknown>

const absolute = (path: string): string => `${siteConfig.url.replace(/\/+$/, '')}${path}`

/** Organization — sitewide identity. Stable `@id` lets other nodes reference it. */
export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.organization.name,
    url: siteConfig.url,
    logo: absolute(siteConfig.organization.logo),
    ...(siteConfig.organization.sameAs.length > 0
      ? { sameAs: siteConfig.organization.sameAs }
      : {}),
  }
}

/** WebSite — sitewide, includes a SearchAction for sitelinks search box. */
export function websiteJsonLd(locale: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale,
    publisher: { '@id': `${siteConfig.url}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${localizedUrl('/search', locale)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export interface WebPageJsonLdInput {
  title: string
  description: string
  path: string
  locale: string
}

/** WebPage — per page, references the sitewide WebSite via `@id`. */
export function webPageJsonLd({
  title,
  description,
  path,
  locale,
}: WebPageJsonLdInput): JsonLdObject {
  const url = localizedUrl(path, locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { '@id': `${siteConfig.url}#website` },
  }
}

export interface BreadcrumbItem {
  name: string
  /** Locale-prefixed absolute URL (e.g. from `localizedUrl`). */
  url: string
}

/** BreadcrumbList — ordered trail; pass items already resolved to absolute URLs. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export interface ArticleJsonLdInput {
  title: string
  description: string
  path: string
  locale: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image?: string
}

/** Article — for blog posts / news. References Organization as publisher. */
export function articleJsonLd(input: ArticleJsonLdInput): JsonLdObject {
  const { title, description, path, locale, datePublished, dateModified, authorName, image } = input
  const url = localizedUrl(path, locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    inLanguage: locale,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(authorName ? { author: { '@type': 'Person', name: authorName } } : {}),
    ...(image ? { image: [image] } : {}),
    publisher: { '@id': `${siteConfig.url}#organization` },
  }
}

export interface FaqEntry {
  question: string
  answer: string
}

/** FAQPage — strong GEO signal; answers surface directly to AI engines. */
export function faqJsonLd(entries: FaqEntry[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }
}

/**
 * Escape characters that could break out of a `<script>` context. `<`/`>`
 * prevent `</script>` injection; `&` keeps entity sequences literal.
 */
function sanitize(json: string): string {
  return json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

/** Server component: render a sanitized `<script type="application/ld+json">`. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON is sanitized via `sanitize` above (escapes <, >, & to block injection).
      dangerouslySetInnerHTML={{ __html: sanitize(JSON.stringify(data)) }}
    />
  )
}
