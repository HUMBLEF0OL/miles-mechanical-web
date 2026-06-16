---
name: routing
description: Next.js App Router patterns — route groups, layouts, metadata, and loading/error route files. Use when creating route structure and page-level routing artifacts.
paths:
  - src/app/**
---

# Routing Patterns

Starter uses the Next.js App Router. Routes live in `src/app/`.

## Basic Page

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return <div>About</div>
}
```

## Route Groups

Route groups use `(name)` parentheses and don't affect the URL:

```
src/app/
├── (auth)/           # Auth group — no /auth in URL
│   ├── layout.tsx    # Centered layout for auth pages
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (dashboard)/      # Dashboard group
│   ├── layout.tsx    # Layout with Navbar + Footer
│   └── dashboard/page.tsx
└── page.tsx          # Root / page
```

## Layout with Shared Shell

```tsx
// src/app/(dashboard)/layout.tsx
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-page flex min-h-screen flex-col">
      <Navbar />
      <main className="container-page flex-1 py-8">{children}</main>
      <Footer />
    </div>
  )
}
```

Route protection patterns are owned by the proxy skill (`src/proxy.ts`).

## Loading & Error States

```tsx
// src/app/(dashboard)/dashboard/loading.tsx
import { Skeleton } from '@/components/ui'

export default function Loading() {
  return <Skeleton className="h-48 w-full" />
}

// src/app/(dashboard)/dashboard/error.tsx
;('use client')

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-16 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Metadata (SEO)

Metadata is config-driven via `buildMetadata` — never hand-write per-page
`title`/`canonical`/`hreflang`. See the `seo` skill for the workflow (call
`buildMetadata` in `generateMetadata`, register public routes in `seoRoutes`,
mark private pages `noindex`).

URL state patterns are owned by the state-management skill.

## Rules

- Never add `'use client'` to `page.tsx` — push interactivity to child components
- Use route groups `(name)` for layout organization without URL impact
- Define `metadata` or `generateMetadata` in every `page.tsx`
- Use `loading.tsx` for Suspense-based loading states
- Use `error.tsx` for error boundaries at the route level

---
