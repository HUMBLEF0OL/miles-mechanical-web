# /docs

Invoke the docs agent to update project documentation after code changes.

## Usage

```
/docs [description of what changed]
```

**Examples:**

- `/docs` — scan recent changes and update relevant docs
- `/docs added a new payments feature` — focus on a specific change
- `/docs updated the auth adapter` — update auth-specific docs

## What happens

The docs agent ([.claude/agents/docs.md](.claude/agents/docs.md)) will:

1. Read recently created or modified files
2. Update `docs/ARCHITECTURE.md` if new folders or patterns were introduced
3. Update `docs/PACKAGES.md` if new dependencies were added
4. Update `docs/AUTH_PATTERN.md` if the auth adapter was touched
5. Never rewrites entire docs — updates the relevant section only

## When to run

- After scaffolding a new feature (`/scaffold` → `/docs`)
- After adding a new package
- After structural refactors that change folder layout
- Quarterly alongside `/update`

Documentation rot is the #1 source of confusion when returning to a project after weeks.
