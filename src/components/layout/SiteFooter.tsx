import { cn } from '@/lib/utils/cn'
import { business } from '@/config/business'
import { Logo } from '@/components/ui/Logo'
import { RatingStars } from '@/components/ui/RatingStars'
import { Icon } from '@/components/ui/Icon'
import { services, areas } from '@/content'
import { Link } from '@/i18n/navigation'

const FOOTER_LINK_CLASSES =
  'rounded-control transition-colors hover:text-hero-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-hero'

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
] as const

// Stable copyright year — avoids `new Date()` churn / hydration drift.
const currentYear = 2026

export interface SiteFooterProps {
  className?: string
}

/**
 * SiteFooter — §10 marketing footer on the dark blue brand surface.
 *
 * Full-bleed navy band (per the hi-fi extra-large spec): the brand surface
 * stretches edge-to-edge while its four columns (brand, services, service area,
 * contact) and the bottom NAP/copyright row stay capped at the 1240px reading
 * column. Columns collapse to a single stacked column on small screens.
 */
export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn('full-bleed bg-hero text-hero-body', className)}>
      <div className="band-inner py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="full" tone="dark" size={40} className="mb-[18px]" />
            <p className="max-w-[34ch] text-sm leading-relaxed">
              Texans serving Texans. Honest, licensed HVAC across the Dallas metro
              for 20+ years.
            </p>
            <RatingStars
              rating={business.rating}
              count={business.reviewCount}
              className="mt-4"
            />
          </div>

          {/* Services */}
          <FooterColumn title="Services">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={FOOTER_LINK_CLASSES}>
                {service.title}
              </Link>
            ))}
          </FooterColumn>

          {/* Service area */}
          <FooterColumn title="Service area">
            {areas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className={FOOTER_LINK_CLASSES}>
                {area.city}
              </Link>
            ))}
            <span className="text-hero-muted">+ surrounding cities</span>
          </FooterColumn>

          {/* Company + contact */}
          <FooterColumn title="Company">
            {COMPANY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={FOOTER_LINK_CLASSES}>
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${business.phoneTel}`}
              className="mt-1 inline-flex items-center gap-2 rounded-control font-bold text-hero-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
            >
              <Icon name="phone" size={16} className="text-ember" />
              {business.phoneDisplay}
            </a>
            <span className="text-hero-muted">{business.hoursDisplay}</span>
            <span className="font-semibold text-ember">
              {business.emergency} emergency line
            </span>
          </FooterColumn>
        </div>

        {/* Bottom row */}
        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-hero-line pt-5 text-xs text-hero-muted">
          <span>
            &copy; {business.name} {business.tagline} {currentYear} &middot;
            Licensed &amp; insured
          </span>
          <span>
            Serving {business.region} &middot;{' '}
            <a
              href={`tel:${business.phoneTel}`}
              className="rounded-control hover:text-hero-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
            >
              {business.phoneDisplay}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  children: React.ReactNode
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <p className="mb-[14px] font-sans text-xs font-bold uppercase tracking-[0.14em] text-hero-ink">
        {title}
      </p>
      <div className="flex flex-col gap-[9px] text-sm">{children}</div>
    </div>
  )
}
