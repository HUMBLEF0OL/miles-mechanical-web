import type { SVGProps } from 'react'
import { cn } from '@/lib/utils/cn'
import { iconPaths, type IconName } from './icon-paths'

export type { IconName }

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Icon key from the §06 line-icon set. */
  name: IconName
  /** Square size in px for both width and height. Defaults to 24. */
  size?: number
}

/**
 * Icon — single source for the Miles Mechanical line-icon set (§06).
 *
 * Drawn on a 24px grid, 2px stroke, round caps/joins, inheriting color via
 * `currentColor`. Decorative by default (aria-hidden); pass `role="img"` plus
 * an `aria-label` if an icon must be announced.
 */
export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(className)}
      {...props}
    >
      {iconPaths[name]}
    </svg>
  )
}
