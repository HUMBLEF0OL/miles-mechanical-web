/**
 * Lightweight analytics helper (NFR-6 — conversion tracking).
 *
 * Every call is a safe no-op when GA4 isn't configured or when running on the
 * server, so call sites never have to guard. The GA4 loader and the global
 * click-to-call listener live in src/components/analytics/Analytics.tsx; the
 * lead conversion is fired directly from the lead form.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Conversion + interaction events the marketing site tracks. */
export type AnalyticsEvent = 'click_to_call' | 'generate_lead' | 'lead_form_error'

/** Fire a GA4 event. No-op if `gtag` isn't on the page (server or GA disabled). */
export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}
