import { cn } from '@/lib/utils/cn'
import { business } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { RatingStars } from '@/components/ui/RatingStars'

const HERO_CREDENTIALS = ['Licensed & insured', 'AHS-approved', '10-yr warranty'] as const

const PROOF_POINTS = [
  'Licensed & insured',
  'American Home Shield approved',
  '10-yr parts / 1-yr labour warranty',
  '20+ years · family-owned',
] as const

/**
 * Hero — asset-light two-column hero (§10). Left column carries the rating chip,
 * the uppercase Archivo display headline, supporting copy, the primary CTAs and
 * a row of credential strings. Right column is a credentials proof panel (no
 * photography) so the page never depends on client imagery.
 *
 * Server component: purely presentational, no hooks or handlers.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="full-bleed relative overflow-hidden bg-hero"
    >
      {/* Warm ember glow watermark behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--color-mm-ember-500)_0%,transparent_65%)] opacity-20"
      />

      <div className="band-inner grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        {/* ── Left: headline + CTAs ──────────────────────────────────────── */}
        <div className="relative py-12 text-hero-ink sm:py-14 lg:pr-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-control border border-hero-chip-bd bg-hero-chip px-3.5 py-1.5 font-sans text-xs font-semibold">
            <span className="tracking-widest text-ember-strong" aria-hidden>
              ★★★★★
            </span>
            <span>
              {business.rating} · {business.reviewCount} Google reviews
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-display text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl"
          >
            Honest HVAC.
            <br />
            <span className="text-mm-ember-500">Done right.</span>
          </h1>

          <p className="mt-5 max-w-[46ch] font-sans text-lg leading-relaxed text-hero-body">
            Family-owned in Dallas for 20+ years. Fair pricing, licensed work, and
            we actually answer after hours.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="ember" size="lg">
              Get a free quote
            </Button>

            {/* Outline tel CTA — a real anchor for click-to-call semantics,
                styled to mirror the Button atom's lg size + outline treatment. */}
            <a
              href={`tel:${business.phoneTel}`}
              className={cn(
                'inline-flex h-14 items-center justify-center gap-2.5 rounded-control border-[1.5px] border-hero-chip-bd px-8',
                'font-sans text-lg font-semibold text-hero-ink transition-colors hover:bg-white/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
              )}
            >
              <Icon name="phone" size={18} aria-hidden />
              Call {business.phoneDisplay}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm font-semibold text-hero-body">
            {HERO_CREDENTIALS.map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon name="check" size={16} className="text-hero-muted" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: credentials proof panel ─────────────────────────────── */}
        <div className="relative mb-12 flex flex-col justify-center gap-5 overflow-hidden rounded-card border border-hero-line bg-gradient-to-br from-hero-strong to-hero px-8 py-10 sm:px-10 lg:mb-0 lg:rounded-none lg:border-y-0 lg:border-l lg:border-r-0 lg:bg-transparent lg:px-10 lg:py-12">
          {/* Faint M mark watermark */}
          <Logo
            variant="mark-no-badge"
            tone="dark"
            size={220}
            decorative
            className="pointer-events-none absolute -bottom-10 -right-8 opacity-[0.12]"
          />

          <div className="relative flex items-baseline gap-3">
            <span className="font-display text-6xl font-black leading-none text-hero-ink">
              {business.rating}
            </span>
            <RatingStars count={business.reviewCount} size="text-xl" />
          </div>

          <div className="relative h-px bg-hero-line" aria-hidden />

          <ul className="relative flex flex-col gap-3">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-2.5 font-sans text-[15px] font-semibold text-hero-body"
              >
                <Icon name="check" size={18} className="text-hero-muted" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
