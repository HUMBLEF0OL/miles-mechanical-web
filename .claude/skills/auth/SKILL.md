---
name: auth
description: Conventions when no auth provider is bundled. Use when adding authentication or guarding routes.
paths:
  - src/lib/auth/**
  - src/proxy.ts
---

# Auth Patterns (no provider)

This project was scaffolded without an auth provider. The proxy still ships, but it allows every route by default. Add an auth provider before exposing protected functionality.

## To enable auth

1. Re-run the generator (or edit manifests) selecting one of: `clerk`, `next-auth`, `custom-jwt`
2. The selected provider drops files into `src/lib/auth/` and wires the layout provider
3. Update `src/config/routes.ts` to mark which routes are public vs protected
4. Update `src/proxy.ts` to enforce the auth check (see proxy skill)

## Until then

- Do not gate any route on `isAuthenticated` — there is no source of truth
- Never invent ad-hoc auth (cookies, localStorage flags) — pick a real adapter instead
- Treat every API route as public; validate inputs aggressively (Zod or your chosen validator)

## Rules

- Auth logic, when added, lives in `src/lib/auth/` only — nowhere else
- Components must call `useAuth()` (client) or `auth` (server) — never import a provider package directly
- Switching providers must remain a single-file change in `src/lib/auth/index.ts`
