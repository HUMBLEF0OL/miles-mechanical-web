---
name: components
description: React component patterns — server vs client components, styling with cn(), props interfaces. Use when creating UI or shared components.
paths: src/components/**
---

# Component Patterns

## Server Component (default)

```tsx
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  className?: string
  title: string
}

export function FeatureCard({ className, title }: FeatureCardProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <h3>{title}</h3>
    </div>
  )
}
```

## Client Component (only when needed)

```tsx
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AccordionProps {
  className?: string
  children: ReactNode
}

export function Accordion({ className, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('rounded border', className)}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && children}
    </div>
  )
}
```

## Rules

- **Server Components by default** — no directive needed
- Add `'use client'` **only** when you need: hooks, event handlers, browser APIs, or real-time state
- Never add `'use client'` to `page.tsx` — push it down to child components
- Always accept and merge `className` with `cn()` from `@/lib/utils`
- Props must use typed interfaces — never inline `any` or untyped objects
- Named exports always (not default), except `page.tsx` and `layout.tsx`
- UI components (`src/components/ui/`) must be pure — no business logic
- Shared components (`src/components/shared/`) may compose UI components with business logic
