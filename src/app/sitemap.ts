import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config'
import { localizedUrl, publicRoutes } from '@/lib/seo'

/**
 * One sitemap entry per (public indexable route × locale), each carrying
 * `alternates.languages` (hreflang incl. `x-default`). `lastModified` is a
 * stable per-route date from `seoRoutes` — never `new Date()` (G11).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes().flatMap((route) =>
    siteConfig.locales.map((locale) => {
      const languages: Record<string, string> = {}
      for (const l of siteConfig.locales) {
        languages[l] = localizedUrl(route.path, l)
      }
      languages['x-default'] = localizedUrl(route.path, siteConfig.defaultLocale)

      return {
        url: localizedUrl(route.path, locale),
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      }
    })
  )
}
