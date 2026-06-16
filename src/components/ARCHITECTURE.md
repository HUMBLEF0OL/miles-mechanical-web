# components — Architecture

> Local proximity doc. Module-specific only; shared boundaries, layering, and
> rules are not restated here — follow the links.

## Purpose

Reusable React components, split by responsibility.

## Key files & structure

- `ui/` — atomic design-system components
- `shared/` — composed components
- `providers/` — React context providers

## Local notes

- Filenames PascalCase; named exports.

## Related (canonical)

- Component hierarchy (atoms → molecules → pages), "no business logic in `ui/`"
  → `docs/ARCHITECTURE.md` and `CONSTRAINTS.md`
- Server/Client split → `CONSTRAINTS.md`
- Component patterns → `components` skill
