# Miles Mechanical

## Start a new app from this template

This repo stays **pristine** — it's a reusable template. To begin a real app,
work in a **copy** so the destructive reset erases nothing precious:

```bash
npx degit <your-starter-repo> my-app   # or copy the folder
cd my-app
npm run reset                          # wipe template context, fresh git init (no commit)
npm run setup                          # personalize name/env, install, single initial commit
```

`reset` restores the state files, specs/plans, archives, and agent-memory to a
clean slate while preserving every agentic workflow (`.claude/`, `AGENTS.md`,
`CONSTRAINTS.md`, the `docs/` guides, `scripts/`). It re-inits git on `main`
without committing; `setup` makes the single initial commit. See
[`scripts/README.md`](scripts/README.md) for flags (`--dry-run`, `--yes`,
`--keep-git`). Optional, manual: clear out-of-repo agent auto-memory under
`~/.claude/projects/.../memory/` if you want a fully fresh agent context.

## Quick Start

```bash
cd miles-mechanical-web
npm run dev
```

## Where to look

Each topic has a single canonical home — this is just the map:

- **Run it & all scripts** → `package.json`
- **Stack & versions** → [`docs/PACKAGES.md`](docs/PACKAGES.md)
- **Folder structure & architecture** → [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
  (plus each module's own `src/<module>/ARCHITECTURE.md`)
- **Rules (MUST / MUST NOT)** → [`CONSTRAINTS.md`](CONSTRAINTS.md)
- **Workflows — git, commits, testing, updates** → [`docs/WORKFLOWS.md`](docs/WORKFLOWS.md)
- **Verification, Fresh Session Test, ACID** → [`docs/VERIFICATION.md`](docs/VERIFICATION.md)
- **Agent handoff, routing, session protocol** → [`docs/AGENT_OPS.md`](docs/AGENT_OPS.md)
- **Startup readiness (initialization)** → [`INITIALIZATION.md`](INITIALIZATION.md)
- **Current progress / state** → [`PROGRESS.md`](PROGRESS.md)
- **Durable decisions / rationale** → [`DECISIONS.md`](DECISIONS.md)
- **AI / agent instructions (start here)** → [`AGENTS.md`](AGENTS.md)

---
