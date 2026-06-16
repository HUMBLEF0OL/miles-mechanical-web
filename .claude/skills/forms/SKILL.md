---
name: forms
description: Form patterns with React Hook Form + Zod validation + zodResolver. Use when building forms with validation.
paths:
  - src/lib/validations/**
  - src/components/**/*Form*.tsx
  - src/components/**/*form*.tsx
---

# Form Patterns

## React Hook Form + Zod

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema, type CreateUserFormValues } from '@/lib/validations'
import { useUpdateUser } from '@/lib/hooks'
import { Button, Input } from '@/components/ui'

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
  })
  const updateUser = useUpdateUser()

  const onSubmit = (data: CreateUserFormValues) => {
    updateUser.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} error={errors.name?.message} />
      <Input {...register('email')} error={errors.email?.message} />
      <Button type="submit" isLoading={updateUser.isPending}>
        Save
      </Button>
    </form>
  )
}
```

## Zod Schema with Type Inference

```ts
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
```

## Rules

- Schemas live in `src/lib/validations/*.ts`
- Always use `zodResolver` to connect Zod schemas with React Hook Form
- Infer form types from Zod schemas using `z.infer<typeof schema>` — never duplicate types
- Forms must be client components (`'use client'`)
- Combine with TanStack Query mutations for submission
- Export schemas from barrel `src/lib/validations/index.ts`
