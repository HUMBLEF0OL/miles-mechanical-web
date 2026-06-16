import { cn } from '@/lib/utils/cn'
import { Card, RatingStars } from '@/components/ui'

interface ReviewCardProps {
  quote: string
  author: string
  city: string
  initial: string
  className?: string
}

export function ReviewCard({ quote, author, city, initial, className }: ReviewCardProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <RatingStars className="mb-3.5" />
      <p className="text-sub mb-[18px] flex-1 text-[15px] leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="bg-primary-tint text-primary-ink rounded-control flex size-[38px] flex-none items-center justify-center text-sm font-bold"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-heading font-semibold leading-tight">{author}</p>
          <p className="text-muted mt-0.5 text-xs leading-tight">{city}</p>
        </div>
      </div>
    </Card>
  )
}
