import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { siteConfig } from '@/config'
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { archivo, plexMono, plexSans } from '@/lib/fonts'
import { routing } from '@/i18n/routing'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

// Locales that render right-to-left. en/fr are LTR; extend when adding RTL locales.
const RTL_LOCALES = new Set<string>([])

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  type Locale = (typeof siteConfig.locales)[number]
  const ogLocale =
    siteConfig.ogLocaleMap[locale as Locale] ?? siteConfig.ogLocaleMap[siteConfig.defaultLocale]
  const alternateLocale = siteConfig.locales
    .filter((l) => l !== locale)
    .map((l) => siteConfig.ogLocaleMap[l as Locale])

  // Locale-level OG defaults. Per-page canonical/hreflang come from buildMetadata.
  return {
    openGraph: { locale: ogLocale, alternateLocale },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  // Validate the incoming locale before any next-intl call (replaces the old
  // manual `includes` cast).
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering — must run before getMessages / useTranslations.
  setRequestLocale(locale)

  const messages = await getMessages()
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale)]} />
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider>
                <ErrorBoundary>{children}</ErrorBoundary>
              </ToastProvider>
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
