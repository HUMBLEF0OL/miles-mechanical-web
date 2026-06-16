import { cn } from '@/lib/utils/cn'
import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'alarm' | 'ember'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: 'bg-mm-steel-100 text-mm-steel-700',
  info: 'bg-mm-blue-100 text-mm-blue-700',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  alarm: 'bg-alarm/10 text-alarm',
  ember: 'bg-mm-ember-100 text-mm-ember-700',
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
