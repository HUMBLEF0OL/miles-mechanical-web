import Link from 'next/link'
import { siteConfig } from '@/config'

/**
 * Root 404. Because the root layout is a pass-through (no `<html>`/`<body>` —
 * those live in `[locale]/layout.tsx`), this catch-all for non-localized
 * requests must render its own document shell.
 */
export default function NotFound() {
  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl font-bold text-gray-200">404</p>
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="bg-brand-500 hover:bg-brand-600 mt-2 rounded-md px-4 py-2 text-sm font-medium text-white"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  )
}
