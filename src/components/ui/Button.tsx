import { cn } from '@/lib/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: ReactNode
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500',
  secondary:
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800',
  ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}
