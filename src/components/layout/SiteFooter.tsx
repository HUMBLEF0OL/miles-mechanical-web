import { cn } from '@/lib/utils/cn'
import { business } from '@/config/business'
import { Logo } from '@/components/ui/Logo'
import { RatingStars } from '@/components/ui/RatingStars'
import { Icon } from '@/components/ui/Icon'

const services = [
  'AC repair',
  'Heating & furnace',
  'Install & replace',
  'Maintenance',
  'Mini-split',
] as const

const currentYear = new Date().getFullYear()

export interface SiteFooterProps {
  className?: string
}

/**
 * SiteFooter — §10 marketing footer on the dark blue brand surface.
 *
 * Four columns (brand, services, service area, contact) that collapse to a
 * single stacked column on small screens, plus a bottom NAP/copyright row.
 */
export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        'rounded-card bg-mm-blue-900 p-12 text-mm-blue-200',
        className,
      )}
    >
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
            <span key={service}>{service}</span>
          ))}
          <span className="font-semibold text-mm-ember-300">
            Emergency {business.emergency}
          </span>
        </FooterColumn>

        {/* Service area */}
        <FooterColumn title="Service area">
          {business.areas.map((area) => (
            <span key={area}>{area}</span>
          ))}
          <span className="text-mm-blue-300">+ surrounding cities</span>
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title="Contact">
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-flex items-center gap-2 font-bold text-white rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-mm-blue-900"
          >
            <Icon name="phone" size={16} className="text-mm-ember-500" />
            {business.phoneDisplay}
          </a>
          <span>{business.hoursDisplay}</span>
          <span className="font-semibold text-mm-ember-300">
            {business.emergency} emergency line
          </span>
        </FooterColumn>
      </div>

      {/* Bottom row */}
      <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs text-mm-blue-300">
        <span>
          &copy; {business.name} {business.tagline} {currentYear} &middot;
          Licensed &amp; insured
        </span>
        <span>NAP placeholder — reconcile before launch</span>
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
      <p className="mb-[14px] font-sans text-xs font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </p>
      <div className="flex flex-col gap-[9px] text-sm">{children}</div>
    </div>
  )
}
