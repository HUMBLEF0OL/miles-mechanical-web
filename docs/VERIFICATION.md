# Verification

How to keep this repository valid and provable: verification commands, the
mechanical and manual Fresh Session Test, ACID commit discipline, state-file
archival, and the instruction-audit cadence. These are **stack-neutral**. For
day-to-day development flow see [`WORKFLOWS.md`](WORKFLOWS.md); for agent
coordination see [`AGENT_OPS.md`](AGENT_OPS.md).

---

## Verification Commands by Phase

- **Fast check:** `npm run lint` and `npm run test:run`
- **Full check:** `npm run lint`, `npm run format:check`, `npm run test:run`, `npm run build`
- **Boundary check:** end-to-end suite when proxy/auth route behavior changed
- **Docs parity check:** keep boundary/handoff wording consistent across `AGENTS.md`, `CONSTRAINTS.md`, and `.github/copilot-instructions.md` (when the Copilot slot is installed)

### Harness check & CI-ready command set

`npm run check:harness` is the **mechanical Fresh Session Test** — a
zero-dependency script (`scripts/check-harness.mjs`) that asserts the harness
files an agent needs exist and are structurally valid. It runs on every commit
via `.husky/pre-commit`.

The same command set is ready to drop into a CI job unchanged (no workflow file
ships in this template — adopt it when you add CI):

```bash
npm run check:harness   # harness structure is valid
npm run lint            # conventions ([auto] rules)
npm run typecheck       # types compile
npm run test:run        # tests pass
npm run build           # production build succeeds
```

The harness check also guards the **SEO module** (config-driven, so regressions
are mechanical): every `page.tsx` exports `metadata`/`generateMetadata`; the root
layout sets `metadataBase`; `robots.ts`, `sitemap.ts`, the `llms.txt` route, and
`manifest.ts` exist; `siteConfig` has the required SEO fields and its
`locales`/`defaultLocale` match `src/i18n/routing.ts`; `[locale]/layout.tsx`
exports `generateStaticParams` and calls `setRequestLocale`; and no private route
key appears in `seoRoutes`. The workflow lives in the `seo` skill.

---

## Definition of Done

"Done" = the verification commands for the change's phase pass — **not** the
agent's own assessment. Models are systematically overconfident (lec 09), so
completion judgement is externalized to the harness, not left to the agent that
generated the work.

This repo already ships an externalized judge: `scaffold` generates, `validator`
checks, and the handoff contract's `verification_run` (`docs/AGENT_OPS.md`)
records the exact commands run and their pass/fail. Code-written ≠
behavior-verified — record the evidence, don't assert success.

A passing unit suite alone is **not** Done for cross-component changes: the
integration/E2E rows of the Testing Strategy table (`WORKFLOWS.md`) gate those.

---

## Fresh Session Test

A new session — human or agent, with **no prior context** — must be able to
answer these six questions using only the repository:

1. **What is this system?** → `README.md`, `AGENTS.md` (Project Identity)
2. **How is it organized?** → `docs/ARCHITECTURE.md` + per-module
   `src/<module>/ARCHITECTURE.md`
3. **How do I run it?** → `package.json` scripts, `README.md`, `.nvmrc`
4. **How do I verify it?** → this file (verification commands) +
   `npm run check:harness`
5. **What's the current progress?** → `PROGRESS.md`
6. **How do I start from scratch / is it init-ready?** → `INITIALIZATION.md`
   (the four startup-readiness conditions)

> Information that does not exist in the repo does not exist for the agent. If
> you cannot answer one of these from the files above, that gap is the bug —
> fix the docs, not your memory. Run `npm run check:harness` for the mechanical
> version of questions 1–4.

---

## ACID Commit Discipline

Every commit should leave the repository in a valid, self-describing state.

- **Atomicity** — one logical change is one commit. Don't bundle unrelated edits.
- **Consistency** — commit only when verification passes. The pre-commit hook
  runs `check:harness` (plus lint-staged), so a commit always represents a valid
  harness state.
- **Isolation** — keep concerns in separate files: rules in `CONSTRAINTS.md`,
  process in `docs/WORKFLOWS.md`, cross-session state in `PROGRESS.md`, durable
  rationale in `DECISIONS.md`. Don't smear them together.
- **Durability** — knowledge lives in version control, not in a session's
  memory. If it matters tomorrow, write it down: current state in `PROGRESS.md`,
  durable decisions and harness-induced failure logs in `DECISIONS.md`, or the
  relevant doc.

---

## Archiving Growing State Files

Long-lived logs (`PROGRESS.md`, `DECISIONS.md`) must not grow unbounded. Roll old
entries **off** into a dated archive instead of deleting them, and keep a source
map. Both files keep a `## Archive` header (asserted by `npm run check:harness`)
so the trail is never lost. Each file's `## Archive` section links **once** to its
archive `README.md`, which is the index of every archived period — the main file
does not list the periods itself. The two differ in **what triggers a roll-off**:

**`PROGRESS.md` — roll off by age/size.** When `## Done` gets long (rule of
thumb: the file passes ~200 lines, or at the end of a quarter), move finished
entries into `docs/archive/progress/<YYYY-QN>.md`, add it to the index in
`docs/archive/progress/README.md`, and keep only current/active state in
`PROGRESS.md`.

**`DECISIONS.md` — roll off by status, never by age.** An old decision can still
be active law, so only entries marked `superseded` or `obsolete` are eligible.
Move them into `docs/archive/decisions/<YYYY-QN>.md`, add it to the index in
`docs/archive/decisions/README.md`, keep every `accepted` decision live, and
ensure the entry that superseded each archived one still resolves to the archive
file.

---

## Audit Instructions Like Dependencies

Instructions are a dependency: each rule has a _source_ and an _expiry_. Stale
rules degrade signal-to-noise exactly like unused packages bloat a lockfile.
`CONSTRAINTS.md` tags every rule with `[src:…]` (why it exists) and `[exp:…]`
(when it can be deleted).

**Quarterly cadence:** review every rule whose `[exp:]` is a `review-by:<YYYY-QN>`
date that has now passed. For each:

- If the reason still holds → refresh the `review-by` date to the next horizon.
- If the library/version/policy it guarded is gone → delete the rule.
- If a `[review]` rule has since gained a deterministic check → retag it
  `[auto]` in the same change.

Rules tagged `[exp:never]` are structural invariants and are exempt from the
date sweep, but may still be removed if the structure they protect is removed.

---

## Promote Recurring Review Feedback

When the same `[review]` issue is caught by a human reviewer more than once,
promote it to a deterministic check — an ESLint rule or a `check:harness`
predicate — and retag the corresponding `CONSTRAINTS.md` rule `[review]→[auto]`
in the same change. Each promotion makes the harness self-strengthening (lec 10):
recurring mistakes become mechanically impossible rather than re-reviewed.
