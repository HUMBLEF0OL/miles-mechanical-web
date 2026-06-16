#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Clean-Slate Reset
 * Run: node scripts/reset.mjs  (or: npm run reset)
 *
 * Wipes the accumulated project-specific context from this starter — state
 * files, completed specs/plans, archives, agent-learned facts, build caches —
 * back to pristine template form, while preserving 100% of the agentic
 * workflow machinery (.claude/, AGENTS.md, CONSTRAINTS.md, docs/ topic guides,
 * scripts/, .husky/, configs). Design: docs/specs/2026-06-16-clean-slate-reset-design.md.
 *
 * Intended to run in a COPY of the template (degit / folder copy), not the
 * pristine starter itself — the git re-init then erases nothing precious.
 *
 * Flags:
 *   --dry-run   list every file it would change/delete; touch nothing; exit 0.
 *   --yes       skip the typed RESET confirmation (for automation).
 *   --keep-git  skip the git history wipe (files-only reset).
 *
 * Zero runtime dependencies, same conventions as scripts/check-harness.mjs:
 * ESM, itemized console output, non-zero exit on failure.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLEAN = path.join(__dirname, 'clean-slate')

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BOLD = '\x1b[1m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')
const YES = args.includes('--yes')
const KEEP_GIT = args.includes('--keep-git')

// ─── Path helpers ──────────────────────────────────────────────────────────

const posix = (p) => p.split(path.sep).join('/')
const abs = (rel) => path.join(ROOT, rel)
const existsRel = (rel) => fs.existsSync(abs(rel))

/** Files directly under `dirRel` (relative to ROOT) whose name passes `keep === false`. */
function filesIn(dirRel, predicate) {
  const dir = abs(dirRel)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && predicate(e.name))
    .map((e) => posix(path.join(dirRel, e.name)))
}

/** Every file under `dirRel` (recursive) whose name passes `predicate`. */
function walkFiles(dirRel, predicate, acc = []) {
  const dir = abs(dirRel)
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const childRel = posix(path.join(dirRel, entry.name))
    if (entry.isDirectory()) walkFiles(childRel, predicate, acc)
    else if (predicate(entry.name)) acc.push(childRel)
  }
  return acc
}

// ─── Plan ──────────────────────────────────────────────────────────────────
// Build the full list of operations up front so --dry-run and the real run
// share identical logic. Each op is { kind: 'restore' | 'delete', from?, to | target, step }.

/** Snapshot → live restores (always applied; overwriting is idempotent). */
const RESTORES = [
  { from: 'PROGRESS.md', to: 'PROGRESS.md' },
  { from: 'DECISIONS.md', to: 'DECISIONS.md' },
  { from: 'CHANGELOG.md', to: 'CHANGELOG.md' },
  { from: 'agent-memory/validator/MEMORY.md', to: '.claude/agent-memory/validator/MEMORY.md' },
  { from: 'archive/progress/README.md', to: 'docs/archive/progress/README.md' },
  { from: 'archive/decisions/README.md', to: 'docs/archive/decisions/README.md' },
]

function buildOps() {
  const ops = []

  // Step 3 + 5 (restores): state files + archive READMEs.
  for (const r of RESTORES) {
    ops.push({ kind: 'restore', from: r.from, to: r.to, step: 'restore' })
  }

  // Step 4: delete completed specs/plans — *.md except templates (_*.md). .gitkeep
  // is not *.md so it is kept by construction.
  const isDeletableDoc = (name) => name.endsWith('.md') && !name.startsWith('_')
  for (const f of filesIn('docs/specs', isDeletableDoc))
    ops.push({ kind: 'delete', target: f, step: 'specs/plans' })
  for (const f of filesIn('docs/plans', isDeletableDoc))
    ops.push({ kind: 'delete', target: f, step: 'specs/plans' })

  // Step 5: delete dated archive files (anything other than README.md).
  const notReadme = (name) => name !== 'README.md'
  for (const f of filesIn('docs/archive/progress', notReadme))
    ops.push({ kind: 'delete', target: f, step: 'archives' })
  for (const f of filesIn('docs/archive/decisions', notReadme))
    ops.push({ kind: 'delete', target: f, step: 'archives' })

  // Step 6: clear learned facts — every file under .claude/agent-memory except
  // the MEMORY.md index files (the validator index is restored in step 3).
  for (const f of walkFiles('.claude/agent-memory', (name) => name !== 'MEMORY.md')) {
    ops.push({ kind: 'delete', target: f, step: 'agent-memory' })
  }

  // Step 7: clear build caches (regenerated on next build). node_modules is kept.
  for (const c of ['.next', 'tsconfig.tsbuildinfo']) {
    if (existsRel(c)) ops.push({ kind: 'delete', target: c, step: 'caches' })
  }

  return ops
}

