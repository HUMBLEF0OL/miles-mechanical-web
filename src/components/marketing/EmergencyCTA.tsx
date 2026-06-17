import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { business } from '@/config/business'

export interface EmergencyCTAProps {
  className?: string
}

/**
 * EmergencyCTA — §09 "Emergency & click-to-call" urgency banner.
 *
 * Full-width brand-gradient banner (alarm red, the one reserved emergency use).
 * Left: eyebrow + Archivo headline + subtext. Right: a white click-to-call
 * button that pulses to draw attention to the after-hours line.
 *
 * The alarm-red gradient is a brand gradient rendered via inline style (CSS
 * gradients can't be expressed as a single Tailwind utility). It reads the alarm
 * tokens — `--color-alarm-700` → `--color-alarm` — so it stays in sync with the
 * palette and tracks the theme like the click-to-call button's `text-alarm`.
 */
export function EmergencyCTA({ className }: EmergencyCTAProps) {
  return (
    <section
      aria-label="Emergency service"
      className={cn('full-bleed text-white', className)}
      style={{
        background: 'linear-gradient(100deg, var(--color-alarm-700), var(--color-alarm))',
      }}
    >
      <div className="band-inner flex flex-wrap items-center gap-6 py-8">
        <div className="min-w-[260px] flex-1">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-mm-ember-100">
            No Cooling · No Heat
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">
            We answer after hours.
          </h2>
          <p className="mt-2.5 font-sans text-[15px] leading-snug text-white/85">
            {business.emergencyNote}
          </p>
        </div>

        <a
          href={`tel:${business.phoneTel}`}
          aria-label={`Call Miles Mechanical's after-hours line at ${business.phoneDisplay}`}
          className={cn(
            'inline-flex min-h-12 items-center gap-2.5 rounded-control bg-white px-7 py-4',
            'font-sans text-lg font-bold text-alarm shadow-e2',
            'animate-pulse-alarm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
          )}
        >
          <Icon name="call" size={22} />
          {business.phoneDisplay}
        </a>
      </div>
    </section>
  )
}
