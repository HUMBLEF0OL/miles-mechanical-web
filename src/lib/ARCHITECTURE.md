# lib — Architecture

> Local proximity doc. Module-specific only; shared boundaries and rules are not
> restated here — follow the links.

## Purpose

Shared application library code.

## Key files & structure

- `api/` — HTTP client + error handling
- `auth/` — auth adapter + providers (`index.ts` is the swap point)
- `hooks/` — custom React hooks
- `store/` — client state stores
- `utils/` — `cn`, formatters, constants
- `validations/` — validation schemas

## Local notes

- Named exports; barrel `index.ts` re-exports.

## Related (canonical)

- Service-layer flow, import/barrel conventions → `docs/ARCHITECTURE.md`
- Auth adapter contract → `docs/AUTH_PATTERN.md`
- Boundary ownership (auth, proxy) → `AGENTS.md`
