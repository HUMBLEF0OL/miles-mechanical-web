# config — Architecture

> Local proximity doc. Module-specific only; shared boundaries and rules are not
> restated here — follow the links.

## Purpose

Centralized app configuration: site metadata, route maps, API base config, and
environment-driven constants.

## Key files & structure

- _Add config modules here as created (e.g. `site.ts`, `routes.ts`)._

## Local notes

- Reads from `process.env`; typed config objects; named exports.

## Related (canonical)

- "No hardcoded URLs", "no secrets in `NEXT_PUBLIC_`" → `CONSTRAINTS.md`
- Environment variable model → `docs/ARCHITECTURE.md`
