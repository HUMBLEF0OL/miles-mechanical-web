# Architecture

This document describes the **stack-neutral architecture** of the project:
folder organization, naming conventions, and the boundaries between concerns.

For **library-specific patterns** (HTTP client setup, state-management code
templates, validation usage, form examples, testing recipes), read the per-skill
files installed for your selected agent platform.

---

## Folder Structure

```
project-root/
├── .github/                       # CI workflows + (if Copilot selected) instructions
├── docs/
│   ├── ARCHITECTURE.md            # This file
│   ├── AUTH_PATTERN.md            # Auth adapter contract
│   ├── PACKAGES.md                # Generated package registry (templated)
│   ├── WORKFLOWS.md               # Dev flow, git, testing, packages (process index)
│   ├── AGENT_OPS.md               # Handoff, routing, memory, session protocol
│   ├── VERIFICATION.md            # Verify cmds, Fresh Session Test, ACID, audit
│   ├── specs/                     # Design specs (brainstorming/design docs)
│   └── plans/                     # Implementation plans
├── scripts/
│   ├── check-updates.js           # Dependency / audit checker
│   └── check-harness.mjs          # Harness structure gate (npm run check:harness)
├── src/                           # Each top-level module carries an ARCHITECTURE.md
│   ├── app/                       # Next.js App Router (+ ARCHITECTURE.md)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── [locale]/              # Locale segment (next-intl)
│   │   ├── (auth)/                # Auth route group
│   │   ├── (dashboard)/           # Protected route group
│   │   └── api/
│   │       ├── health/route.ts
│   │       └── auth/
│   │           ├── login/route.ts
│   │           ├── logout/route.ts
│   │           └── me/route.ts
│   ├── config/                    # App configuration (+ ARCHITECTURE.md)
│   ├── components/                # (+ ARCHITECTURE.md)
│   │   ├── ui/                    # Atomic (design system)
│   │   ├── shared/                # Composed (business logic)
│   │   └── providers/             # React context providers
│   ├── i18n/                      # next-intl config + messages (+ ARCHITECTURE.md)
│   ├── lib/                       # (+ ARCHITECTURE.md)
│   │   ├── api/                   # HTTP client + error handling
│   │   ├── auth/                  # Auth adapter + providers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── store/                 # Client state stores
│   │   ├── utils/                 # cn, format, constants
│   │   └── validations/           # Validation schemas
│   ├── services/                  # API service layer (+ ARCHITECTURE.md)
│   └── types/                     # TypeScript interfaces (+ ARCHITECTURE.md)
├── e2e/                           # Integration / E2E tests
├── .nvmrc                         # Pinned Node major (Environment subsystem)
├── AGENTS.md                      # Base AI rules — single root instruction file / index
├── CONSTRAINTS.md                 # Hard MUST / MUST NOT rules ([auto]/[review]/[src:]/[exp:])
├── INITIALIZATION.md              # Startup-readiness phase (4 conditions)
├── PROGRESS.md                    # Cross-session State subsystem (current "what")
├── DECISIONS.md                   # Durable decision log ("why") + failure logs
├── README.md                      # Project documentation
├── package.json
└── tsconfig.json
```

The exact set of folders depends on the slots you selected at scaffold time.
Folders for unselected features (e.g. `src/lib/store/` when state slot is
`none`) are not generated.

---

## Naming Conventions

| Item          | Convention                | Example           |
| ------------- | ------------------------- | ----------------- |
| Components    | PascalCase                | `UserCard.tsx`    |
| Hooks         | `use` prefix, camelCase   | `useUserData.ts`  |
| Services      | camelCase + `.service.ts` | `user.service.ts` |
| Stores        | camelCase + `.store.ts`   | `ui.store.ts`     |
| Route folders | kebab-case                | `/user-profile`   |

---

## Imports

- Always use `@/` alias for `src/` imports
- Group: 1) react/next, 2) external libs, 3) internal `@/` imports
- Always re-export from barrel `index.ts` files

---

## Component Hierarchy

```
ui/ (atoms)          → No business logic, just styling and props
  ↓
shared/ (molecules)  → Compose atoms, may contain business logic
  ↓
pages                → Compose shared components, route-level
```

---

## Service Layer

```
Component → data-fetching hook → Service → HTTP client → API
```

Services live in `src/services/` and use the HTTP client from
`src/lib/api/client.ts`. Components never call the HTTP client directly.

---

## Auth Adapter Pattern

```
Component → useAuth() hook → auth (src/lib/auth/index.ts) → Active Adapter
```

Contract, interface, security model, provider switching, and auth file
locations: see [AUTH_PATTERN.md](AUTH_PATTERN.md).

---

## Environment Variables

- `NEXT_PUBLIC_*` — Available in client and server
- All others — Server-only (API routes, server components)
- Defined in `.env.local` (gitignored), documented in `.env.example`

---

## Key Code Locations

Application code only. Harness/process files are indexed in `AGENTS.md` →
"Where the rest lives"; auth file locations in `AUTH_PATTERN.md`.

| What             | Where                         |
| ---------------- | ----------------------------- |
| App config       | `src/config/`                 |
| HTTP client      | `src/lib/api/client.ts`       |
| className util   | `src/lib/utils/cn.ts`         |
| Global providers | `src/components/providers/`   |
| Health check     | `src/app/api/health/route.ts` |

For the path of each selected slot's library (state store, i18n messages, …),
see the module's own `src/<module>/ARCHITECTURE.md`; for the slot choices
themselves, see `docs/PACKAGES.md`.
