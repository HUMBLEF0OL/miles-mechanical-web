import { routes, seoRoutes } from '@/config'
import type { SeoRouteKey } from '@/config'

/**
 * Normalized descriptor shape. Declared concretely (not via indexed access of
 * the `seoRoutes` literal) so it stays a single object type — once `seoRoutes`
 * has more than one key, `(typeof seoRoutes)[SeoRouteKey]` is a union and can't
 * be `extend`ed. Mirrors the descriptor in `src/config/routes.ts`.
 */
interface SeoDescriptor {
  indexable: boolean
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  lastModified: string
}

export interface PublicRoute extends SeoDescriptor {
  key: SeoRouteKey
  /** Locale-agnostic path from `routes`, e.g. `/`. */
  path: string
}

/**
 * Public, indexable routes — the shared input for `sitemap.ts`, `llms.txt`, and
 * the public side of `robots.ts`. Derived from `seoRoutes` (which is keyed off
 * `routes`), so these surfaces never drift from the route map.
 */
export function publicRoutes(): PublicRoute[] {
  return (Object.keys(seoRoutes) as SeoRouteKey[])
    .filter((key) => seoRoutes[key].indexable)
    .map((key) => ({ key, path: routes[key], ...seoRoutes[key] }))
}

/**
 * Paths that must NOT be indexed: every `routes` entry that is not a public
 * route and is not the home path. Used to build robots `disallow` rules.
 */
export function privatePaths(): string[] {
  const publicKeys = new Set<string>(Object.keys(seoRoutes))
  return Object.entries(routes)
    .filter(([key, path]) => !publicKeys.has(key) && path !== '/')
    .map(([, path]) => path)
}
