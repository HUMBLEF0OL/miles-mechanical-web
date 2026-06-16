import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
  articleJsonLd,
  faqJsonLd,
} from '../json-ld'

describe('organizationJsonLd', () => {
  it('produces a schema.org Organization with a stable @id', () => {
    const org = organizationJsonLd()
    expect(org['@type']).toBe('Organization')
    expect(org['@id']).toBe('http://localhost:3000#organization')
  })
})

describe('websiteJsonLd', () => {
  it('sets inLanguage and omits SearchAction (no on-site search route)', () => {
    const site = websiteJsonLd('fr')
    expect(site['@type']).toBe('WebSite')
    expect(site['@id']).toBe('http://localhost:3000#website')
    expect(site.inLanguage).toBe('fr')
    expect(site.potentialAction).toBeUndefined()
  })
})

describe('webPageJsonLd', () => {
  it('references the website and carries inLanguage + @id', () => {
    const page = webPageJsonLd({ title: 'T', description: 'D', path: '/', locale: 'en' })
    expect(page['@type']).toBe('WebPage')
    expect(page['@id']).toBe('http://localhost:3000/en#webpage')
    expect(page.inLanguage).toBe('en')
    expect(page.isPartOf).toEqual({ '@id': 'http://localhost:3000#website' })
  })
})

describe('breadcrumbJsonLd', () => {
  it('numbers list items from 1', () => {
    const bc = breadcrumbJsonLd([
      { name: 'Home', url: 'http://localhost:3000/en' },
      { name: 'Blog', url: 'http://localhost:3000/en/blog' },
    ])
    const items = bc.itemListElement as Array<Record<string, unknown>>
    expect(items).toHaveLength(2)
    expect(items[0]?.position).toBe(1)
    expect(items[1]?.position).toBe(2)
  })
})

describe('articleJsonLd', () => {
  it('defaults dateModified to datePublished and sets inLanguage', () => {
    const article = articleJsonLd({
      title: 'T',
      description: 'D',
      path: '/blog/post',
      locale: 'en',
      datePublished: '2026-01-01',
    })
    expect(article['@type']).toBe('Article')
    expect(article.dateModified).toBe('2026-01-01')
    expect(article.inLanguage).toBe('en')
  })
})

describe('faqJsonLd', () => {
  it('maps entries to Question/Answer pairs', () => {
    const faq = faqJsonLd([{ question: 'Q?', answer: 'A.' }])
    expect(faq['@type']).toBe('FAQPage')
    const main = faq.mainEntity as Array<Record<string, unknown>>
    expect(main[0]?.['@type']).toBe('Question')
    expect((main[0]?.acceptedAnswer as Record<string, unknown>)?.text).toBe('A.')
  })
})

describe('JsonLd component', () => {
  it('escapes characters that could break out of the script context', () => {
    const markup = renderToStaticMarkup(JsonLd({ data: { name: 'a<b>c&d</script>' } }))
    expect(markup).toContain('\\u003c')
    expect(markup).toContain('\\u003e')
    expect(markup).toContain('\\u0026')
    // The raw injection payload must not appear unescaped inside the script body.
    expect(markup).not.toContain('<b>c&d')
  })
})
