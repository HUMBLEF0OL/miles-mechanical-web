# Scripts

Utility scripts for Starter project setup and maintenance.

## `setup.js` — Interactive Project Setup

Personalizes the boilerplate for a new project. Run once after cloning.

```bash
node scripts/setup.js
```

**What it does:**

1. Prompts for project name, display name, URLs, and auth provider
2. Updates `package.json` with your project name
3. Creates `.env.local` from `.env.example` with your values
4. Generates a random `AUTH_SECRET`
5. Runs `npm install`
6. Initializes git and Husky hooks
7. Runs lint and format checks
8. Optionally creates an initial commit

**Prerequisites:** Node.js per `.nvmrc` (`^20.19 || ^22.13 || >=24` — needs stable `require(esm)`)

## `reset.mjs` — Clean-Slate Reset

Wipes the accumulated project-specific context back to pristine template form
while preserving 100% of the agentic workflow machinery. Run it in a **copy** of
the template (see the root `README.md` → "Start a new app from this template"),
then run `setup.js`.

```bash
npm run reset                # prompts for a typed RESET, then wipes + git re-init
npm run reset -- --dry-run   # list every change; touch nothing; exit 0
npm run reset -- --yes       # skip the confirmation (automation)
npm run reset -- --keep-git  # files-only reset; preserve git history
```

**What it does (in order):**

1. Prints the plan + a destructive-action summary; requires typing `RESET`
   (unless `--yes`). Under `--dry-run` it prints and exits without touching
   anything.
2. Restores `PROGRESS.md`, `DECISIONS.md`, `CHANGELOG.md`, the validator
   `MEMORY.md`, and the two `docs/archive/*/README.md` files from the
   version-controlled snapshots in `scripts/clean-slate/`.
3. Deletes completed `docs/specs/*.md` and `docs/plans/*.md` (keeps `_*.md`
   templates and `.gitkeep`) and any dated archive files under
   `docs/archive/*`.
4. Clears agent-learned facts under `.claude/agent-memory/**` (keeps the
   restored `MEMORY.md` index files).
5. Removes build caches (`.next/`, `tsconfig.tsbuildinfo`); keeps
   `node_modules/`.
6. Unless `--keep-git`: removes `.git/`, re-inits on branch `main`, and stages
   the clean tree — **no commit** (`setup.js` makes the single initial commit).
7. Runs `npm run check:harness`; a reset that breaks the harness gate fails
   loudly with a non-zero exit.

**Ordering vs `setup.js`:** `reset` runs first to wipe context and re-init git;
`setup` then personalizes the name/env, installs, and makes the one initial
commit. Because `setup.js` guards git init with `if (!isGitRepo)`, the
`reset → setup` sequence yields exactly one commit. The canonical snapshots live
in [`clean-slate/`](clean-slate/) — edit those files to change what a clean
start looks like.

**Prerequisites:** Node.js per `.nvmrc`. Safe to run twice (idempotent).

## `check-updates.js` — Dependency Health Check

Checks for outdated packages, security vulnerabilities, and whether a quarterly update is due.

```bash
# Via npm script
npm run update:check

# Or directly
node scripts/check-updates.js
```

**What it reports:**

- **Last update date** — reads `starter-update-*` git tags to determine when dependencies were last updated
- **Outdated packages** — grouped by severity (major / minor / patch)
- **Security audit** — `npm audit` results with vulnerability counts

**Tip:** Run this quarterly. If it flags overdue updates, use the Updater agent (`.github/agents/updater.agent.md`) for guided dependency upgrades.
