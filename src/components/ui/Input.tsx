import { cn } from '@/lib/utils/cn'
import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm transition-colors',
          'placeholder:text-gray-400',
          'focus:ring-2 focus:ring-offset-1 focus:outline-none',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'focus:border-brand-500 focus:ring-brand-500 border-gray-300 dark:border-gray-600 dark:bg-slate-800',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />

      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
})
