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
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="font-sans text-sm font-semibold text-mm-steel-800">
          {label}
          {props.required && <span className="ml-1 text-alarm">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        className={cn(
          'h-12 w-full rounded-control border-[1.5px] bg-page px-3.5 font-sans text-base text-heading transition-colors',
          'placeholder:text-mm-steel-400',
          'focus:outline-none',
          error
            ? 'border-alarm focus:border-alarm focus:ring-[3px] focus:ring-alarm/15'
            : 'border-mm-steel-300 focus:border-mm-blue-600 focus:ring-[3px] focus:ring-mm-blue-600/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />

      {hint && !error && (
        <p id={`${inputId}-hint`} className="font-sans text-xs text-mm-steel-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} role="alert" className="font-sans text-xs font-medium text-alarm">
          {error}
        </p>
      )}
    </div>
  )
})
