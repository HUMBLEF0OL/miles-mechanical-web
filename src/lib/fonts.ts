import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

// Archivo — display/headings (uppercase wordmark, section titles).
export const archivo = Archivo({
  weight: ['500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

// IBM Plex Sans — body and UI.
export const plexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-sans',
  display: 'swap',
})

// IBM Plex Mono — monospace accents (code paths, technical figures).
// Not used for above-the-fold LCP text, so skip preloading to avoid competing
// with the display/body fonts for early bandwidth (improves LCP).
export const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: false,
})
