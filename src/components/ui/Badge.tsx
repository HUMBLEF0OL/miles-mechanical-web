import { cn } from '@/lib/utils/cn'
import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'alarm' | 'ember'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: 'bg-inset text-sub',
  info: 'bg-primary-tint text-primary-ink',
  success: 'bg-success-tint text-success',
  warning: 'bg-warning-tint text-warning',
  alarm: 'bg-alarm-tint text-alarm-ink',
  ember: 'bg-ember-tint text-ember',
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-control inline-flex items-center px-2.5 py-0.5 text-xs font-semibold',
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
