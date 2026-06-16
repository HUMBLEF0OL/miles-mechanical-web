---
name: error-handling
description: Error boundary usage, API error toast patterns, and error propagation. Use when implementing error states, handling API failures, or wrapping components with error boundaries.
paths:
  - src/components/shared/ErrorBoundary.tsx
  - src/lib/api/error-handler.ts
  - src/app/error.tsx
---

# Error Handling Patterns

## ErrorBoundary (React class component — required for caught render errors)

```tsx
import { ErrorBoundary } from '@/components/shared'

// Wrap a subtree to catch render errors without crashing the whole page
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  )
}
```

`ErrorBoundary` is in `src/components/shared/ErrorBoundary.tsx`. It renders a fallback UI on error and logs via `console.error`.

## API Error → Toast (via Sonner)

Show a toast when a mutation fails:

```tsx
'use client'

import { useUpdateUser } from '@/lib/hooks'
import { toast } from 'sonner'

export function ProfileForm() {
  const { mutate, isPending } = useUpdateUser()

  function handleSubmit(data: UserProfileFormValues) {
    mutate(data, {
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : 'Failed to update profile')
      },
    })
  }
}
```

## Parsing API Errors (ky HTTPError)

`src/lib/api/error-handler.ts` exports `parseApiError` — use it to extract a human-readable message from ky errors:

```ts
import { parseApiError } from '@/lib/api'
import { toast } from 'sonner'

mutate(data, {
  onError: async (error) => {
    const message = await parseApiError(error)
    toast.error(message)
  },
})
```

## Next.js Error Files

| File                                      | Purpose                                                   |
| ----------------------------------------- | --------------------------------------------------------- |
| `src/app/error.tsx`                       | Catches render errors in the app shell (client component) |
| `src/app/not-found.tsx`                   | Renders on `notFound()` or unmatched routes               |
| `src/components/shared/ErrorBoundary.tsx` | Manual React error boundary for subtrees                  |

## Rules

- Never swallow errors silently — always log or surface them to the user
- Use `toast.error(message)` from `sonner` for user-facing error messages, not `alert()`
- Use `parseApiError` from `@/lib/api` to extract messages from ky `HTTPError`
- Wrap page-level async data fetching in try/catch; throw to route error boundaries or return an explicit error state
- `console.error` is allowed only in error boundaries and error handlers — not in normal code paths
