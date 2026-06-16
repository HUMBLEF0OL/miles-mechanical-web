# Package Registry

This document is rendered from the selections you made at scaffold time. The
authoritative list of installed packages and their versions is `package.json`.
Per-library usage patterns live in the matching skill file (see links below).

## Selected Stack

| Category      | Choice                   |
| ------------- | ------------------------ |
| Framework     | Next.js 16 (App Router)  |
| Language      | TypeScript (strict mode) |
| Styling       | Tailwind CSS v4          |
| HTTP Client   | ky                       |
| Auth          | none                     |
| Data Fetching | tanstack-query           |
| State         | zustand                  |
| Forms         | react-hook-form          |
| Validation    | zod                      |
| Testing       | vitest+playwright        |
| Agent Tools   | claude                   |

## Per-Skill Documentation

Usage patterns, code templates, and conventions live in the per-skill files
installed for the agent platform you selected (`claude`).

> No agent platform selected (`agents=none`). Per-slot guidance was not
> installed. If you adopt an agent platform later, re-run the generator and
> select `claude` or `copilot` to install the matching skill files.

## Package Addition Criteria

Before adding a new package, it must pass ALL of:

1. **Necessity** — Can this be done with existing packages or native APIs?
2. **Size** — Is the bundle impact acceptable? (check bundlephobia.com)
3. **Maintenance** — Is it actively maintained? (>1 release in past 6 months)
4. **Compatibility** — Does it work with Next.js 16, React 19, and the rest of the stack?
5. **Convention** — Does it align with existing patterns? (no conflicting state managers, etc.)

## Swapping a Package

Each swappable slot has a documented swap procedure (HTTP Client, State
Management, Data Fetching, URL State, Forms). Without an agent platform you
can still follow the procedure manually — read the migration skill source at
`src/modules/locked/docs/skills/migrations.md` in the generator repo.

- **Exact files** that import the package directly
- **Interface contract** that consuming code depends on
- **Step-by-step** swap instructions (install, rewrite, update docs, validate)
- **Viable alternatives** with trade-off notes

## Update Strategy

Monthly/quarterly update cadence and commands are owned by
`docs/WORKFLOWS.md` → "Package Update Strategy".

---
