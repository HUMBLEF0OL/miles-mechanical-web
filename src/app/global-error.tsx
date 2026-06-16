'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/config'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Catches errors thrown in the root layout itself. It REPLACES the root layout,
 * so — like every `global-error` boundary — it must render its own
 * `<html>`/`<body>`. In-locale errors are handled by `[locale]/error.tsx`.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
  }, [error])

  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl font-bold text-gray-200">500</p>
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-muted">An unexpected error occurred. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            className="bg-brand-500 hover:bg-brand-600 mt-2 rounded-md px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
