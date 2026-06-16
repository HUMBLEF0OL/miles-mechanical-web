#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * State Staleness Checker (pre-commit only)
 * Run: node scripts/check-state-staleness.mjs
 *
 * Mechanizes the State subsystem's Atomicity rule (PROGRESS.md header /
 * docs/VERIFICATION.md): "one logical change updates PROGRESS.md in the same
 * commit". If a commit stages application code under src/ but does NOT stage
 * PROGRESS.md, the cross-session State subsystem silently drifts from reality —
 * a fresh session reads stale progress.
 *
 * This is intentionally a SEPARATE script from check-harness.mjs: that checker
 * is git-agnostic and CI-safe (structural validity, runnable anywhere), whereas
 * this one inspects the git index and is meaningful only at commit time. Keeping
 * them apart preserves check-harness's "zero-dependency, runs anywhere" contract.
 *
 * Scope: a code change is any staged path under src/. The check enforces only
 * that PROGRESS.md is touched alongside it — whether the entry is *meaningful*
 * stays a [review] (human) gate. DECISIONS.md is deliberately NOT required:
 * not every code change is a durable decision, so forcing it would train people
 * to write noise.
 *
 * Escape hatch (mirrors SKIP_TYPECHECK in .husky/pre-commit): set
 * SKIP_STATE_CHECK=1 for a genuinely state-irrelevant commit, e.g.
 *   SKIP_STATE_CHECK=1 git commit -m "chore: fix typo"
 */

import { execSync } from 'child_process'

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

if (process.env.SKIP_STATE_CHECK === '1') {
  console.log(`${BOLD}State staleness check${RESET} skipped (SKIP_STATE_CHECK=1)\n`)
  process.exit(0)
}

// Staged paths being committed. --diff-filter=ACMR = Added/Copied/Modified/Renamed
// (skip pure deletions). git always emits forward slashes, so this is correct on
// Windows too.
let staged = []
try {
  staged = execSync('git diff --cached --name-only --diff-filter=ACMR', {
    encoding: 'utf8',
  })
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
} catch {
  // No git, no index, or no HEAD yet (e.g. a hook running outside a repo).
  // Fail open: this gate is a commit-time convenience, not a security control.
  console.log(`${BOLD}State staleness check${RESET} skipped (no git index available)\n`)
  process.exit(0)
}

const codeChanges = staged.filter((f) => f.startsWith('src/'))
const progressStaged = staged.includes('PROGRESS.md')

console.log(`\n${BOLD}State staleness check${RESET}\n`)

if (codeChanges.length === 0) {
  console.log(`${GREEN}✓${RESET} no staged src/ changes — PROGRESS.md update not required\n`)
  process.exit(0)
}

if (progressStaged) {
  console.log(
    `${GREEN}✓${RESET} ${codeChanges.length} staged src/ change(s) and PROGRESS.md updated together${RESET}\n`
  )
  process.exit(0)
}

console.log(
  `${RED}✗ src/ changed but PROGRESS.md was not updated in this commit${RESET}\n` +
    `   staged code: ${codeChanges.slice(0, 5).join(', ')}${codeChanges.length > 5 ? `, +${codeChanges.length - 5} more` : ''}\n` +
    `   why:  PROGRESS.md is the cross-session State subsystem; its Atomicity rule\n` +
    `         is "one logical change updates this file in the same commit". Leaving\n` +
    `         it stale means a fresh session reads progress that no longer matches\n` +
    `         the code.\n` +
    `   fix:  record this change under the right PROGRESS.md section (Current Focus /\n` +
    `         In Progress / Done) and \`git add PROGRESS.md\`, then re-commit. For a\n` +
    `         genuinely state-irrelevant commit, run: SKIP_STATE_CHECK=1 git commit ...\n`
)
process.exit(1)
