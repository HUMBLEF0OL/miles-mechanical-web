# AUTH_PATTERN.md — Auth Adapter Contract

This project decouples authentication from the application via the `AuthAdapter`
interface in `src/lib/auth/adapter.ts`. The app talks to the adapter — never to
a specific auth library — so the underlying provider can be swapped without
changing UI or pages.

For the **provider-specific implementation** (imports, config, sign-in flow,
hosted UI vs. credentials, etc.) installed in this project, read the auth skill
file installed for your selected agent platform:

---

## Security Model

Auth tokens are **never exposed to client-side JavaScript**:

1. The browser calls BFF (Backend-for-Frontend) API routes
   (`/api/auth/login`, `/api/auth/logout`, `/api/auth/me`).
2. These Next.js API routes communicate with the real backend server-side.
3. Tokens are stored in **httpOnly, Secure, SameSite=Lax** cookies — invisible to JS.
4. The HTTP client uses `credentials: 'include'` so cookies are sent automatically.
5. The proxy (middleware) reads the cookie to gate protected routes.

This eliminates the XSS token-exfiltration attack vector regardless of which
provider you wire in.

---

## Interface (canonical)

All adapters must implement these three methods, defined in
`src/lib/auth/adapter.ts`:

```ts
interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role?: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthAdapter {
  getUser: () => Promise<User | null>
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
}
```

> `getToken()` and `isAuthenticated()` are intentionally absent. The client
> never has access to the raw token (it lives in an httpOnly cookie).
> Authentication state is derived from `getUser()` returning non-null.

---

## Where Things Live

| Concern                  | Location                              |
| ------------------------ | ------------------------------------- |
| Adapter interface        | `src/lib/auth/adapter.ts`             |
| Active adapter export    | `src/lib/auth/index.ts`               |
| Provider implementations | `src/lib/auth/providers/*.adapter.ts` |
| BFF auth routes          | `src/app/api/auth/{login,logout,me}/` |
| Auth hook                | `src/lib/hooks/useAuth.ts`            |
| Route protection (proxy) | `src/proxy.ts`                        |

---

## Switching Providers

To change auth providers, change **one import** in `src/lib/auth/index.ts`:

```ts
// import { <providerAdapter> } from './providers/<provider>.adapter'
// export const auth = createAuthAdapter(<providerAdapter>)
```

---

## Usage in the App

```tsx
// Client component
import { useAuth } from '@/lib/hooks'

export function ProfileButton() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth()
  if (isLoading) return <Skeleton />
  if (!isAuthenticated) return <LoginButton />
  return <button onClick={signOut}>{user?.name}</button>
}
```

```ts
// Server component / API route
import { auth } from '@/lib/auth'

export default async function ProtectedPage() {
  const user = await auth.getUser()
  if (!user) redirect('/login')
  return <Dashboard user={user} />
}
```

---

## Route Protection

Define protected and auth-only routes in `src/proxy.ts` (Next.js 16 renamed
middleware → proxy). The proxy checks the auth cookie and redirects
unauthenticated requests for protected routes; the _implementation_ is
provider-agnostic and lives next to the adapter.