const ops = buildOps()
const restores = ops.filter((o) => o.kind === 'restore')
const deletes = ops.filter((o) => o.kind === 'delete')

// ─── Print the plan ──────────────────────────────────────────────────────────

function printPlan() {
  console.log(`\n${BOLD}Clean-slate reset — plan${RESET}\n`)

  console.log(`${BOLD}Restore from scripts/clean-slate/ (overwrite):${RESET}`)
  for (const r of restores) console.log(`  ${GREEN}↻${RESET} ${r.to}`)

  if (deletes.length) {
    console.log(`\n${BOLD}Delete:${RESET}`)
    for (const d of deletes) console.log(`  ${RED}✗${RESET} ${d.target}`)
  } else {
    console.log(`\n${DIM}Nothing to delete (already clean).${RESET}`)
  }

  console.log(`\n${BOLD}Git:${RESET}`)
  if (KEEP_GIT) {
    console.log(`  ${DIM}— skipped (--keep-git): history preserved${RESET}`)
  } else {
    console.log(`  ${RED}✗${RESET} remove .git/ ${DIM}(wipes history)${RESET}`)
    console.log(
      `  ${GREEN}↻${RESET} git init (branch ${BOLD}main${RESET}) + git add -A ${DIM}(no commit — setup makes it)${RESET}`
    )
  }
}

// ─── Execute the file operations ───────────────────────────────────────────

function applyOps() {
  for (const r of restores) {
    const src = path.join(CLEAN, r.from)
    if (!fs.existsSync(src)) {
      console.error(`${RED}✕ missing snapshot: scripts/clean-slate/${r.from}${RESET}`)
      process.exit(1)
    }
    fs.mkdirSync(path.dirname(abs(r.to)), { recursive: true })
    fs.copyFileSync(src, abs(r.to))
  }
  for (const d of deletes) {
    fs.rmSync(abs(d.target), { recursive: true, force: true })
  }
  console.log(
    `${GREEN}✓${RESET} restored ${restores.length} file(s), deleted ${deletes.length} file(s)`
  )
}

function applyGit() {
  if (KEEP_GIT) {
    console.log(`${DIM}— git history preserved (--keep-git)${RESET}`)
    return
  }
  const git = (cmd) => execSync(cmd, { cwd: ROOT, stdio: 'pipe' })
  fs.rmSync(abs('.git'), { recursive: true, force: true })
  git('git init')
  // Set the initial branch to main without a commit (works on any git version).
  git('git symbolic-ref HEAD refs/heads/main')
  git('git add -A')
  console.log(`${GREEN}✓${RESET} fresh git repo on ${BOLD}main${RESET} (staged, no commit)`)
}

// ─── Verify (step 9) ──────────────────────────────────────────────────────────

function verify() {
  console.log(`\n${BOLD}Verifying harness gate (npm run check:harness)...${RESET}\n`)
  try {
    execSync('npm run check:harness', { cwd: ROOT, stdio: 'inherit' })
  } catch {
    console.error(
      `\n${RED}${BOLD}Reset broke the harness gate.${RESET} A snapshot likely dropped a required ` +
        `marker. Fix scripts/clean-slate/ and re-run.`
    )
    process.exit(1)
  }
}

// ─── Confirmation prompt ───────────────────────────────────────────────────

function confirm() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const wipe = KEEP_GIT ? '' : ` and ${BOLD}WIPE GIT HISTORY${RESET}`
    console.log(
      `\n${YELLOW}${BOLD}This is destructive${RESET}${YELLOW}: it will overwrite state files, delete the ` +
        `files listed above${wipe}.${RESET}`
    )
    rl.question(`Type ${BOLD}RESET${RESET} to proceed: `, (answer) => {
      rl.close()
      resolve(answer.trim() === 'RESET')
    })
  })
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  printPlan()

  if (DRY) {
    console.log(`\n${DIM}--dry-run: nothing was changed.${RESET}\n`)
    process.exit(0)
  }

  if (!YES) {
    const ok = await confirm()
    if (!ok) {
      console.log(`\n${DIM}Aborted — nothing changed.${RESET}\n`)
      process.exit(0)
    }
  }

  console.log()
  applyOps()
  applyGit()
  verify()

  console.log(`\n${GREEN}${BOLD}✅ Clean slate ready.${RESET}\n`)
  console.log(
    `${BOLD}Next:${RESET} run ${BOLD}npm run setup${RESET} to personalize and make the initial commit.\n`
  )
}

main().catch((err) => {
  console.error(`${RED}Reset failed:${RESET}`, err.message)
  process.exit(1)
})
