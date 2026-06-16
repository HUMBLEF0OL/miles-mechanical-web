---
name: proxy
description: Next.js 16 proxy (middleware) patterns — route protection, auth checks, redirects. Use when implementing request interception or route guards.
paths:
  - src/proxy.ts
---

# Proxy (Middleware) Patterns

Starter uses `src/proxy.ts` as the entry point for request interception. This is a project convention — Next.js upstream still uses `middleware.ts`, but this project renames it to `proxy.ts` to better reflect its responsibility.

## Basic Route Protection

```ts
import { type NextRequest, NextResponse } from 'next/server'
import { authConfig, routes } from '@/config'

const PUBLIC_ROUTES: string[] = [routes.home, routes.login, routes.signup]

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes and static assets
  if (
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/')
  ) {
    return NextResponse.next()
  }

  // Check for auth token
  const token =
    request.cookies.get(authConfig.cookieName)?.value ??
    request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
```

## Rules

- File must be at `src/proxy.ts` (Starter convention — equivalent to `middleware.ts` in standard Next.js projects)
- Export a **default function** named `proxy`
- Use `config.matcher` to limit which routes the proxy runs on
- Never import heavy modules — proxy runs on every matched request
- Auth check reads cookies/headers only — no database calls
- Keep `PUBLIC_ROUTES` in sync with `src/config/routes.ts`
- For role-based access, decode JWT claims in the proxy (do not fetch from API)

## Boundary with Auth

- Proxy skill owns request-time route gating and redirects in `src/proxy.ts`
- Auth skill owns identity/session adapter usage in components, server components, and API routes
- Do not call the auth adapter from the proxy — read cookies/headers directly for token presence checks
- See `src/lib/auth/` (auth skill) for session validation logic used outside the proxy
