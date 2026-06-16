'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { ReviewCard } from '@/components/marketing/ReviewCard'
import type { Review } from '@/content'

export interface ReviewsGalleryProps {
  reviews: Review[]
  className?: string
}

/**
 * ReviewsGallery — the §10 reviews list with category filter tabs
 * (All / AC / Heating / Install, per the hi-fi). Each tab matches against a
 * review's `service` tag; "All" shows the full curated set. Client component
 * because the filter is interactive; the review data is passed in from the
 * server page so the content stays in the data layer.
 */
const FILTERS: { label: string; match: (service?: string) => boolean }[] = [
  { label: 'All', match: () => true },
  { label: 'AC', match: (service) => Boolean(service?.startsWith('AC')) },
  { label: 'Heating', match: (service) => service === 'Heating' },
  { label: 'Install', match: (service) => service === 'Install' },
]

export function ReviewsGallery({ reviews, className }: ReviewsGalleryProps) {
  const [active, setActive] = useState(0)

  const visible = useMemo(() => {
    const filter = FILTERS[active] ?? FILTERS[0]!
    return reviews.filter((review) => filter.match(review.service))
  }, [reviews, active])

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filter tabs */}
      <div role="group" aria-label="Filter reviews by service" className="flex flex-wrap gap-2">
        {FILTERS.map((filter, index) => {
          const selected = index === active
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(index)}
              className={cn(
                'min-h-10 rounded-control px-4 py-2 font-sans text-sm font-semibold transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                selected
                  ? 'bg-primary text-white'
                  : 'border border-line bg-card text-sub hover:border-primary hover:text-primary',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Filtered grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((review) => (
            <ReviewCard
              key={`${review.author}-${review.city}`}
              quote={review.quote}
              author={review.author}
              city={review.city}
              initial={review.initial}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-card border border-line bg-subtle p-8 text-center font-sans text-sm text-muted">
          No reviews in this category yet — try “All”.
        </p>
      )}
    </div>
  )
}
