# Development Workflows

Git, branching, commits, and day-to-day development conventions for this
project. These are **stack-neutral**: the same workflow applies regardless of
which slots you selected at scaffold time. For library-specific guidance (how to
write a test, how to add a service, how to define a schema), read the matching
per-skill file installed for your agent platform.

This file is the **process index**. Two sibling docs own the rest:

- **Agent coordination** — handoff contract, routing, feature-creation order,
  agent memory, session clock-in/out → [`AGENT_OPS.md`](AGENT_OPS.md)
- **Verification & validity** — verification commands, harness check, Fresh
  Session Test, ACID discipline, state archival, instruction audit →
  [`VERIFICATION.md`](VERIFICATION.md)

---

## Git Strategy

### Branches

- `main` — Production-ready code
- `develop` — Integration branch (optional, for teams)
- `feat/*` — New features
- `fix/*` — Bug fixes
- `chore/*` — Maintenance, deps, tooling
- `docs/*` — Documentation changes

### Commit Format (Conventional Commits)

```
<type>(<scope>): <description>

Types: feat | fix | docs | style | refactor | test | chore | perf | ci
```

Examples:

```
feat(auth): add signup form
fix(api): handle timeout errors
chore(deps): bump data-fetching client to latest minor
test(utils): add cn utility tests
```

Commit discipline (ACID) lives in [`VERIFICATION.md`](VERIFICATION.md) →
"ACID Commit Discipline".

---

## Agent-Driven Development Workflow

### Starting a New Feature

1. **Describe** the feature to your AI tool (Claude Code or Copilot)
2. **Agent scaffolds** using the scaffold agent — generates types, schema, service, hook, components, page
3. **Review** the generated code — check naming, patterns, edge cases
4. **Validate** using the validator agent — quality score, security check
5. **Test** — agent generates tests, you verify they pass
6. **Docs sync** — run docs agent when architecture/auth/package/workflow surfaces changed
7. **Commit** — conventional commit format

### Human-in-Loop Checkpoints

The actions that require human approval are owned by **`CONSTRAINTS.md` →
Human-in-Loop Checkpoints**. Pause for review there, plus before merging to
`main`.

### Using Agents

Invoke the agent that owns the surface you are changing (see the Boundary
Contract in `AGENTS.md`). The inter-agent handoff contract, the agent routing
map, and feature-creation order live in [`AGENT_OPS.md`](AGENT_OPS.md).

---

## Testing Strategy

| Type        | Location                                 | When         |
| ----------- | ---------------------------------------- | ------------ |
| Unit        | `src/**/__tests__/*.test.ts`             | Every commit |
| Component   | `src/components/**/__tests__/*.test.tsx` | Every commit |
| Integration | `e2e/api/**/*.spec.ts`                   | Pre-merge    |
| E2E         | `e2e/app/**/*.spec.ts`                   | Pre-merge    |

The exact unit-test runner and integration-test runner are determined by the
`testing` slot you selected at scaffold time. Run scripts are listed in
`package.json` and in the testing skill. Verification commands by phase live in
[`VERIFICATION.md`](VERIFICATION.md).

---

## Package Update Strategy

### Monthly Check

```bash
npm run update:check
```

Reviews: outdated packages, security vulnerabilities, Node.js compatibility.

### Quarterly Update

1. Create update branch: `git checkout -b chore/quarterly-update`
2. Run the updater agent (if installed) or manually bump
3. Run the full check
4. Commit: `chore(deps): quarterly update`
5. Merge to main

---

## Design Specs & Implementation Plans

- **Design specs** (brainstorming/design docs) → `docs/specs/<YYYY-MM-DD>-<topic>-design.md`
- **Implementation plans** → `docs/plans/<slug>-plan.md`
- Do **not** use `docs/superpowers/specs/` or `docs/superpowers/plans/` — this
  project overrides those upstream defaults with the paths above.
