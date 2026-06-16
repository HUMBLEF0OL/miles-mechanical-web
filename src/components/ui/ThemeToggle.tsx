'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils/cn'

const emptySubscribe = () => () => {}

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // resolvedTheme reflects what's actually displayed (resolves "system" to the
  // real light/dark value) — so the icon and label are correct on first paint
  // regardless of the visitor's OS preference.
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    // Reserve layout space; aria-hidden so SR users don't see a dead control pre-hydration.
    return <div className={cn('size-9', className)} aria-hidden />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'text-muted hover:bg-subtle hover:text-heading inline-flex size-9 items-center justify-center rounded-control transition-colors',
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
