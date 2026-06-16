import { test, expect } from '@playwright/test'

test.describe('Landing page', () => {
  test('loads and displays the page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Miles Mechanical/i)
  })

  test('has visible navigation', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('has visible hero section', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('has visible footer', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('login link navigates to login page', async ({ page }) => {
    await page.goto('/')
    const loginLink = page.getByRole('link', { name: /log\s*in/i })
    await expect(loginLink).toBeVisible()
    await loginLink.click()
    await expect(page).toHaveURL(/\/login/)
  })
})

test.describe('Theme toggle', () => {
  test('toggles dark mode', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByLabel(/switch to (dark|light) mode/i)
    await expect(toggle).toBeVisible()
    const htmlEl = page.locator('html')
    const hadTheme = await htmlEl.getAttribute('data-theme')
    await toggle.click()
    const hasTheme = await htmlEl.getAttribute('data-theme')
    expect(hasTheme).not.toBe(hadTheme)
  })
})
