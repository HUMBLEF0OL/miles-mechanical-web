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
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-sans text-sm font-semibold text-heading"
        >
          {label}
          {props.required && <span className="ml-1 text-alarm">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'min-h-24 w-full resize-y rounded-control border-[1.5px] bg-input px-3.5 py-3 font-sans text-base leading-relaxed text-heading transition-colors',
          'placeholder:text-muted',
          'focus:outline-none',
          error
            ? 'border-alarm focus:border-alarm focus:ring-[3px] focus:ring-alarm/15'
            : 'border-input-border focus:border-primary focus:ring-[3px] focus:ring-primary/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        {...props}
      />

      {hint && !error && (
        <p id={`${textareaId}-hint`} className="font-sans text-xs text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${textareaId}-error`} role="alert" className="font-sans text-xs font-medium text-alarm">
          {error}
        </p>
      )}
    </div>
  )
})
