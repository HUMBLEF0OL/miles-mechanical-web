import { cn } from '@/lib/utils/cn';

type LogoVariant = 'full' | 'mark' | 'wordmark' | 'mark-no-badge';
type LogoTone = 'light' | 'dark';

export interface LogoProps {
  /** Lockup to render. */
  variant?: LogoVariant;
  /**
   * Surface the logo sits on.
   * - `light` (default): for use on light surfaces — blue badge, white M stroke, dark wordmark.
   * - `dark`: for use on dark surfaces — white badge, blue M stroke, white wordmark.
   */
  tone?: LogoTone;
  /** Size of the square badge in px (also drives wordmark scale). Default 40. */
  size?: number;
  className?: string;
}

// Brand hex is allowed in raw SVG attributes (SVG attrs cannot be tokenized).
const BLUE = '#155C93';
const EMBER = '#F0641F';
const WHITE = '#FFFFFF';

/**
 * The M monogram — a squared badge with two polylines: a cool blue left/up
 * stroke for air conditioning and a warm ember right stroke for heating.
 */
export function Logo({
  variant = 'full',
  tone = 'light',
  size = 40,
  className,
}: LogoProps) {
  const isDark = tone === 'dark';
  // On light surfaces the badge is blue with white strokes; on dark surfaces
  // the badge is white with blue strokes. The ember (heating) stroke is constant.
  const badgeFill = isDark ? WHITE : BLUE;
  const acStroke = isDark ? BLUE : WHITE;

  const Badge = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      className="rounded-badge"
      style={{ flex: 'none' }}
      role="img"
      aria-label="Miles Mechanical"
    >
      <rect x="2" y="2" width="92" height="92" rx="14" fill={badgeFill} />
      <polyline
        points="28 68 28 30 48 53"
        fill="none"
        stroke={acStroke}
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
    return <span className={cn('inline-flex', className)}>{Badge}</span>;
  }

  if (variant === 'mark-no-badge') {
    return (
      <span className={cn('inline-flex', className)}>
        <svg
          width={size}
          height={(size * 64) / 96}
          viewBox="0 0 96 64"
          fill="none"
          style={{ flex: 'none' }}
          role="img"
          aria-label="Miles Mechanical"
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
        isDark ? 'text-white' : 'text-mm-blue-900',
      )}
      style={{ fontSize: variant === 'wordmark' ? size : wordSize }}
    >
      Miles
      <br />
      Mechanical
      <span
        className={cn(
          'mt-1.5 block font-semibold tracking-[0.24em]',
          isDark ? 'text-mm-blue-300' : 'text-mm-steel-500',
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
      <span
        className={cn('inline-flex', className)}
        role="img"
        aria-label="Miles Mechanical"
      >
        {wordmark}
      </span>
    );
  }

  // variant === 'full'
  return (
    <span
      className={cn('inline-flex items-center gap-[0.45em]', className)}
      role="img"
      aria-label="Miles Mechanical"
    >
      {Badge}
      {wordmark}
    </span>
  );
}
