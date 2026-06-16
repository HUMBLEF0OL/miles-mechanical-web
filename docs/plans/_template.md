# <Feature> Implementation Plan

> **Status:** Draft — pending review
> **TSD:** `docs/tsd/<feature>.md`
> **Goal:** One sentence describing what this builds.

## Phase Overview

| #   | Phase        | Outcome                |
| --- | ------------ | ---------------------- |
| 1   | <phase name> | <user-visible outcome> |
| 2   | <phase name> | <user-visible outcome> |

## Cross-Cutting Conventions

- **Branch:** `feat/<feature>` from `dev`. One commit per task list item or per
  logical batch. Conventional Commits (`feat(...): ...`, `test(...): ...`).
- **TDD:** write the failing test first. Run it. Implement. Run it again. Commit.
- **DRY / YAGNI:** only build what the TSD calls for. Defer the rest.

---

## Phase 1 — <Phase Name>

**Goal:** <one sentence>

**Files:**

- Create: `path/to/file.ts`
- Modify: `path/to/existing.ts:LINE-LINE`
- Test: `tests/path/to/test.ts`

### Tasks

- [ ] **1.1 Write the failing test**

  ```ts
  // tests/path/to/test.ts
  it('does the thing', () => {
    expect(thing()).toBe('expected')
  })
  ```

- [ ] **1.2 Run the test — expect FAIL**

  Run: `npm test -- tests/path/to/test.ts`
  Expected: 1 failed.

- [ ] **1.3 Implement minimal code**

  ```ts
  // path/to/file.ts
  export function thing() {
    return 'expected'
  }
  ```

- [ ] **1.4 Run the test — expect PASS**

  Run: `npm test -- tests/path/to/test.ts`
  Expected: 1 passed.

- [ ] **1.5 Commit**

  ```bash
  git add path/to/file.ts tests/path/to/test.ts
  git commit -m "feat(<feature>): <what>"
  ```
