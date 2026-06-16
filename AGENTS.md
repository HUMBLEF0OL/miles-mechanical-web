# AGENTS.md — Base AI Rules (All Tools)

> **The single root instruction file — index & source of truth.** Every AI tool
> (Claude Code, Copilot, Cursor, …) reads this one file. It owns the _pointers_
> to the authoritative harness files: boundary ownership lives here; hard rules
> live in `CONSTRAINTS.md`; process lives in `docs/WORKFLOWS.md`; cross-session
> state lives in `PROGRESS.md`. Any tool-specific extension must not redefine
> ownership or contracts. Keep this file an index — `npm run check:harness`
> fails if it exceeds 120 lines.

This file is **stack-neutral**. It names no libraries and carries no code
templates. Library-specific patterns live in the per-skill files installed for
your selected agent platform.

---

## Project Identity

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · Node
pinned in `.nvmrc`.

- **Full stack & versions:** `docs/PACKAGES.md`, `package.json`
- **Architecture:** `docs/ARCHITECTURE.md` + per-module `src/<module>/ARCHITECTURE.md`
- **Coding rules (no `any`, exports, `var`, `'use client'`, …):** `CONSTRAINTS.md`

---

## Per-Skill Guidance Index

| Skill            | What it owns                                   |
| ---------------- | ---------------------------------------------- |
| architecture     | File organization, naming, imports, barrels    |
| components       | Server/client component patterns               |
| api              | Service layer + API routes                     |
| auth             | Auth adapter usage and provider implementation |
| data-fetching    | Hooks, cache invalidation, request lifecycle   |
| state-management | Client state shape, decision tree              |
| forms            | Form state + validation wiring                 |
| validation       | Schema definition and parsing                  |
| testing          | Test layout, runner usage, mocking             |
| proxy            | Route protection and middleware                |
| security         | OWASP boundary checks for this stack           |
| migrations       | Package swap guides and migration maps         |
| routing          | App Router structure and route patterns        |
| i18n             | Locale routing, messages, translation wiring   |
| seo              | Config-driven metadata, sitemap, JSON-LD, GEO  |
| design-tokens    | Figma token sync and theming conventions       |
| error-handling   | Error boundaries and API error handling        |

> Only the skills you selected variants for are installed. The full catalog is
> shown for reference.

---

## Boundary Contract

- **Skills** define implementation patterns. **Agents** define orchestration
  decisions. If guidance conflicts, **`AGENTS.md` boundary rules win first**,
  then skill-specific rules apply inside that boundary.
- **Canonical conventions** (naming, imports, rules, structure, stack) live in
  the reference docs (`CONSTRAINTS.md`, `docs/ARCHITECTURE.md`, `docs/PACKAGES.md`).
  Skills and agents **apply** them; they must not restate or redefine them.
- **Proxy** owns request-time route gating in `src/proxy.ts`.
- **Auth** owns identity and session adapter usage in `src/lib/auth/` and auth
  API routes.
- **Docs agent** owns synchronization of docs and instruction surfaces after
  capability changes.
- **Validator** enforces conventions and contract adherence; it does not
  redesign architecture unless explicitly requested.

The development flow lives in `docs/WORKFLOWS.md`; the **Standard Handoff
Contract** and **Session Protocol** (clock-in/out) in `docs/AGENT_OPS.md`; the
**Fresh Session Test** and **ACID commit discipline** in `docs/VERIFICATION.md`.

---

## Where the rest lives

| Concern                                              | Canonical file                 |
| ---------------------------------------------------- | ------------------------------ |
| Hard MUST / MUST NOT rules + approvals               | `CONSTRAINTS.md`               |
| Startup-readiness / initialization phase             | `INITIALIZATION.md`            |
| Dev flow, git, commit format, testing, packages      | `docs/WORKFLOWS.md`            |
| Handoff, routing, feature order, memory, session     | `docs/AGENT_OPS.md`            |
| Verification, Fresh Session Test, ACID, CI, archival | `docs/VERIFICATION.md`         |
| Cross-session State (current "what")                 | `PROGRESS.md`                  |
| Durable decisions & rationale ("why")                | `DECISIONS.md`                 |
| Global architecture + key file locations             | `docs/ARCHITECTURE.md`         |
| Per-module proximity docs                            | `src/<module>/ARCHITECTURE.md` |

## Working agreement (all agents)

- Read relevant files before editing; make the **minimal** change — don't
  refactor unrelated code.
- Before writing library-specific code, consult the matching `.claude/skills/` file.
- **Agent memory** and **inter-agent handoffs**: see `docs/AGENT_OPS.md`.
