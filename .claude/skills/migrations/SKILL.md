---
name: migrations
description: Package migration guide — swap procedures for HTTP client, state management, data fetching, URL state, and forms. Use when evaluating or replacing a core package. Currently selected packages are recorded in docs/PACKAGES.md.
paths:
  - docs/PACKAGES.md
  - AGENTS.md
  - .github/copilot-instructions.md
  - .github/instructions/migrations.instructions.md
  - .claude/skills/migrations/SKILL.md
  - CLAUDE.md
---

# Package Migrations

## Purpose

Starter confines each swappable package to a small set of files. When a
better alternative emerges, an agent can swap the package by following the
migration procedure for that category — no adapter layers needed.

The package currently installed for each category is recorded in
[`docs/PACKAGES.md`](../../../docs/PACKAGES.md). Always read that file first
before performing any swap so you know what you are swapping **from**.

## How It Works

1. Each swappable package category has a section below describing the
   containment boundary, the interface contract consuming code expects, and
   step-by-step swap instructions.
2. The procedure is package-agnostic: the file paths and contracts hold
   regardless of which package currently fills the slot.
3. Any agent (updater, scaffold, or default) reads the relevant section and
   executes the swap.

## Categories

| Category         | Section                               | Surface area                        |
| ---------------- | ------------------------------------- | ----------------------------------- |
| HTTP Client      | [HTTP Client](#http-client)           | Tiny — 2 files behind service layer |
| State Management | [State Management](#state-management) | Tiny — store files only             |
| Data Fetching    | [Data Fetching](#data-fetching)       | Small — provider + hook files       |
| URL State        | [URL State](#url-state)               | Wide — inline in components         |
| Forms            | [Forms](#forms)                       | Wide — inline in components         |

## When to Use

- **Quarterly audit** — Run the Updater agent in Audit Alternatives Mode to
  evaluate if any category has a clearly superior package
- **New project kickoff** — Team reviews the categories below to decide if
  defaults are right for their use case
- **Mid-project swap** — Agent reads the procedure, executes the swap,
  runs validation

## Migration Workflow

```
1. Read docs/PACKAGES.md to confirm the currently-installed package
2. Read the relevant category section below
3. Create a branch: git checkout -b refactor/swap-{category}-to-{new-package}
4. Install new package, uninstall old
5. Modify files listed in the "Containment Boundary" table
6. Update agent instructions (AGENTS.md, copilot-instructions.md, CLAUDE.md
   if applicable)
7. Update docs/PACKAGES.md with the new package version and rationale
8. Run: npm run lint && npm run test:run && npm run build
9. Commit: git commit -am "refactor({category}): swap {old} for {new}"
```

## Rules

- **Never skip step 8** — all three checks must pass before committing
- **One category at a time** — never swap two packages in the same branch
- **Human approval required** — agents propose the swap, humans approve it
- **Update docs/PACKAGES.md** — after a swap it must reflect the new
  current package and list the previous one as an alternative

## Surface Area Summary

| Category         | Direct Usage Files   | Consuming Files (via hooks/services) |
| ---------------- | -------------------- | ------------------------------------ |
| HTTP Client      | 1 (client.ts)        | All service files                    |
| State Management | Store files only     | Components via hooks                 |
| Data Fetching    | Provider + hooks     | Components via hooks                 |
| URL State        | Inline in components | Same components                      |
| Forms            | Inline in components | Same components                      |

> HTTP client and state management have the **smallest blast radius** —
> they're fully contained behind service/store layers. URL state and forms
> are **inline** in components, making them harder to swap.

---

## HTTP Client

### Containment Boundary

| File                           | Role                                            | What it imports                           |
| ------------------------------ | ----------------------------------------------- | ----------------------------------------- |
| `src/lib/api/client.ts`        | Creates and configures the `apiClient` instance | The selected HTTP client package directly |
| `src/lib/api/error-handler.ts` | Parses error responses                          | Accesses the package's error shape        |

#### Consuming code (does not import the HTTP package)

All service files (`src/services/*.service.ts`) call `apiClient.get()`,
`.post()`, `.put()`, `.patch()`, `.delete()` and chain `.json()`. They never
import the HTTP package directly.

**Surface area: 2 files to modify, ~60 lines total.**

### Interface Contract

The consuming code (services) expects `apiClient` to expose:

```ts
interface ApiClient {
  get(url: string, options?: RequestOptions): ResponsePromise
  post(url: string, options?: RequestOptions): ResponsePromise
  put(url: string, options?: RequestOptions): ResponsePromise
  patch(url: string, options?: RequestOptions): ResponsePromise
  delete(url: string, options?: RequestOptions): ResponsePromise
}

interface RequestOptions {
  json?: unknown // JSON body
  body?: FormData // Multipart body
  searchParams?: Record<string, string>
}

interface ResponsePromise {
  json<T>(): Promise<T> // Parse JSON response
  then(): Promise<Response>
}
```

As long as the replacement exposes this shape, services need zero changes.

### Swap Steps

1. **Install new, uninstall old.**

   ```bash
   npm install <new-http-package>
   npm uninstall <current-http-package>
   ```

2. **Rewrite `src/lib/api/client.ts`** with the equivalent configuration:
   - Base URL from `apiConfig.baseUrl`
   - Timeout from `apiConfig.timeout`
   - `credentials: 'include'` for cookie-based auth
   - Retry config: 2 retries on GET for status 408, 429, 503, 504
   - On-401 hook: dispatch `auth:unauthorized`
   - Error-enrichment hook: enrich error message with status

3. **Update `src/lib/api/error-handler.ts`** so the error shape check matches
   the new package. Verify `error.response.status` exists,
   `error.response.json()` is available, and that timeout errors are still
   detectable.

4. **Verify service files still work.** If the new client returns parsed JSON
   directly (no `.json()` chaining required), update services accordingly.

5. **Update configuration files**:
   - `docs/PACKAGES.md` — swap entry
   - `AGENTS.md` — replace package references
   - `.github/copilot-instructions.md` (if present) — update apiClient notes
   - `CLAUDE.md` (if present) — update if the package is mentioned

6. **Validate**:

   ```bash
   npm run lint && npm run test:run && npm run build
   ```

---

## State Management

### Containment Boundary

| File                                       | Role                                                     | What it imports                     |
| ------------------------------------------ | -------------------------------------------------------- | ----------------------------------- |
| `src/lib/store/ui.store.ts`                | UI store (sidebar, loading) + toast delegation to Sonner | The selected state package + sonner |
| `src/lib/store/index.ts`                   | Barrel export                                            | Re-exports store hooks and types    |
| `src/lib/store/__tests__/ui.store.test.ts` | Store tests                                              | Imports `useUIStore`                |
| Any future `src/lib/store/*.store.ts`      | Additional stores                                        | Same pattern                        |

#### Consuming code (does not import the state package)

Components and hooks import `useUIStore` (or future store hooks) from
`@/lib/store` — they never import the state package directly.

**Surface area: Store files only (~1–3 files typically). Zero component
changes.**

### Interface Contract

Consuming code expects each store to export a React hook:

```ts
const useUIStore: () => {
  ui: {
    sidebar: { isOpen: boolean; toggle: () => void; setOpen: (open: boolean) => void }
    notification: {
      toast: {
        success: (m: string) => void
        error: (m: string) => void
        warning: (m: string) => void
        info: (m: string) => void
      }
    }
    loading: { isGlobal: boolean; setGlobal: (l: boolean) => void }
  }
}
```

Toast rendering is handled by Sonner (`<Toaster />` in `ToastProvider`).
The store's `notification.toast.*` methods delegate to `toast()` from `sonner`.
Consumers can also call `import { toast } from 'sonner'` directly.

Any replacement must produce a hook with the same return shape. The internal
implementation (atoms, signals, stores) doesn't matter.

### Swap Steps

1. **Install new, uninstall old.**

2. **Rewrite store files in `src/lib/store/`.** For each `*.store.ts` file,
   rewrite the internals using the new package while preserving the **exact
   same exported hook signature and return type**. The key constraint:
   `useUIStore()` must return the same object shape. Components never change.

3. **Update tests.** `src/lib/store/__tests__/ui.store.test.ts` calls
   `useUIStore()` and asserts on the return shape. If the hook signature is
   preserved, tests should still pass. May need to update package-specific
   test setup (e.g., store reset between tests).

4. **Update provider (if needed).** Some state libraries require a
   `<Provider>` at the root (others don't). If the replacement does, add it
   to `src/components/providers/` and wire it into `src/app/layout.tsx`.

5. **Update configuration files**:
   - `docs/PACKAGES.md` — swap entry
   - `AGENTS.md` — replace package references in state-management table
   - `.github/copilot-instructions.md` (if present) — update store patterns
   - `CLAUDE.md` (if present) — update if mentioned

6. **Validate** with `npm run lint && npm run test:run && npm run build`.

---

## Data Fetching

### Containment Boundary

| File                                         | Role                                            | What it imports                     |
| -------------------------------------------- | ----------------------------------------------- | ----------------------------------- |
| `src/components/providers/QueryProvider.tsx` | Client setup + provider                         | The selected data-fetching package  |
| `src/lib/hooks/useUser.ts`                   | User data hooks                                 | Package query/mutation hooks        |
| `src/lib/hooks/useAuth.ts`                   | Auth state (does not use data-fetching package) | —                                   |
| `src/config/queries.ts`                      | Query key factory                               | Pure TypeScript, no package imports |
| Any future `src/lib/hooks/use*.ts` data hook | Feature-specific hooks                          | Same pattern                        |

#### Consuming code (does not import the data-fetching package)

Components import custom hooks (`useUser`, `useCurrentUser`,
`useUpdateUser`, etc.) from `@/lib/hooks`. They never call the package's
hooks directly.

**Surface area: Provider + hook files (3–10 files depending on features).
Zero component changes.**

### Interface Contract

Each data hook returns this shape:

```ts
interface QueryResult<T> {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

interface MutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => void
  mutateAsync: (variables: TVariables) => Promise<TData>
  isPending: boolean
  isError: boolean
  error: Error | null
}
```

The replacement must produce hooks that return these same properties.

### Swap Steps

1. **Install new, uninstall old** (including any devtools package).

2. **Rewrite or remove the provider.** If the replacement uses a different
   provider component (or no provider at all), update
   `src/components/providers/QueryProvider.tsx` accordingly. Update
   `src/components/providers/index.ts` if the file is removed/renamed.

3. **Rewrite data hooks.** For each hook in `src/lib/hooks/use*.ts` that uses
   the package's query/mutation hooks:
   - Map them to the equivalents in the new package
   - Preserve the return shape: `{ data, isLoading, isError, error, refetch }`
   - Preserve mutation shape: `{ mutate, mutateAsync, isPending, isError, error }`

4. **Update query key factory.** `src/config/queries.ts` is pure TypeScript
   with no package imports. Adapt the key shape only if the new library uses
   a different convention (e.g., string keys vs. arrays).

5. **Handle cache invalidation.** Map each invalidation call to the new
   package's API.

6. **Update configuration and docs** (`docs/PACKAGES.md`, `AGENTS.md`,
   `.github/copilot-instructions.md` if present, `CLAUDE.md` if present).

7. **Validate** with `npm run lint && npm run test:run && npm run build`.

---

## URL State

### Containment Boundary

| File                             | Role                        | What it imports                 |
| -------------------------------- | --------------------------- | ------------------------------- |
| Components using URL-state hooks | Inline in client components | The URL-state package's hook(s) |

#### No abstraction layer

Unlike HTTP client or state management, URL-state libraries are typically
used **inline in components** — there is no hook wrapper or service layer in
between. This means swapping requires touching every component that manages
URL state.

**Surface area: every component using the URL-state hook. Scan with**
`grep -rn "<package-name>" src/`.

### Interface Contract

Components depend on a `[value, setValue]`-shaped hook:

```ts
const [value, setValue] = useQueryState('paramName', {
  defaultValue: 'default',
  parse: (v: string) => v, // optional parser
  serialize: (v: T) => string, // optional serializer
})
```

The replacement must provide a hook with similar `[value, setter]` tuple
return.

### Swap Steps

1. **Identify all usage**:

   ```bash
   grep -rn "<current-package-name>" src/
   ```

2. **Install new, uninstall old.**

3. **Update each component** to use the new hook. Match the
   `[value, setter]` tuple pattern.

   If swapping to native `useSearchParams`:

   ```tsx
   'use client'
   import { useSearchParams, useRouter, usePathname } from 'next/navigation'

   function useQueryParam(key: string, defaultValue: string) {
     const searchParams = useSearchParams()
     const router = useRouter()
     const pathname = usePathname()

     const value = searchParams.get(key) ?? defaultValue

     const setValue = (newValue: string) => {
       const params = new URLSearchParams(searchParams.toString())
       params.set(key, newValue)
       router.push(`${pathname}?${params.toString()}`)
     }

     return [value, setValue] as const
   }
   ```

4. **Update configuration and docs** (`docs/PACKAGES.md`, `AGENTS.md`,
   `.github/copilot-instructions.md` if present, `CLAUDE.md` if present).

5. **Validate** with `npm run lint && npm run test:run && npm run build`.

---

## Forms

### Containment Boundary

| File                     | Role                                | What it imports                                                |
| ------------------------ | ----------------------------------- | -------------------------------------------------------------- |
| Form components (client) | Inline in `'use client'` components | The forms package's hook(s) and any validation-resolver bridge |

#### No abstraction layer

Like URL state, forms libraries are used **inline in components** — there is
no wrapper hook. Swapping requires touching every form component.

**Surface area: every form component. Scan with**
`grep -rn "<current-forms-package>" src/`.

> **Note:** Validation schemas (`src/lib/validations/`) are independent of
> the forms library. They stay regardless of which forms package is used.
> Only the validation-resolver bridge (e.g. `<resolver>(schema)`) changes.

### Interface Contract

Form components depend on:

```ts
const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<T>({
  resolver: validationResolver(schema),
  defaultValues: { ... },
})

// In JSX:
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('fieldName')} />
  {errors.fieldName && <span>{errors.fieldName.message}</span>}
</form>
```

The replacement must support:

- Schema-based validation (with the selected validation slot's resolver)
- Field registration (or equivalent controlled/uncontrolled pattern)
- Per-field error messages
- Submit handling
- Form state (dirty, valid, submitting)

### Swap Steps

1. **Identify all usage**:

   ```bash
   grep -rn "<current-forms-package>" src/
   ```

2. **Install new, uninstall old** (including the resolver bridge package).

3. **Update each form component**:
   - Replace the form hook with the new library's hook
   - Replace the field-binding pattern (`register('field')` or equivalent)
   - Replace the submit handler
   - Replace the error access pattern
   - Ensure validation still works with the selected validation slot

4. **Keep validation schemas untouched.** `src/lib/validations/*.ts` are
   independent of the forms library — do not modify them.

5. **Update configuration and docs** (`docs/PACKAGES.md`, `AGENTS.md`,
   `.github/copilot-instructions.md` if present, `CLAUDE.md` if present).

6. **Validate** with `npm run lint && npm run test:run && npm run build`.
