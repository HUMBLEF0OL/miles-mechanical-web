'use client'

import Link from 'next/link'
import { useState } from 'react'
import { business } from '@/config/business'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'

export interface SiteHeaderProps {
  className?: string
}

// Real routes (FR-CR-5). "Service areas" has no index page in Phase 1, so it
// targets the home page's service-areas section.
const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Service areas', href: '/#service-areas' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
] as const

// Anchor styled as the primary Button (avoids a <button> nested in a link).
const CTA_CLASSES =
  'inline-flex h-11 items-center justify-center rounded-control bg-mm-blue-600 px-6 font-sans font-semibold text-white transition-colors hover:bg-mm-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

/**
 * SiteHeader — primary marketing header (§10): logo, desktop nav, a phone
 * link, the "Request service" primary action, and a mobile menu toggle.
 */
export function SiteHeader({ className }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={cn('bg-page border-b border-line-soft', className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${business.name} home`}>
          <Logo variant="full" size={40} />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-control font-sans text-sm font-semibold text-mm-steel-700 transition-colors hover:text-mm-blue-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phoneTel}`}
            className="hidden items-center gap-2 rounded-control font-sans text-sm font-bold text-mm-blue-600 transition-colors hover:text-mm-blue-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex"
          >
            <Icon name="phone" size={16} />
            {business.phoneDisplay}
          </a>

          <Link href="/contact" className={cn(CTA_CLASSES, 'hidden md:inline-flex')}>
            Request service
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-control text-mm-steel-700 transition-colors hover:bg-subtle focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="site-mobile-menu"
          aria-label="Mobile"
          className="border-t border-line-soft md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-control font-sans text-base font-semibold text-mm-steel-700 transition-colors hover:text-mm-blue-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${business.phoneTel}`}
                className="flex min-h-12 items-center gap-2 rounded-control font-sans text-base font-bold text-mm-blue-600 transition-colors hover:text-mm-blue-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset focus-visible:outline-none"
              >
                <Icon name="phone" size={18} />
                {business.phoneDisplay}
              </a>
            </li>
            <li className="py-2">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={cn(CTA_CLASSES, 'w-full')}
              >
                Request service
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
