# i18n — Architecture

> Local proximity doc. Module-specific only; shared boundaries and rules are not
> restated here — follow the links.

## Purpose

Internationalization wiring for next-intl: locale config, request config, and
translation message catalogs.

## Key files & structure

- `messages/*.json` — per-locale translation catalogs
- next-intl request/routing config modules

## Local notes

- One JSON catalog per locale; keep keys stable and namespaced.

## Related (canonical)

- Locale-aware patterns, "all user-visible strings via translation functions"
  → `.claude/skills/i18n/SKILL.md`
- Where pages live (`app/[locale]/`) → `src/app/ARCHITECTURE.md`
