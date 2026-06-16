import { cn } from '@/lib/utils/cn';

type LogoVariant = 'full' | 'mark' | 'wordmark' | 'mark-no-badge';
type LogoTone = 'light' | 'dark' | 'auto';

export interface LogoProps {
  /** Lockup to render. */
  variant?: LogoVariant;
  /**
   * Surface the logo sits on.
   * - `light` (default): for use on light surfaces — blue badge, white M stroke, dark wordmark.
   * - `dark`: for use on dark surfaces — white badge, blue M stroke, white wordmark.
   * - `auto`: follows the active theme — light treatment in light mode, dark treatment in dark mode.
   */
  tone?: LogoTone;
  /** Size of the square badge in px (also drives wordmark scale). Default 40. */
  size?: number;
  /**
   * When true, the two-word wordmark stacks on small screens but sits on a
   * single line at `sm`+ (the desktop header treatment). Default false keeps the
   * always-stacked lockup used in the footer and standalone marks.
   */
  responsiveBreak?: boolean;
  /**
   * When true the lockup is purely decorative (e.g. a faint watermark): it is
   * removed from the accessibility tree (`aria-hidden`) and carries no
   * accessible name, so screen readers don't announce a redundant brand label.
   */
  decorative?: boolean;
  className?: string;
}

// Brand hex is allowed in raw SVG attributes (SVG attrs cannot be tokenized).
const BLUE = '#155C93';
const EMBER = '#F0641F';

/**
 * The M monogram — a squared badge with two polylines: a cool blue left/up
 * stroke for air conditioning and a warm ember right stroke for heating.
 *
 * The accessible name lives once on the outer wrapper (or is suppressed when
 * `decorative`); the inner SVGs are always `aria-hidden` so the lockup is never
 * announced twice.
 */
export function Logo({
  variant = 'full',
  tone = 'light',
  size = 40,
  decorative = false,
  responsiveBreak = false,
  className,
}: LogoProps) {
  // On light surfaces the badge is blue with white strokes; on dark surfaces
  // the badge is white with blue strokes. The ember (heating) stroke is
  // constant. `auto` flips between the two via the `dark:` CSS variant so the
  // lockup tracks the active theme without a hydration flash.
  const badgeFillClass =
    tone === 'auto'
      ? 'fill-mm-blue-600 dark:fill-white'
      : tone === 'dark'
        ? 'fill-white'
        : 'fill-mm-blue-600';
  const acStrokeClass =
    tone === 'auto'
      ? 'stroke-white dark:stroke-mm-blue-600'
      : tone === 'dark'
        ? 'stroke-mm-blue-600'
        : 'stroke-white';
  const wordmarkClass =
    tone === 'auto'
      ? 'text-mm-blue-900 dark:text-white'
      : tone === 'dark'
        ? 'text-white'
        : 'text-mm-blue-900';
  const descriptorClass =
    tone === 'auto'
      ? 'text-mm-steel-500 dark:text-mm-blue-300'
      : tone === 'dark'
        ? 'text-mm-blue-300'
        : 'text-mm-steel-500';

  // a11y for the outer wrapper: a single name, or hidden when decorative.
  const wrapperA11y = decorative
    ? ({ 'aria-hidden': true } as const)
    : ({ role: 'img', 'aria-label': 'Miles Mechanical' } as const);

  const Badge = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      className="rounded-badge"
      style={{ flex: 'none' }}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="92" height="92" rx="14" className={badgeFillClass} />
      <polyline
        points="28 68 28 30 48 53"
        fill="none"
        className={acStrokeClass}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="48 53 68 30 68 68"
        fill="none"
        stroke={EMBER}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === 'mark') {
    return (
      <span className={cn('inline-flex', className)} {...wrapperA11y}>
        {Badge}
      </span>
    );
  }

  if (variant === 'mark-no-badge') {
    return (
      <span className={cn('inline-flex', className)} {...wrapperA11y}>
        <svg
          width={size}
          height={(size * 64) / 96}
          viewBox="0 0 96 64"
          fill="none"
          style={{ flex: 'none' }}
          aria-hidden="true"
        >
          <polyline
            points="28 52 28 14 48 37"
            fill="none"
            stroke={BLUE}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="48 37 68 14 68 52"
            fill="none"
            stroke={EMBER}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  // Wordmark scales relative to the badge size (34px wordmark at 84px badge).
  const wordSize = (size * 34) / 84;
  const descriptorSize = (size * 12) / 84;

  const wordmark = (
    <span
      className={cn(
        'font-display font-extrabold uppercase leading-[0.95] tracking-[0.01em]',
        wordmarkClass,
      )}
      style={{ fontSize: variant === 'wordmark' ? size : wordSize }}
    >
      Miles
      {responsiveBreak ? ' ' : null}
      <br className={responsiveBreak ? 'sm:hidden' : undefined} aria-hidden />
      Mechanical
      <span
        className={cn(
          'mt-1.5 block font-semibold tracking-[0.24em]',
          descriptorClass,
        )}
        style={{
          fontSize: variant === 'wordmark' ? size * 0.35 : descriptorSize,
        }}
      >
        AC &amp; Heating
      </span>
    </span>
  );

  if (variant === 'wordmark') {
    return (
      <span className={cn('inline-flex', className)} {...wrapperA11y}>
        {wordmark}
      </span>
    );
  }

  // variant === 'full'
  return (
    <span className={cn('inline-flex items-center gap-[0.45em]', className)} {...wrapperA11y}>
      {Badge}
      {wordmark}
    </span>
  );
}
