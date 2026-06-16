import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from '@/lib/intl'
import { ThemeToggle } from '@/components/ui'
import { routes } from '@/config'
import { buildMetadata, JsonLd, webPageJsonLd } from '@/lib/seo'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'seo.home' })
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: routes.home,
    locale,
  })
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'nav' })
  const tSeo = await getTranslations({ locale, namespace: 'seo.home' })

  return (
    <main className="bg-page flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <JsonLd
        data={webPageJsonLd({
          title: tSeo('title'),
          description: tSeo('description'),
          path: routes.home,
          locale,
        })}
      />
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <h1 className="text-heading text-3xl font-bold">{t('home')}</h1>
      <p className="text-muted max-w-md text-center text-sm">
        Your app starts here. Edit{' '}
        <code className="bg-line-soft rounded px-1 py-0.5 font-mono">
          src/app/[locale]/page.tsx
        </code>{' '}
        to begin.
      </p>
    </main>
  )
}
