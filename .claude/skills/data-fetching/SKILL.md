---
name: data-fetching
description: TanStack Query patterns for data fetching — useQuery, useMutation, query keys, cache invalidation. Use when fetching server data or creating data hooks.
paths: src/lib/hooks/**
---

# Data Fetching Patterns

**Never use `useEffect` for data fetching.** Always use TanStack Query.

## Fetching a list (useQuery)

```ts
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services'
import type { User } from '@/types'

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })
}
```

## Fetching a single item

```ts
export function useUser(id: string) {
  return useQuery<User>({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  })
}
```

## Creating / Updating (useMutation)

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services'
import type { CreateUserInput } from '@/types'

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUserInput) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

## Centralised Query Keys (`src/config/queries.ts`)

Define all query keys in one place to avoid duplication across hooks:

```ts
// src/config/queries.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
  },
} as const
```

Import and use in hooks: `import { queryKeys } from '@/config'` → `queryKey: queryKeys.users.detail(id)`

## Rules

- Hooks live in `src/lib/hooks/use*.ts` — one per file
- Query keys must be unique and hierarchical (e.g., `['users', id]`)
- Use `enabled` option to prevent unnecessary fetches
- Always invalidate relevant query keys on mutation success
- Centralize query key definitions in `src/config/queries.ts`
- Export hooks from barrel `src/lib/hooks/index.ts`
