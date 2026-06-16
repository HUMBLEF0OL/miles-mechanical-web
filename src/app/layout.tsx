import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config'
import './globals.css'
import './theme.css'

/**
 * Root layout is a pass-through: `<html>`/`<body>`, the provider tree, and the
 * locale-aware metadata live in `src/app/[locale]/layout.tsx` (next-intl static
 * rendering pattern). This file carries only the root-level metadata DEFAULTS —
 * metadataBase, title template, OG/Twitter defaults, icons, manifest, and
 * verification — which `buildMetadata` per page then specializes.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    ...(siteConfig.twitter ? { site: siteConfig.twitter } : {}),
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  verification: {
    ...(siteConfig.verification.google ? { google: siteConfig.verification.google } : {}),
    ...(Object.keys(siteConfig.verification.other).length > 0
      ? { other: siteConfig.verification.other }
      : {}),
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#06121e' }, // dark app shell (--th-app, dark)
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
