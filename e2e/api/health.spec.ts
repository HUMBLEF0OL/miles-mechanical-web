import { test, expect } from '@playwright/test'

test.describe('GET /api/health', () => {
  test('returns 200 with expected shape', async ({ request }) => {
    const response = await request.get('/api/health')

    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toMatchObject({
      status: 'ok',
      environment: expect.any(String),
    })
    expect(body.timestamp).toBeDefined()
    expect(body.version).toBeDefined()
  })
})
