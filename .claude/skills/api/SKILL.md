---
name: api
description: API service layer with ky/apiClient and Next.js API routes with Zod validation. Use when creating services, API endpoints, or HTTP calls.
paths:
  - src/services/**
  - src/app/api/**
---

# API Patterns

## Service Layer (ky via apiClient)

```ts
import { apiClient } from '@/lib/api'
import type { Product, CreateProductInput } from '@/types'

export const productService = {
  getAll: (): Promise<Product[]> => apiClient.get('products').json(),
  getById: (id: string): Promise<Product> => apiClient.get(`products/${id}`).json(),
  create: (data: CreateProductInput): Promise<Product> =>
    apiClient.post('products', { json: data }).json(),
  update: (id: string, data: Partial<Product>): Promise<Product> =>
    apiClient.put(`products/${id}`, { json: data }).json(),
  delete: (id: string): Promise<void> => apiClient.delete(`products/${id}`).json(),
}
```

**Never use raw `fetch()` or `axios`.** Always go through `apiClient` from `@/lib/api`.

## API Route (with Zod validation)

```ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const createSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = createSchema.parse(body)
    // ... process data
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## Rules

- Services live in `src/services/*.service.ts`
- All service methods must have explicit return types (`Promise<T>`)
- All API route inputs must be validated with Zod schemas
- API routes must have try/catch with proper HTTP status codes
- Never call `fetch()` or `ky` directly in components — always go through a service
- API base URL comes from `src/config/api.ts` — never hardcode
- Export services from barrel `src/services/index.ts`
