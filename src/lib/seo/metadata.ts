import type { Metadata } from 'next'
import { siteConfig } from '@/config'

type Locale = (typeof siteConfig.locales)[number]

export interface BuildMetadataOptions {
  /** Page title (localized by the caller). Combined with the site name via the
   *  `%s | {name}` template applied in the root layout — pass the bare title. */
  title: string
  /** Page description (localized by the caller). */
  description: string
  /** Route path without locale prefix, e.g. `/` or `/blog`. */
  path: string
  /** Active locale for this render. */
  locale: string
  /** Absolute or root-relative social-card image. Defaults to siteConfig.ogImage. */
  image?: string
  /** Open Graph type — `website` (default) or `article`. */
  type?: 'website' | 'article'
  /** When true, emit `robots: { index: false, follow: false }`. */
  noindex?: boolean
}

/** Normalize a path against the trailing-slash policy. Root (`/`) is preserved. */
function normalizePath(path: string): string {
  if (path === '/') return ''
  const trimmed = path.replace(/\/+$/, '')
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return siteConfig.trailingSlash ? `${withSlash}/` : withSlash
}

/** Locale-prefixed absolute URL for a route path. */
export function localizedUrl(path: string, locale: string): string {
  const base = siteConfig.url.replace(/\/+$/, '')
  return `${base}/${locale}${normalizePath(path)}`
}

/** `alternates.languages` map: one entry per locale plus `x-default` → default locale. */
function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of siteConfig.locales) {
    languages[locale] = localizedUrl(path, locale)
  }
  languages['x-default'] = localizedUrl(path, siteConfig.defaultLocale)
  return languages
}

/**
 * Build a locale-correct Next `Metadata` object: canonical (self-referencing,
 * trailing-slash-normalized), hreflang alternates incl. `x-default`, Open Graph
 * with locale/alternateLocale, a `summary_large_image` Twitter card, and robots
 * index control. Use this inside `generateMetadata` in every `page.tsx`.
 */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const { title, description, path, locale, image, type = 'website', noindex = false } = options

  const canonical = localizedUrl(path, locale)
  const ogLocale =
    siteConfig.ogLocaleMap[locale as Locale] ?? siteConfig.ogLocaleMap[siteConfig.defaultLocale]
  const alternateLocale = siteConfig.locales
    .filter((l) => l !== locale)
    .map((l) => siteConfig.ogLocaleMap[l as Locale])
  const ogImage = image ?? siteConfig.ogImage

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: ogLocale,
      alternateLocale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
