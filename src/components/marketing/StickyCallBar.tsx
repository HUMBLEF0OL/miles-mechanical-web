'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { business } from '@/config/business'
import { usePathname } from '@/i18n/navigation'

export interface StickyCallBarProps {
  className?: string
}

// Routes where the bar tucks away (§09): the contact page already leads with
// the lead form + click-to-call, so the fixed bar would only risk covering the
// form's submit button.
const HIDDEN_ON = new Set<string>(['/contact'])

/**
 * StickyCallBar — §09 always-visible click-to-call.
 *
 * A fixed two-button bar pinned to the bottom of every page on mobile only
 * (hidden at md+). Sits on the mm-blue-900 dark surface with two equal-width
 * actions:
 *   • "Call now" — tel: link in alarm red (the reserved emergency/urgent path).
 *   • "Request service" — Miles Blue link to /contact.
 *
 * Both targets are >= 48px tall and the bar honours the device safe-area inset
 * so the buttons clear the iOS home indicator. It tucks away on /contact so it
 * never overlaps the lead-form submit.
 */
export function StickyCallBar({ className }: StickyCallBarProps) {
  const pathname = usePathname()
  if (HIDDEN_ON.has(pathname)) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex gap-2.5 bg-hero px-3.5 pt-3 md:hidden',
        // safe-area aware bottom padding (iOS home indicator)
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        className
      )}
    >
      <a
        href={`tel:${business.phoneTel}`}
        aria-label={`Call ${business.name} now at ${business.phoneDisplay}`}
        className={cn(
          'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-control',
          'bg-alarm font-sans text-base font-bold text-white',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-hero',
          'active:opacity-90'
        )}
      >
        <Icon name="phone" size={18} className="shrink-0" />
        Call now
      </a>
      <Link
        href="/contact"
        className={cn(
          'flex min-h-12 flex-1 items-center justify-center rounded-control',
          'bg-primary font-sans text-base font-bold text-white',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-hero',
          'active:opacity-90'
        )}
      >
        Request service
      </Link>
    </div>
  )
}
