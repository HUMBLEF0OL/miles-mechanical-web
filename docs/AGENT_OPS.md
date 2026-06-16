# Agent Operations

How agents coordinate on this project: the handoff contract, routing, feature
creation order, agent memory, and the per-session clock-in / clock-out protocol.
These are **stack-neutral**. For day-to-day development flow, git, and testing,
see [`WORKFLOWS.md`](WORKFLOWS.md); for verification and the Fresh Session Test,
see [`VERIFICATION.md`](VERIFICATION.md).

---

## Standard Handoff Contract

Every inter-agent handoff must include:

- `from`
- `to`
- `objective`
- `changed_surfaces`
- `verification_run`
- `risks`
- `follow_up_owner`

Required rules:

- `changed_surfaces` lists files or folders touched.
- `verification_run` lists exact commands executed and pass/fail status.
- `risks` includes at least one item or `none`.
- `follow_up_owner` is one of: `human`, `validator`, `docs`, `scaffold`,
  `updater`, `figma`.
- Receiving agents restate assumptions before acting.

Example:

```yaml
from: scaffold
to: validator
objective: Validate generated billing feature
changed_surfaces:
  - src/types/billing.ts
  - src/services/billing.service.ts
verification_run:
  - npm run lint: pass
  - npm run test:run: pass
risks:
  - none
follow_up_owner: docs
```

---

## Agent Routing

Route a request to the agent that owns the surface being changed. Only the
agents installed by your selected variant exist; this is the canonical map.

| Signal                      | Agent / command                           |
| --------------------------- | ----------------------------------------- |
| Figma URL provided          | `figma` agent first, then `scaffold`      |
| "scaffold a feature"        | `scaffold` agent                          |
| "validate" or post-scaffold | `validator` agent                         |
| "update dependencies"       | `updater` agent                           |
| "audit alternatives"        | `updater` agent (audit-alternatives mode) |
| `/docs` command             | `docs` agent                              |
| `/review` command           | `validator` agent                         |

---

## Feature Creation Order

When scaffolding a new feature, create files in this order (the library used at
each step depends on your selected slots — see the matching skill file):

1. Types/interfaces (`src/types/`)
2. Validation schema (`src/lib/validations/`)
3. Service (`src/services/`)
4. API route (`src/app/api/`) — if needed
5. Client store (`src/lib/store/`) — if client state is needed
6. Hook(s) (`src/lib/hooks/`)
7. Components — UI first (`src/components/ui/`), then shared (`src/components/shared/`)
8. Page (`src/app/`)
9. Update barrel exports (`index.ts` files)
10. Tests (`__tests__/` next to source)

---

## Agent Memory

Agent memory is **session-local scratch**: agents write it to the project folder
(never a tool's personal session memory), but `.claude/agent-memory/` is
git-ignored — not durable across clones and possibly absent. Durable
cross-session / cross-agent knowledge belongs in `PROGRESS.md` and `DECISIONS.md`.

| Scope              | Path                                            | When to write                    |
| ------------------ | ----------------------------------------------- | -------------------------------- |
| Cross-agent shared | `.claude/agent-memory/shared/MEMORY.md`         | Every run — append a dated entry |
| Agent-specific     | `.claude/agent-memory/{agent}/MEMORY.md`        | Every run — append a dated entry |
| Figma token sync   | `.claude/agent-memory/figma/last-token-sync.md` | Token sync runs only             |

Rules: **read** the shared memory first **if present** (a fresh clone has none —
don't block on it); **append** a dated entry
(`## YYYY-MM-DD — {summary}` + bullets) to both the shared memory and the
agent's own memory after finishing; never write outside the project directory.
Exception: agents inside a parallel batch write **no** shared state — the
orchestrator does the single batch write (see "Parallel Execution" below).

---

## Session Protocol (clock-in / clock-out)

Long-running work loses the _why_ across sessions because context is finite.
Bracket every working session with an explicit clock-in and clock-out so a fresh
session resumes from the repository, not from memory.

### Clock-in (session start)

1. Read `PROGRESS.md` — `## Current Focus`, `## In Progress`, `## Blocked`.
2. Confirm only one `## In Progress` item (WIP=1); if more, close one out before
   starting new work.
3. Skim the most recent [`DECISIONS.md`](../DECISIONS.md) entries for durable
   rationale that constrains today's work.
4. Run `npm run check:harness` — confirm the harness starts green.
5. Confirm a clean or known git state (`git status`); resolve surprises before
   starting.

### Clock-out (session end)

1. Update `PROGRESS.md` — move finished items to `## Done`, refresh
   `## Current Focus` / `## In Progress` / `## Next Up`.
2. Append any durable decisions or harness-induced failure logs to
   [`DECISIONS.md`](../DECISIONS.md) (volatile scratch notes stay in `PROGRESS.md`).
3. Make an **atomic commit only when verification passes** (see
   [`VERIFICATION.md`](VERIFICATION.md) → ACID Commit Discipline).
4. Confirm `npm run check:harness` is green before ending the session.

---

## Parallel Execution

Most work is sequential (WIP=1). When **one** feature splits into sections that
touch **disjoint file surfaces** with no cross-section dependency, build them
concurrently instead of step by step. The parallel batch is still a single WIP
item — its sections are sub-tasks, not separate initiatives, so WIP=1 holds.

A pair of sections may run in parallel only if **all three** hold: disjoint file
surfaces (use module + `ARCHITECTURE.md` boundaries as the cut lines); no
contract dependency (neither imports the other's types/services); no shared
gated action (keep API routes, schema, auth — `CONSTRAINTS.md` checkpoints — in
one section only). Within a section the vertical slice (Feature Creation Order
above) stays sequential — those steps depend on each other.

Protocol:

1. **Land shared contracts first, sequentially**: shared types, the composing
   page shell with empty slots, and the top-level barrel. This is what makes the
   sections independent.
2. **Fan out** — one git worktree + branch per section; each agent builds its
   full vertical slice and exports only from its own section barrel.
3. **Each agent returns a handoff block** (above) and **writes no shared state** —
   no `PROGRESS.md`, `DECISIONS.md`, or shared-memory appends.
4. **Integrate sequentially** — the orchestrator merges one branch at a time,
   re-running the full gate (`docs/VERIFICATION.md`) at each merge, then wires
   sections into the shell slots and the top-level barrel.
5. **Orchestrator owns the shared-state write** — one `PROGRESS.md` /
   `DECISIONS.md` / shared-memory update for the whole batch after integration.

Use this only for 3+ genuinely independent sections; for one or two small ones
the worktree overhead outweighs the gain.
