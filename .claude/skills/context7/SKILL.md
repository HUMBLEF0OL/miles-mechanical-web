---
name: context7
description: Use before writing or referencing any stack library — fetches version-accurate docs via the context7 MCP server so call signatures, hooks, and APIs match what is installed. Invoke on first usage of any non-none slot library, on any non-trivial Next.js API, or when uncertain whether an API is current.
---

# context7 — fetch version-current docs before writing stack-library code

## Purpose

The context7 MCP server provides version-accurate library documentation on demand. Before writing code that uses a stack library, resolve the library ID and fetch targeted docs to ensure your call signatures, hooks, and API surface match the version installed in this project.

## When to invoke

- First usage of any non-`none` library from `auth`, `state`, `http`, `data-fetching`, `forms`, `validation`, `i18n`, or `testing` slots in a new file
- Any non-trivial Next.js API usage (app router, server actions, middleware, metadata)
- When uncertain whether an API signature is current
- When a type error or runtime error suggests an API mismatch

## How to invoke

1. `mcp__context7__resolve-library-id` — resolve the canonical library ID from the package name
2. `mcp__context7__get-library-docs` — fetch targeted docs using the resolved ID and a specific topic

Always resolve first. Never call `get-library-docs` with a guessed ID.

## Stack

| Slot          | Package                 | Suggested topics                                              |
| ------------- | ----------------------- | ------------------------------------------------------------- |
| state         | `zustand`               | `create`, `slices`, `persist`, `selectors`                    |
| http          | `ky`                    | `instance`, `hooks`, `retry`, `timeout`                       |
| data-fetching | `@tanstack/react-query` | `useQuery`, `useMutation`, `queryClient`, `ssr hydration`     |
| forms         | `react-hook-form`       | `useForm`, `Controller`, `resolver`, `zodResolver`            |
| validation    | `zod`                   | `schema`, `refine`, `transform`, `discriminated union`        |
| i18n          | `next-intl`             | `useTranslations`, `getTranslations`, `routing`, `middleware` |
| testing       | `vitest`                | `mock`, `spy`, `setup`, `coverage`                            |
| next          | `next`                  | `app router`, `server actions`, `middleware`, `metadata`      |

## Anti-patterns

- Don't call `get-library-docs` without first resolving the ID via `resolve-library-id`.
- Don't fetch the entire library doc when a `topic` will do.
- Don't cache mentally across sessions — re-fetch when uncertain.
