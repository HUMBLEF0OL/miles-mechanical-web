# DECISIONS.md — Durable Rationale Log

> This file is the project's **decision log** (ADR-lite): the durable record of
> _why_ the project is the way it is. It is the companion to `PROGRESS.md`, which
> holds the volatile _what_ (current state). Isolation principle:
>
> - `PROGRESS.md` → current state and short volatile scratch notes.
> - `DECISIONS.md` → durable rationale that outlives any single session, plus
>   **harness-induced failure logs**.
>
> Knowledge lives here, not in a session's memory (ACID Durability — see
> `docs/VERIFICATION.md`). Append entries; mark superseded ones rather than
> deleting them.
>
> This is a **template**. Replace the example entries below with your project's
> real decisions.

---

## Decision Log

Each entry uses this shape:

```
### YYYY-MM-DD — <title>
- **Decision:** …
- **Rationale:** …
- **Rejected alternatives:** …
- **Constraints:** …
- **Status:** accepted | superseded by <entry>
```

When a failure is traced to a specific **harness layer** (Instructions, Tools,
Environment, State, or Feedback — the harness diagnostic loop), record the
layer and the fix as a decision entry: it is a durable learning, not volatile
state.

---

## Archive

Rolled-off decisions live in dated archive files; the **index of every archived
period** is [`docs/archive/decisions/README.md`](docs/archive/decisions/README.md).
Unlike `PROGRESS.md` (which archives by age/size), decisions roll off **by status,
never by age** — an old decision can still be active law. Only entries marked
`superseded` or `obsolete` may move out; every `accepted` decision stays here
regardless of age.

When this file grows large, move superseded/obsolete entries into a dated archive
file and add it to that index — keep all active decisions above. Convention and
procedure: `docs/VERIFICATION.md` → "Archiving Growing State Files". This
`## Archive` header must always remain (`npm run check:harness` asserts it).

- **Archive index:** [`docs/archive/decisions/README.md`](docs/archive/decisions/README.md)
  _(no periods archived yet)._
