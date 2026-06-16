# /validate

Invoke the validator agent to review code for Starter convention compliance.

## Usage

```
/validate [files or description]
```

**Examples:**

- `/validate` — review all recently changed files
- `/validate src/components/ui/Button.tsx` — review a specific file
- `/validate the user feature I just scaffolded`

## What happens

The validator agent ([.claude/agents/validator.md](.claude/agents/validator.md)) will:

1. Read shared and own memory for context
2. Run lint, format check, tests, and build
3. Check Starter-specific conventions (naming, barrel exports, `@/` aliases, `cn()`, no `any`, no `console.log`)
4. Produce a scored report (Convention / Quality / Security / Performance — 100 pts total)
5. Output a pass/fail handoff block

## Scope

The validator checks **Starter-specific conventions only**.
General code quality, logic correctness, and security are handled by Superpowers' requesting-code-review.
