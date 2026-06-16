import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config'
import { localizedUrl, publicRoutes } from '@/lib/seo'
import { serviceSlugs, areaSlugs } from '@/content'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

/** Stable lastModified for the content-driven children (never `new Date()`, G11). */
const CONTENT_LAST_MODIFIED = '2026-06-16'

/** Build one (path × locale) sitemap row set with hreflang alternates. */
function rowsFor(
  path: string,
  lastModified: string,
  changeFrequency: ChangeFrequency,
  priority: number
): MetadataRoute.Sitemap {
  return siteConfig.locales.map((locale) => {
    const languages: Record<string, string> = {}
    for (const l of siteConfig.locales) {
      languages[l] = localizedUrl(path, l)
    }
    languages['x-default'] = localizedUrl(path, siteConfig.defaultLocale)

    return {
      url: localizedUrl(path, locale),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }
  })
}

/**
 * One sitemap entry per (URL × locale), each carrying `alternates.languages`
 * (hreflang incl. `x-default`). Static routes come from `seoRoutes`; the
 * per-service and per-city pages are expanded from the content layer so the
 * sitemap never drifts as services/cities are added (FR-SA-3). `lastModified`
 * is always a stable date — never `new Date()` (G11).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRows = publicRoutes().flatMap((route) =>
    rowsFor(route.path, route.lastModified, route.changeFrequency, route.priority)
  )

  const serviceRows = serviceSlugs.flatMap((slug) =>
    rowsFor(`/services/${slug}`, CONTENT_LAST_MODIFIED, 'monthly', 0.8)
  )

  const areaRows = areaSlugs.flatMap((slug) =>
    rowsFor(`/areas/${slug}`, CONTENT_LAST_MODIFIED, 'monthly', 0.8)
  )

  return [...staticRows, ...serviceRows, ...areaRows]
}
