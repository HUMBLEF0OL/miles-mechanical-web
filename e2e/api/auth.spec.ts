import { test, expect } from '@playwright/test'

test.describe('POST /api/auth/login', () => {
  test('returns 400 on missing credentials', async ({ request }) => {
    const response = await request.post('/api/auth/login', { data: {} })
    expect(response.status()).toBe(400)
  })

  test('returns 400 on invalid email', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: 'not-an-email', password: 'password123' },
    })
    expect(response.status()).toBe(400)
  })

  test('returns 400 on missing password', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: 'user@example.com' },
    })
    expect(response.status()).toBe(400)
  })
})

test.describe('GET /api/auth/me', () => {
  test('returns 401 when no auth cookie is present', async ({ request }) => {
    const response = await request.get('/api/auth/me')
    expect(response.status()).toBe(401)
  })
})

test.describe('POST /api/auth/logout', () => {
  test('returns 200 and clears auth cookie', async ({ request }) => {
    const response = await request.post('/api/auth/logout')
    expect(response.status()).toBe(200)

    // Auth cookie should be cleared (Max-Age=0 or expired)
    const setCookie = response.headers()['set-cookie'] ?? ''
    expect(setCookie).toMatch(/max-age=0|expires=.*1970/i)
  })
})
