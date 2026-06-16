import { cn } from '@/lib/utils/cn'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, className, id, ...props },
  ref
) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
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
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        {...props}
      />

      {hint && !error && (
        <p id={`${textareaId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${textareaId}-error`} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
})
