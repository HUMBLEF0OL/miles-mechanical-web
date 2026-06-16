import { siteConfig } from '@/config'
import { localizedUrl, publicRoutes } from '@/lib/seo'
import { services, areas } from '@/content'

/**
 * `/llms.txt` — the GEO (Generative Engine Optimization) centerpiece. Follows
 * the llms.txt convention: an H1 site name, a blockquote summary, then `##`
 * sections of key links. Derived from `seoRoutes`, so it never drifts from the
 * route map. Served as text/plain and excluded from intl routing by the proxy
 * matcher's dot-path rule.
 */
export const dynamic = 'force-static'

function labelFor(key: string): string {
  if (key === 'home') return 'Home'
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
}

export function GET(): Response {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## Pages',
    '',
    ...publicRoutes().map(
      (route) => `- [${labelFor(route.key)}](${localizedUrl(route.path, siteConfig.defaultLocale)})`
    ),
    '',
    '## Services',
    '',
    ...services.map(
      (service) =>
        `- [${service.title}](${localizedUrl(`/services/${service.slug}`, siteConfig.defaultLocale)})`
    ),
    '',
    '## Service areas',
    '',
    ...areas.map(
      (area) => `- [${area.city}](${localizedUrl(`/areas/${area.slug}`, siteConfig.defaultLocale)})`
    ),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
