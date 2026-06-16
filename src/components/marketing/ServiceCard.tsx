import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Card } from '@/components/ui'
import { Icon, type IconName } from '@/components/ui/Icon'

type ServiceAccent = 'cool' | 'heat'

export interface ServiceCardProps {
  /** Icon key from the §06 line-icon set. */
  iconName: IconName
  title: string
  description: string
  href: string
  /** Icon tile tint for non-emergency cards. Defaults to 'cool'. */
  accent?: ServiceAccent
  /** Renders the dark emergency variant with an alarm-tinted tile and a Call 24/7 link. */
  emergency?: boolean
}

const ACCENT_TILE: Record<ServiceAccent, string> = {
  cool: 'bg-primary-tint text-primary-ink',
  heat: 'bg-ember-tint text-ember',
}

/**
 * ServiceCard — §08 HVAC service card.
 *
 * A boxy card with a 48px rounded-control icon tile, a bold title, a muted
 * description, and a "Learn more →" link. The `emergency` variant switches the
 * whole card to the dark tone with an alarm-red tile (reserved for emergency
 * actions) and an ember "Call 24/7 →" link.
 */
export function ServiceCard({
  iconName,
  title,
  description,
  href,
  accent = 'cool',
  emergency = false,
}: ServiceCardProps) {
  const tileClasses = emergency ? 'bg-alarm text-white' : ACCENT_TILE[accent]
  const linkClasses = emergency
    ? 'text-ember font-bold'
    : 'text-primary font-semibold'

  return (
    <Card tone={emergency ? 'dark' : 'default'} className="flex flex-col">
      <div
        className={cn(
          'mb-[18px] flex size-12 items-center justify-center rounded-control',
          tileClasses,
        )}
      >
        <Icon name={iconName} size={26} />
      </div>
      <h3
        className={cn(
          'mb-2 font-sans text-lg font-bold',
          emergency ? 'text-hero-ink' : 'text-heading',
        )}
      >
        {title}
      </h3>
      <p className={cn('mb-4 text-sm leading-relaxed', emergency ? 'text-hero-body' : 'text-sub')}>
        {description}
      </p>
      <Link
        href={href}
        className={cn(
          'mt-auto inline-flex items-center gap-1.5 text-sm rounded-control',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          linkClasses,
        )}
      >
        {emergency ? 'Call 24/7 →' : 'Learn more →'}
      </Link>
    </Card>
  )
}
