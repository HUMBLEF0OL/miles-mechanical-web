# PROGRESS.md — Cross-Session State

> This file is the project's **State subsystem**: the durable, version-controlled
> record of what is happening so that any fresh session (human or agent) can
> answer "What's the current progress?" without prior context. Knowledge lives
> here, not in a session's memory.
>
> **ACID update rules** (see `docs/VERIFICATION.md` for the full discipline):
>
> - **Atomicity** — one logical change updates this file in the same commit.
> - **Consistency** — only record work as `Done` once verification passes
>   (`npm run check:harness`, `lint`, `test:run`, `build` as applicable).
> - **Isolation** — keep current state here; keep rules in `CONSTRAINTS.md`,
>   process in `docs/WORKFLOWS.md`, and durable rationale in `DECISIONS.md`.
> - **Durability** — if it matters across sessions, it is written here, not left
>   in chat history.
>
> This is a **template**. Replace the example content below with your project's
> real state.

---

## Current Focus

Hardening the deterministic harness layer and finishing the Miles Mechanical
brand pass across metadata and components.

## Done

- **2026-06-16 — Pre-commit state-staleness gate.** Added
  `scripts/check-state-staleness.mjs`, wired into `.husky/pre-commit`: a commit
  staging `src/` code must also stage `PROGRESS.md` (Atomicity). Retagged the
  `PROGRESS.md`-currency rule `[auto]` in `CONSTRAINTS.md`. Verified pass/fail/skip
  via a throwaway `GIT_INDEX_FILE`; `check:harness`, lint, typecheck green.

## In Progress

_Started but not yet verified/complete._

> **WIP=1** — finish and verify one task before activating the next. More than
> one item here is a signal to stop and close one out.

## Blocked

_Items waiting on a decision, dependency, or human checkpoint. Note the blocker._

## Next Up

_Planned work, in rough priority order._

## Decisions & Notes

_Volatile scratch notes only._ Durable decisions, trade-offs, and
**harness-induced failure logs** live in [`DECISIONS.md`](DECISIONS.md) — the
durable _why_ is isolated from this file's volatile _what_. Use this section
for short, in-flight notes that have not yet hardened into a decision; promote
anything that matters across sessions to `DECISIONS.md`.

## Archive

Rolled-off state lives in dated archive files; the **index of every archived
period** is [`docs/archive/progress/README.md`](docs/archive/progress/README.md).
When this file grows large, move completed `## Done` / `## Decisions & Notes`
entries into a dated archive file, add it to that index — keep only current state
above. Convention and procedure: `docs/VERIFICATION.md` → "Archiving Growing State
Files". This `## Archive` header must always remain (`npm run check:harness`
asserts it).

- **Archive index:** [`docs/archive/progress/README.md`](docs/archive/progress/README.md)
  _(no periods archived yet)._
