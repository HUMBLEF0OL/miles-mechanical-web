import { cn } from '@/lib/utils/cn'
import { RatingStars } from '@/components/ui'
import { business } from '@/config/business'

interface TrustBarProps {
  href?: string
  className?: string
}

export function TrustBar({ href = '#', className }: TrustBarProps) {
  return (
    <div
      className={cn(
        'bg-subtle border-line rounded-card flex flex-wrap items-center gap-7 border px-8 py-7',
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display text-mm-blue-900 text-6xl font-black leading-none">
          {business.rating}
        </span>
        <div className="flex flex-col gap-1">
          <RatingStars size="text-xl" className="gap-0" />
          <span className="text-muted text-sm font-medium leading-none">
            {business.reviewCount} Google reviews
          </span>
        </div>
      </div>

      <div className="bg-line h-14 w-px" aria-hidden="true" />

      <p className="text-sub min-w-[240px] flex-1 text-base leading-relaxed">
        Out-rates the big corporate competitors in {business.areas[0]}. The reputation is the
        product &mdash; surface it everywhere.
      </p>

      <a
        href={href}
        className="text-mm-blue-600 rounded-control whitespace-nowrap text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Read all reviews &rarr;
      </a>
    </div>
  )
}
