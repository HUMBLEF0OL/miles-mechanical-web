import { describe, it, expect } from 'vitest'
import { buildMetadata, localizedUrl } from '../metadata'

describe('localizedUrl', () => {
  it('prefixes the locale and drops the trailing slash for root', () => {
    expect(localizedUrl('/', 'en')).toBe('http://localhost:3000/en')
  })

  it('normalizes a nested path without a trailing slash', () => {
    expect(localizedUrl('/blog/', 'fr')).toBe('http://localhost:3000/fr/blog')
  })
})

describe('buildMetadata', () => {
  const base = { title: 'Home', description: 'A description', path: '/', locale: 'en' }

  it('sets a self-referencing canonical for the current locale', () => {
    expect(buildMetadata(base).alternates?.canonical).toBe('http://localhost:3000/en')
  })

  it('emits hreflang alternates for every locale plus x-default', () => {
    const languages = buildMetadata(base).alternates?.languages
    expect(languages).toEqual({
      en: 'http://localhost:3000/en',
      fr: 'http://localhost:3000/fr',
      'x-default': 'http://localhost:3000/en',
    })
  })

  it('maps the OG locale and alternateLocale', () => {
    const og = buildMetadata(base).openGraph
    expect(og?.locale).toBe('en_US')
    expect(og && 'alternateLocale' in og ? og.alternateLocale : undefined).toEqual(['fr_FR'])
  })

  it('uses a summary_large_image Twitter card', () => {
    const twitter = buildMetadata(base).twitter
    expect(twitter && 'card' in twitter ? twitter.card : undefined).toBe('summary_large_image')
  })

  it('omits robots when indexable', () => {
    expect(buildMetadata(base).robots).toBeUndefined()
  })

  it('emits noindex robots when requested', () => {
    expect(buildMetadata({ ...base, noindex: true }).robots).toEqual({
      index: false,
      follow: false,
    })
  })

  it('builds locale-correct canonical for the fr locale', () => {
    expect(buildMetadata({ ...base, locale: 'fr' }).alternates?.canonical).toBe(
      'http://localhost:3000/fr'
    )
  })
})
