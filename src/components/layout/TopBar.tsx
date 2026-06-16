import { business } from '@/config/business'
import { cn } from '@/lib/utils/cn'

export interface TopBarProps {
  className?: string
}

/**
 * TopBar — thin announcement strip above the header (§10).
 * Left: service-area line. Right: business hours + a 24/7 emergency callout.
 */
export function TopBar({ className }: TopBarProps) {
  return (
    <div
      className={cn(
        'bg-mm-blue-900 text-mm-blue-200 text-sm',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <span className="truncate">
          {business.areas.join(' · ')} &amp; surrounding
        </span>
        <span className="hidden items-center gap-4 sm:inline-flex">
          <span>{business.hoursDisplay}</span>
          <span className="font-bold text-mm-ember-300">
            {business.emergency} emergency
          </span>
        </span>
      </div>
    </div>
  )
}
