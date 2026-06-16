import { cn } from '@/lib/utils/cn'
import { forwardRef, type SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, className, id, children, ...props },
  ref
) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="font-sans text-sm font-semibold text-heading">
          {label}
          {props.required && <span className="ml-1 text-alarm">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-12 w-full appearance-none rounded-control border-[1.5px] bg-input pl-3.5 pr-10 font-sans text-base text-heading transition-colors',
            'focus:outline-none',
            error
              ? 'border-alarm focus:border-alarm focus:ring-[3px] focus:ring-alarm/15'
              : 'border-input-border focus:border-primary focus:ring-[3px] focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {children}
        </select>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {hint && !error && (
        <p id={`${selectId}-hint`} className="font-sans text-xs text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${selectId}-error`} role="alert" className="font-sans text-xs font-medium text-alarm">
          {error}
        </p>
      )}
    </div>
  )
})
