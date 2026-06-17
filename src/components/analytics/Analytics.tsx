'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { env } from '@/config'
import { trackEvent } from '@/lib/analytics'

/**
 * Analytics — env-gated GA4 loader + global conversion listeners (NFR-6).
 *
 * Renders nothing and binds nothing unless NEXT_PUBLIC_GA_ID is set, so the site
 * runs cleanly before the owner provisions a property. When enabled it:
 *  - loads gtag.js and initializes the GA4 property, and
 *  - attaches one delegated click listener that fires a `click_to_call` event
 *    for every `tel:` link anywhere on the page. Delegation keeps the (mostly
 *    server-rendered) CTAs free of per-link onClick handlers.
 *
 * The lead-form conversion (`generate_lead`) is fired directly from LeadForm.
 */
export function Analytics() {
  const gaId = env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!gaId) return

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const link = target?.closest('a[href^="tel:"]') as HTMLAnchorElement | null
      if (!link) return
      trackEvent('click_to_call', {
        phone: link.getAttribute('href')?.replace('tel:', '') ?? '',
        location: link.dataset.callLocation ?? 'unknown',
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [gaId])

  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  )
}
