# services — Architecture

> Local proximity doc. Module-specific only; shared boundaries and rules are not
> restated here — follow the links.

## Purpose

API service layer: the only place that talks to the HTTP client. One module per
domain.

## Key files & structure

- _Add `*.service.ts` modules here as features are scaffolded._

## Local notes

- camelCase + `.service.ts`; typed inputs/outputs; named exports.

## Related (canonical)

- Service-layer flow and the "components never call the HTTP client directly"
  rule → `docs/ARCHITECTURE.md`
- Service + API-route patterns → `api` skill
