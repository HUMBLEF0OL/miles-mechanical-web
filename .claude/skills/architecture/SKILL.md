---
name: architecture
description: Project file organization, naming conventions, and import patterns. Use when creating new files, organizing code, or deciding where to place modules.
paths: src/**
---

# Architecture

## File Organization

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── (auth)/             # Auth route group (login, register)
│   ├── (dashboard)/        # Dashboard route group
│   ├── (marketing)/        # Public marketing pages
│   └── api/                # API routes
├── config/                 # App configuration (site, routes, api, storage, queries)
├── components/
│   ├── ui/                 # Atomic UI components (Button, Input, Modal)
│   ├── shared/             # Composed shared components (Navbar, Footer)
│   └── providers/          # React context providers
├── lib/
│   ├── api/                # HTTP client and error handling
│   ├── auth/               # Auth adapter pattern and providers
│   ├── hooks/              # Custom React hooks (one per file)
│   ├── store/              # Client state stores
│   ├── utils/              # Utility functions (cn, format)
│   └── validations/        # Validation schemas (modular files)
├── services/               # API service layer
└── types/                  # TypeScript interfaces and types
```

## Naming Conventions

| Type             | Pattern                 | Example                     |
| ---------------- | ----------------------- | --------------------------- |
| UI component     | PascalCase `.tsx`       | `Button.tsx`                |
| Shared component | PascalCase `.tsx`       | `PageHeader.tsx`            |
| Hook             | `use` + camelCase `.ts` | `useUserData.ts`            |
| Service          | camelCase `.service.ts` | `user.service.ts`           |
| Store            | camelCase `.store.ts`   | `ui.store.ts`               |
| Schema           | camelCase `.ts`         | `auth.ts` (in validations/) |
| Type file        | camelCase `.ts`         | `user.ts` (in types/)       |
| Route folder     | kebab-case              | `user-profile/`             |
| API route        | `route.ts` in folder    | `api/users/route.ts`        |

## Import Patterns

Always use `@/` alias. Group imports in this order:

```ts
// 1. React / Next.js
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'

// 2. External libraries (data-fetching lib, validation lib, forms lib, state lib, etc.)

// 3. Internal @/ imports
import { Button } from '@/components/ui'
import { useAuth } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import type { User } from '@/types'
```

## Key Rules

- TypeScript strict mode — no `any`, proper interfaces and generics
- Functional components only (no class components)
- Named exports for everything except `page.tsx` and `layout.tsx`
- `const` always, `let` only when reassignment is needed, never `var`
- All folders must have barrel `index.ts` files
- Config values in `src/config/` — never hardcode URLs or app settings
