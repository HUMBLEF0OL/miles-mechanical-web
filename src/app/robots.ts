import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config'
import { privatePaths } from '@/lib/seo'

// AI crawlers gated by siteConfig.ai.allowCrawlers. When false they get
// `disallow: '/'`; when true they inherit the same public/private split as `*`.
const AI_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  // Disallow each private path both bare and locale-prefixed (crawlers see the
  // locale-prefixed form, e.g. /en/login).
  const disallow = privatePaths().flatMap((path) => [
    path,
    ...siteConfig.locales.map((locale) => `/${locale}${path}`),
  ])

  const aiRules = AI_USER_AGENTS.map((userAgent) =>
    siteConfig.ai.allowCrawlers ? { userAgent, allow: '/', disallow } : { userAgent, disallow: '/' }
  )

  return {
    rules: [{ userAgent: '*', allow: '/', disallow }, ...aiRules],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
