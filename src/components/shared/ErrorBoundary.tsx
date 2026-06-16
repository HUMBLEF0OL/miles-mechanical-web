'use client'

import { Component, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui'

interface ErrorBoundaryProps {
  className?: string
  children: ReactNode
  fallback?: ReactNode
}

interface ImplProps extends ErrorBoundaryProps {
  resetKey: number
  onReset: () => void
  onCatch: (error: Error, info: ErrorInfo) => void
}

interface ImplState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryImpl extends Component<ImplProps, ImplState> {
  state: ImplState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ImplState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onCatch(error, info)
  }

  componentDidUpdate(prev: ImplProps) {
    if (prev.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null })
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div
        className={cn(
          'flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center',
          this.props.className
        )}
      >
        <h2 className="text-heading text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted max-w-md text-sm">
          An unexpected error occurred. Please try again.
        </p>
        {process.env.NODE_ENV === 'development' && this.state.error && (
          <pre className="bg-subtle text-danger mt-2 max-w-lg overflow-auto rounded-lg p-4 text-left text-xs">
            {this.state.error.message}
          </pre>
        )}
        <Button variant="secondary" size="sm" onClick={this.props.onReset}>
          Try again
        </Button>
      </div>
    )
  }
}

export function ErrorBoundary({ children, fallback, className }: ErrorBoundaryProps) {
  const [resetKey, setResetKey] = useState(0)

  function handleCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  return (
    <ErrorBoundaryImpl
      resetKey={resetKey}
      onReset={() => setResetKey((k) => k + 1)}
      onCatch={handleCatch}
      fallback={fallback}
      className={className}
    >
      {children}
    </ErrorBoundaryImpl>
  )
}
