---
name: state-management
description: State management decision tree — Zustand for client UI, nuqs for URL state, useState for local. Use when managing client-side state.
paths: src/lib/store/**
---

# State Management Patterns

## Decision Tree

| Data type             | Tool              | Example                          |
| --------------------- | ----------------- | -------------------------------- |
| Server data           | Data-fetching lib | User list, product details       |
| URL state             | nuqs              | Search filters, pagination, tabs |
| Client UI state       | Zustand           | Sidebar open, theme, modal state |
| Form state            | Forms library     | Login form, create product form  |
| Local component state | useState          | Toggle, dropdown open            |

## Zustand Store

```ts
import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
```

## URL State (nuqs)

```tsx
'use client'

import { useQueryState } from 'nuqs'

export function SearchFilter() {
  const [search, setSearch] = useQueryState('q', { defaultValue: '' })

  return (
    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
  )
}
```

## UI Store — Toast (via Sonner)

The `ui.store.ts` delegates toasts to [Sonner](https://sonner.emilkowal.dev/). Use it directly or via the store convenience methods:

```ts
import { toast } from 'sonner'

// Direct (preferred)
toast.error('Something went wrong')
toast.success('Saved!')

// Or via the store hook
const { toast: t } = useUIStore().ui.notification
t.error('Something went wrong')
```

## Rules

- Stores live in `src/lib/store/*.store.ts`
- Never use `useState` + `useEffect` for server data — use the data-fetching skill
- URL state (filters, pagination, tabs) belongs in the URL via nuqs — not Zustand
- Keep stores small and focused — one store per domain concern
- Export stores from barrel `src/lib/store/index.ts`
