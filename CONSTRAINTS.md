# CONSTRAINTS.md — Hard Rules (MUST / MUST NOT)

> This file holds the **non-negotiable** rules for this project: the hard
> "don'ts" and the actions that always require human approval. It is the
> companion to `AGENTS.md` (the index) and `docs/WORKFLOWS.md` (the process).
>
> Every rule carries **enforcement** tags and **dependency-metadata** tags.
>
> Enforcement — how a violation is caught:
>
> - `[auto]` — mechanically enforced by ESLint and/or `npm run check:harness`.
>   A violation fails a check; you do not rely on memory to catch it.
> - `[review]` — requires human judgement or approval. No deterministic check
>   exists (or one is intentionally deferred); a human is the gate.
>
> Dependency metadata — treat each rule like a dependency:
>
> - `[src:…]` — origin of the rule: _why it exists_ (e.g. `next-app-router`,
>   `security`, `ts-strict`, `architecture`, `js-baseline`, `team`, `harness`,
>   `state`, `process`, `verification`).
> - `[exp:…]` — _when it can be deleted/audited_: `never` for structural
>   invariants, or `review-by:<YYYY-QN>` for rules tied to a library or version.
>   The quarterly audit (`docs/VERIFICATION.md` → "Audit Instructions Like
>   Dependencies") sweeps every `review-by` date that has passed.
>
> The tags are the explicit bridge between these prose rules and the
> deterministic enforcement layer (`eslint.config.mjs`,
> `scripts/check-harness.mjs`). When a `[review]` rule later gains a
> deterministic check, retag it `[auto]` in the same change.

---

## MUST NOT (hard "don'ts")

- **MUST NOT** add `'use client'` to a `src/app/**/page.tsx` file — push
  interactivity down to child components. `[auto]` (eslint `no-restricted-syntax`)
  `[src:next-app-router]` `[exp:never]`
- **MUST NOT** use `var` — use `const`, or `let` only when reassignment is
  required. `[auto]` (eslint `no-var`) `[src:js-baseline]` `[exp:never]`
- **MUST NOT** leave `console.log` in production code (`console.warn` /
  `console.error` are allowed). `[auto]` (eslint `no-console`) `[src:js-baseline]`
  `[exp:never]`
- **MUST NOT** use the `any` type — use proper generics and union types.
  `[review]` `[src:ts-strict]` `[exp:never]`
- **MUST NOT** use `dangerouslySetInnerHTML`. `[review]` `[src:security]` `[exp:never]`
- **MUST NOT** use default exports for components (except `page.tsx` and
  `layout.tsx`). `[review]` `[src:architecture]` `[exp:never]`
- **MUST NOT** use `class` components (exception: `ErrorBoundary`). `[review]`
  `[src:react]` `[exp:never]`
- **MUST NOT** use JSDoc for type annotations — use native TypeScript types.
  `[review]` `[src:ts-strict]` `[exp:never]`
- **MUST NOT** use Pages Router patterns (`getServerSideProps`,
  `getStaticProps`, etc.). `[review]` `[src:next-app-router]` `[exp:review-by:2026-Q4]`
- **MUST NOT** put business logic in UI (`src/components/ui/`) components.
  `[review]` `[src:architecture]` `[exp:never]`
- **MUST NOT** hardcode API URLs — read them from env vars via `process.env`.
  `[review]` `[src:security]` `[exp:never]`
- **MUST NOT** import from outside `src/` in application code. `[review]`
  `[src:architecture]` `[exp:never]`
- **MUST NOT** expose server-only secrets in `NEXT_PUBLIC_` env vars. `[review]`
  `[src:security]` `[exp:never]`
- **MUST NOT** mark work `Done` on self-assessment alone — record the exact
  verification commands run and their pass/fail (handoff `verification_run`).
  `[review]` `[src:verification]` `[exp:never]`

For library-specific "don'ts" (e.g. don't use raw `fetch()` when a configured
HTTP client exists), see the matching per-skill file.

---

## MUST (always-required structure & approvals)

- **MUST** keep the harness structure valid: `npm run check:harness` exits 0
  before every commit (wired into `.husky/pre-commit`). `[auto]` `[src:harness]`
  `[exp:never]`
- **MUST** keep `AGENTS.md` at or under 120 lines — it is an index, not a
  manual. `[auto]` (`check:harness` predicate) `[src:architecture]` `[exp:never]`
- **MUST** keep a per-module `ARCHITECTURE.md` in every top-level `src/`
  directory. `[auto]` (`check:harness` predicate) `[src:architecture]` `[exp:never]`
- **MUST** keep `PROGRESS.md` current — it is the cross-session State
  subsystem. That it is updated in the same commit as any `src/` change is
  `[auto]` (`scripts/check-state-staleness.mjs`, wired into `.husky/pre-commit`);
  whether the entry is _meaningful_ remains `[review]`. `[src:state]` `[exp:never]`
- **MUST** log durable decisions and harness-induced failure logs in
  `DECISIONS.md` (current "why"), keeping `PROGRESS.md` for volatile state only.
  `[review]` `[src:state]` `[exp:never]`
- **MUST** archive growing state files instead of letting them grow unbounded:
  roll completed `PROGRESS.md` entries into `docs/archive/progress/<YYYY-QN>.md`
  and keep the link under its `## Archive` source map. The `## Archive` header
  itself is `[auto]` (`check:harness` predicate); the rollover discipline is
  `[review]`. `[src:state]` `[exp:never]`
- **MUST** write agent memory to the project folder, never to a tool's personal
  session memory. `[review]` `[src:state]` `[exp:never]`
- **MUST** keep work-in-progress to one active task — complete and verify the
  current item before starting another. `[review]` `[src:process]` `[exp:never]`

### Human-in-Loop Checkpoints — MUST get human approval before:

All checkpoints are `[review]` `[src:approvals]` `[exp:never]`:

- Adding new packages
- Replacing core packages or changing migration-map defaults
- Major refactors across multiple files
- Auth provider changes
- Proxy matcher or route-gating behavior changes
- API route creation (security review)
- Database schema changes
- Root instruction file edits (`AGENTS.md`, `CONSTRAINTS.md`)
- Workflow-document ownership changes
- Deployment to production

---

## How these rules are enforced

| Layer                       | Enforces                                                              |
| --------------------------- | --------------------------------------------------------------------- |
| `eslint.config.mjs`               | `[auto]` lint rules (`no-var`, `no-console`, `'use client'` in pages) |
| `scripts/check-harness.mjs`       | `[auto]` structural rules (file/section/line-count predicates)        |
| `scripts/check-state-staleness.mjs` | `[auto]` State currency: `src/` change ⇒ `PROGRESS.md` staged too   |
| `.husky/pre-commit`               | Runs all three on every commit (ACID Consistency)                     |
| Human reviewer                    | All `[review]` rules                                                  |
