---
name: skill-master
description: Use when adding a new skill to this project, editing an existing skill, or extracting reusable patterns from AGENTS.md into a dedicated skill file.
---

# Skill Master

## Purpose

This skill guides authoring and editing skills in this project. Invoke it when adding a new skill, editing an existing one, or extracting reusable patterns from `AGENTS.md`.

## When to invoke

- When adding a new skill to the project
- When editing or updating an existing skill
- When extracting reusable workflow patterns from `AGENTS.md` into a dedicated skill

## Anatomy of a skill in this repo

Source file lives under the contributing module's `skills/` directory (e.g. `src/modules/<slot>/<variant>/skills/<topic>.md` or `<topic>.md.hbs`).

Registration: an entry in the module's `manifest.json` under `skills[]` with shape:

```json
{
  "from": "skills/<topic>.md",
  "to": {
    "claude": ".claude/skills/<topic>/SKILL.md",
    "copilot": ".github/instructions/<topic>.instructions.md"
  },
  "agentScope": ["claude", "copilot"]
}
```

Per-agent destination convention:

- `claude` → `.claude/skills/<topic>/SKILL.md`
- `copilot` → `.github/instructions/<topic>.instructions.md`

## Writing rules

- Short imperative voice — no narrative prose.
- `## When to invoke` must be the first non-purpose section.
- Anti-patterns must be explicit.
- Cite paths in backticks.

## Stack-aware vs static decision

- Does content change with module selection? → `.hbs` (requires the skills-phase Handlebars support).
- Otherwise → `.md` (static; copied with project-token substitution only).

## Update workflow

1. Read the existing skill end-to-end before editing.
2. Preserve any frontmatter.
3. Update the `## Workflow Skills` index in `CLAUDE.md.hbs` / `copilot-instructions.md.hbs` only if the skill is brand new.

## Anti-patterns

- Don't pad with examples that duplicate stack docs.
- Don't reference variants that aren't in the registry.
- Don't introduce a skill for a one-off concern.
