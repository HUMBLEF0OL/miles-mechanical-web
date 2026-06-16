---
name: validation
description: Schema definition, parsing, and inference patterns using Zod.
paths:
  - src/lib/validations/**
---

# Validation Skill — Zod

Zod is the validation library for this project. Schemas live in
`src/lib/validations/`, exported through `src/lib/validations/index.ts`.

## Define a schema

```ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
})

export type User = z.infer<typeof userSchema>
```

## Parse vs. safeParse

- `schema.parse(input)` — throws `ZodError` on failure (use in API routes inside try/catch)
- `schema.safeParse(input)` — returns `{ success, data | error }` (use in components)

## Reuse via primitives

Common primitives live in `src/lib/validations/primitives.ts`. Compose
feature schemas from primitives to keep validation rules DRY:

```ts
import { email, password } from './primitives'
export const loginSchema = z.object({ email, password })
```

## API route validation

```ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(1) })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    return NextResponse.json({ data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## Form integration

When the `forms` slot uses React Hook Form, wire Zod via
`@hookform/resolvers/zod`. See the forms skill for the full pattern.

## Do NOT

- Define schemas inside components — keep them in `src/lib/validations/`
- Validate the same shape in two places — import from a single source
- Use `z.any()` — prefer `z.unknown()` and narrow with refinement
