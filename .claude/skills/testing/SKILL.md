---
name: testing
description: Vitest + Testing Library patterns for unit tests, Playwright for integration/e2e tests. Use when writing tests or adding test coverage.
paths:
  - src/**/__tests__/**
  - e2e/**
---

# Testing Patterns

## Unit Testing

**Framework:** Vitest + React Testing Library
**Location:** Co-located `__tests__/` directories next to the code they test

## Component Test

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(
      <Button
        onClick={() => {
          clicked = true
        }}
      >
        Click
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })
})
```

## Zustand Store Test

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useMyStore } from '../my.store'

describe('useMyStore', () => {
  beforeEach(() => {
    useMyStore.setState({ items: [] })
  })

  it('adds an item', () => {
    useMyStore.getState().addItem({ id: '1', name: 'Test' })
    expect(useMyStore.getState().items).toHaveLength(1)
  })
})
```

## Zod Schema Test

```ts
import { describe, it, expect } from 'vitest'
import { loginSchema } from '../auth'

describe('loginSchema', () => {
  it('accepts valid data', () => {
    const result = loginSchema.safeParse({ email: 'a@b.com', password: 'pass' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'bad', password: 'pass' })
    expect(result.success).toBe(false)
  })
})
```

## Component Test with TanStack Query

When a component internally calls `useQuery` or `useMutation`, wrap it with a fresh `QueryClient` per test to avoid cache bleed between tests:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserCard } from '../UserCard'

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('UserCard', () => {
  it('renders loading state', () => {
    renderWithQuery(<UserCard userId="1" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
```

## Rules

- Test files: `src/**/__tests__/*.test.{ts,tsx}`
- Use `describe` blocks to group related tests
- Use `it` (not `test`) for test cases
- Prefer `screen.getByRole()` queries for accessibility
- Use `userEvent` over `fireEvent` for user interactions
- Always `userEvent.setup()` before interacting
- TanStack Query tests: new `QueryClient` per test with `retry: false`
- Run tests: `npm run test` (watch) or `npm run test:run` (CI)
- No `console.log` in tests — ESLint rule is relaxed for test files

---

## Integration & E2E Testing

**Framework:** Playwright
**Location:** `e2e/` directory at project root

```ts
import { test, expect } from '@playwright/test'

// API route — use request fixture (no browser needed)
test('GET /api/health returns 200', async ({ request }) => {
  const res = await request.get('/api/health')
  expect(res.status()).toBe(200)
  expect(await res.json()).toMatchObject({ status: 'ok', environment: expect.any(String) })
})

// Page smoke test — use page fixture
test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Starter/)
})
```

### E2E Rules

- E2E test files: `e2e/**/*.spec.ts`
- Use `test` (not `it`) — Playwright convention
- Use `request` fixture for API route tests (no browser needed)
- Use `page` fixture for page-level E2E tests
- Run e2e: `npm run test:e2e` or `npm run test:e2e:ui` (visual mode)
- Config: `playwright.config.ts` at project root
- Playwright auto-starts the dev server via `webServer` config
- Only Chromium is configured by default — add Firefox/WebKit in `playwright.config.ts` if needed
