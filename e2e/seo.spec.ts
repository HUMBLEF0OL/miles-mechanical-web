import { test, expect } from '@playwright/test'

test.describe('SEO — localized document', () => {
  test('renders html[lang="en"] on /en', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('renders html[lang="fr"] on /fr', async ({ page }) => {
    await page.goto('/fr')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  })

  test('sets a self-referencing canonical link', async ({ page }) => {
    await page.goto('/en')
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /\/en$/)
  })

  test('exposes hreflang alternates incl. x-default', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1)
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1)
  })
})

test.describe('SEO — discoverability surfaces', () => {
  test('serves robots.txt with a sitemap reference', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.ok()).toBeTruthy()
    expect(await res.text()).toContain('Sitemap')
  })

  test('serves llms.txt in the llms.txt format', async ({ request }) => {
    const res = await request.get('/llms.txt')
    expect(res.ok()).toBeTruthy()
    expect(res.headers()['content-type']).toContain('text/plain')
    expect(await res.text()).toMatch(/^# /)
  })

  test('serves a sitemap with locale-prefixed URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.ok()).toBeTruthy()
    const body = await res.text()
    expect(body).toContain('/en')
    expect(body).toContain('hreflang')
  })

  test('serves the web manifest', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest')
    expect(res.ok()).toBeTruthy()
  })
})
