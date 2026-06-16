import { cn } from '@/lib/utils/cn'

interface RatingStarsProps {
  rating?: number
  count?: number
  size?: string
  className?: string
}

export function RatingStars({ rating, count, size = 'text-base', className }: RatingStarsProps) {
  const hasMeta = rating !== undefined || count !== undefined

  const meta = [
    rating !== undefined ? rating : null,
    count !== undefined ? `${count} reviews` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn('text-ember tracking-widest', size)}
        role="img"
        aria-label={
          rating !== undefined ? `${rating} out of 5 stars` : '5 out of 5 stars'
        }
      >
        {'★★★★★'}
      </span>
      {hasMeta && <span className="text-muted text-sm font-medium">{meta}</span>}
    </div>
  )
}
