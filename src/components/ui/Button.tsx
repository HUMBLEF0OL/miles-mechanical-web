import { cn } from '@/lib/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ember' | 'emergency'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  children: ReactNode
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-mm-blue-600 text-white hover:bg-mm-blue-700',
  secondary:
    'bg-page text-mm-blue-600 border-[1.5px] border-mm-blue-600 hover:bg-mm-blue-100',
  ghost: 'text-mm-blue-600 hover:bg-mm-blue-100',
  ember: 'bg-mm-ember-600 text-white hover:bg-mm-ember-700',
  emergency: 'bg-alarm text-white font-bold hover:bg-alarm-700',
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-control font-sans font-semibold',
        'transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:bg-mm-steel-100 disabled:text-mm-steel-400 disabled:border-transparent disabled:pointer-events-none',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
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
      ) : (
        leftIcon
      )}
      {children}
    </button>
  )
}
