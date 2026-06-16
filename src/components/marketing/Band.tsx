import { cn } from '@/lib/utils/cn'

export interface BandProps {
    /** Band contents. Capped at the 1240px reading column via `band-inner`. */
    children: React.ReactNode
    /** Rendered as the band element. Defaults to `section`. */
    as?: 'section' | 'div'
    /** Classes for the full-bleed band itself (background, vertical padding). */
    className?: string
    /** Classes for the inner 1240px content wrapper. */
    innerClassName?: string
    /** Inline style for the band (e.g. gradient backgrounds). */
    style?: React.CSSProperties
    /** Forwarded to the band element for `aria-labelledby` wiring. */
    'aria-label'?: string
    'aria-labelledby'?: string
}

/**
 * Band — a full-bleed marketing band (§10 / hi-fi extra-large spec).
 *
 * The band background stretches edge-to-edge across the viewport even when the
 * band sits inside a `container-page` wrapper, while its contents stay capped
 * at the 1240px reading column and align to the page gutters. This realizes the
 * hi-fi rule: "full-bleed navy bands still stretch edge to edge, but text and
 * grids never do."
 *
 * Server component: purely presentational, no hooks or handlers.
 */
export function Band({
    children,
    as: Tag = 'section',
    className,
    innerClassName,
    style,
    ...aria
}: BandProps) {
    return (
        <Tag className={cn('full-bleed', className)} style={style} {...aria}>
            <div className={cn('band-inner', innerClassName)}>{children}</div>
        </Tag>
    )
}
