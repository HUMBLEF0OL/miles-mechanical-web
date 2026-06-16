import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  return intlMiddleware(request)
}

export const config = {
  // The `.*\\..*` rule already excludes dotted files (robots.txt, sitemap.xml,
  // llms.txt, manifest.webmanifest). The dotless metadata image routes
  // (icon, apple-icon, opengraph-image) have no extension, so they are listed
  // explicitly — otherwise the intl middleware would locale-prefix them.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|.*\\..*).*)',
  ],
}
