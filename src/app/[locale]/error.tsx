'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error boundary for routes under `[locale]`. Renders inside the locale layout's
 * `<html>`/`<body>`, so it returns only page content. Root-layout errors are
 * handled by `app/global-error.tsx`.
 */
export default function LocaleError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-6xl font-bold text-gray-200 dark:text-gray-700">500</p>
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
  )
}
