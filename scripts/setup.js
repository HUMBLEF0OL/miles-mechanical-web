#!/usr/bin/env node
/**
 * @Author: Amit Rana
 * @Date:   2026-04-04 15:47:02
 * @Last Modified by:   Amit Rana
 * @Last Modified time: 2026-05-03 12:44:28
 */
/* eslint-disable no-console */

/**
 * Starter Interactive Setup Script
 * Run: node scripts/setup.js
 *
 * Personalizes the boilerplate for a specific project:
 *  - Renames the app
 *  - Creates .env.local
 *  - Installs dependencies
 *  - Initializes git hooks
 *  - Runs initial validation
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RED = '\x1b[31m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'
const DIM = '\x1b[2m'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

/** @param {string} question @returns {Promise<string>} */
function ask(question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())))
}

/** @param {string} cmd @param {string} [label] */
function run(cmd, label) {
  if (label) process.stdout.write(`  ${DIM}${label}...${RESET} `)
  try {
    execSync(cmd, { cwd: ROOT, stdio: label ? 'pipe' : 'inherit' })
    if (label) console.log(`${GREEN}✓${RESET}`)
    return true
  } catch (e) {
    if (label) console.log(`${RED}✕${RESET}`)
    if (e.stderr) console.error(e.stderr.toString())
    return false
  }
}

function banner() {
  console.log(`
${BOLD}${BLUE}
  ██████╗  █████╗ ███████╗███████╗██╗     ██╗███╗   ██╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██╔════╝██║     ██║████╗  ██║██╔════╝
  ██████╔╝███████║███████╗█████╗  ██║     ██║██╔██╗ ██║█████╗
  ██╔══██╗██╔══██║╚════██║██╔══╝  ██║     ██║██║╚██╗██║██╔══╝
  ██████╔╝██║  ██║███████║███████╗███████╗██║██║ ╚████║███████╗
  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
           ███╗   ██╗███████╗██╗  ██╗████████╗
           ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝
           ██╔██╗ ██║█████╗   ╚███╔╝    ██║
           ██║╚██╗██║██╔══╝   ██╔██╗    ██║
           ██║ ╚████║███████╗██╔╝ ██╗   ██║
           ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝
${RESET}
  ${DIM}The vibe-coding-ready Next.js boilerplate — Starter${RESET}
${YELLOW}                                                        by HUMBLEFOOL${RESET}
  `)
}

async function main() {
  banner()

  // ─── Prerequisites ─────────────────────────────────────────────────────────
  console.log(`${BOLD}Checking prerequisites...${RESET}`)
  const nodeVersion = process.versions.node.split('.')[0]
  if (parseInt(nodeVersion) < 20) {
    console.error(`${RED}✕ Node.js 20+ required. Current: v${process.versions.node}${RESET}`)
    process.exit(1)
  }
  console.log(`${GREEN}✓ Node.js v${process.versions.node}${RESET}`)

  // ─── Project Info ──────────────────────────────────────────────────────────
  console.log(`\n${BOLD}Project Setup${RESET}`)
  console.log(`${DIM}Press Enter to accept defaults shown in [brackets]${RESET}\n`)

  const projectName = (await ask(`Project name ${DIM}[my-app]${RESET}: `)) || 'my-app'
  const appDisplayName =
    (await ask(`App display name ${DIM}[${projectName}]${RESET}: `)) || projectName
  const appUrl =
    (await ask(`App URL ${DIM}[http://localhost:3000]${RESET}: `)) || 'http://localhost:3000'
  const apiUrl = (await ask(`API base URL ${DIM}[${appUrl}/api]${RESET}: `)) || `${appUrl}/api`
  const appDescription =
    (await ask(`App description ${DIM}[A production-ready Next.js app]${RESET}: `)) ||
    'A production-ready Next.js app'

  console.log(`\n${BOLD}Auth Provider${RESET}`)
  console.log(`  ${DIM}1${RESET} custom   ${DIM}← JWT / backend session (default)${RESET}`)
  console.log(`  ${DIM}${RESET}`)
  console.log(`  ${DIM}To add Clerk or NextAuth, see docs/AUTH_PATTERN.md${RESET}`)
  const authChoice = (await ask(`Choose auth provider ${DIM}[1]${RESET}: `)) || '1'
  const AUTH_MAP = { 1: 'custom' }
  const authProvider = AUTH_MAP[authChoice] ?? 'custom'

  // ─── Update package.json name ──────────────────────────────────────────────
  console.log(`\n${BOLD}Configuring project...${RESET}`)
  const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-')

  const pkgPath = path.join(ROOT, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  pkg.name = projectSlug
  pkg.description = appDescription
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`${GREEN}✓ package.json updated${RESET}`)

  // ─── Create .env.local ────────────────────────────────────────────────────
  const envExample = fs.readFileSync(path.join(ROOT, '.env.example'), 'utf8')
  const envLocal = envExample
    .replace('http://localhost:3000', appUrl)
    .replace('My App', appDisplayName)
    .replace(
      'NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api',
      `NEXT_PUBLIC_API_BASE_URL=${apiUrl}`
    )
    .replace('AUTH_PROVIDER=custom', `AUTH_PROVIDER=${authProvider}`)
    .replace(
      'AUTH_SECRET=change-this-to-a-random-32-char-string',
      `AUTH_SECRET=${generateSecret()}`
    )

  fs.writeFileSync(path.join(ROOT, '.env.local'), envLocal)
  console.log(`${GREEN}✓ .env.local created${RESET}`)

  // ─── Personalize project references ──────────────────────────────────────
  // The generator pre-fills PascalCase(projectName) across files. If the user
  // entered a different display name, sweep project files to apply it.
  const generatedPascal = toPascalCase(projectSlug)
  if (appDisplayName !== generatedPascal) {
    console.log(`\n${BOLD}Personalizing project references...${RESET}`)

    const replacementPairs = [
      [`${generatedPascal}User`, `${toPascalCase(appDisplayName)}User`],
      [generatedPascal, appDisplayName],
    ]

    const sweepFiles = [
      'README.md',
      'AGENTS.md',
      'docs/ARCHITECTURE.md',
      'docs/PACKAGES.md',
      'docs/WORKFLOWS.md',
      'src/config/env.ts',
      'src/app/page.tsx',
      'src/components/shared/landing/HeroSection.tsx',
      'src/lib/auth/adapter.ts',
      'src/lib/auth/index.ts',
      'src/lib/hooks/useAuth.ts',
      'e2e/smoke.spec.ts',
    ].map((p) => path.join(ROOT, p))

    // Walk .claude/ and .github/instructions/ for agent files
    const agentFiles = [
      ...collectFiles(path.join(ROOT, '.claude')),
      ...collectFiles(path.join(ROOT, '.github', 'instructions')),
    ].filter((f) => /\.(md|ts|tsx)$/.test(f))

    let sweepCount = 0
    for (const filePath of [...sweepFiles, ...agentFiles]) {
      if (replaceInFile(filePath, replacementPairs)) sweepCount++
    }
    console.log(`${GREEN}✓ Personalized ${sweepCount} file(s)${RESET}`)
  }

  // ─── Reset CHANGELOG ──────────────────────────────────────────────────────
  const resetCL = await ask(`\nReset CHANGELOG.md to a clean slate? ${DIM}[Y/n]${RESET}: `)
  if (!resetCL || resetCL.toLowerCase() === 'y') {
    const freshCL =
      `# Changelog\n\n` +
      `All notable changes to ${appDisplayName} will be documented in this file.\n\n` +
      `The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\n` +
      `and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n` +
      `## [Unreleased]\n`
    fs.writeFileSync(path.join(ROOT, 'CHANGELOG.md'), freshCL)
    console.log(`${GREEN}✓ CHANGELOG.md reset${RESET}`)
  }

  // ─── Switch auth adapter ───────────────────────────────────────────────────
  // Only 'custom' is bundled. To add a new provider, create an adapter in
  // src/lib/auth/providers/ following docs/AUTH_PATTERN.md, then update this map.
  if (authProvider !== 'custom') {
    console.log(
      `${YELLOW}⚠ Auth provider '${authProvider}' is not bundled. Create an adapter first — see docs/AUTH_PATTERN.md${RESET}`
    )
  }

  // ─── Install dependencies ─────────────────────────────────────────────────
  console.log(`\n${BOLD}Installing dependencies...${RESET}`)
  const installOk = run('npm install', 'npm install')
  if (!installOk) {
    console.error(`${RED}Dependency installation failed. Fix errors above and re-run.${RESET}`)
    process.exit(1)
  }

  // Install auth-specific package
  if (authProvider === 'clerk') run('npm install @clerk/nextjs', 'Installing @clerk/nextjs')
  if (authProvider === 'nextauth') run('npm install next-auth', 'Installing next-auth')

  // ─── Git setup ────────────────────────────────────────────────────────────
  console.log(`\n${BOLD}Setting up git...${RESET}`)
  const isGitRepo = fs.existsSync(path.join(ROOT, '.git'))
  if (!isGitRepo) run('git init', 'git init')
  run('npx husky init', 'Initializing Husky')

  // ─── Validation ───────────────────────────────────────────────────────────
  console.log(`\n${BOLD}Running validation...${RESET}`)
  run('npm run lint', 'Lint check')
  run('npm run format:check', 'Format check')
  run('npm run test:run', 'Unit tests')

  // ─── Initial commit ───────────────────────────────────────────────────────
  const makeCommit = await ask(`\nCreate initial commit? ${DIM}[Y/n]${RESET}: `)
  if (!makeCommit || makeCommit.toLowerCase() === 'y') {
    run('git add -A', 'Staging files')
    run(
      `git commit -m "feat: initialize ${projectName} from ${'Baseline' + 'Next'} boilerplate"`,
      'Initial commit'
    )
  }

  // ─── Done ─────────────────────────────────────────────────────────────────
  console.log(`
${GREEN}${BOLD}✅ Starter setup complete!${RESET}

${BOLD}Project:${RESET}   ${appDisplayName}
${BOLD}Auth:${RESET}      ${authProvider}
${BOLD}API URL:${RESET}   ${apiUrl}

${BOLD}Next steps:${RESET}
  ${DIM}1.${RESET} Fill in any remaining values in ${BOLD}.env.local${RESET}
  ${DIM}2.${RESET} Run ${BOLD}npm run dev${RESET} and open ${BLUE}${appUrl}${RESET}
  ${DIM}3.${RESET} Read ${BOLD}docs/WORKFLOWS.md${RESET} for git conventions
  ${DIM}4.${RESET} Run ${BOLD}npm run update:check${RESET} quarterly to stay current

${DIM}Happy building! ⚡${RESET}
  `)

  rl.close()
}

/** @returns {string} */
function generateSecret() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/** Convert any string to PascalCase, stripping non-alphanumeric characters */
function toPascalCase(str) {
  return str
    .replace(/[-_\s]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^(.)/, (chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '')
}

/** Replace all string pairs in a file. Returns true if the file was changed. */
function replaceInFile(filePath, pairs) {
  if (!fs.existsSync(filePath)) return false
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content
  for (const [from, to] of pairs) {
    content = content.split(from).join(to)
  }
  if (content === original) return false
  fs.writeFileSync(filePath, content)
  return true
}

/** Recursively collect all file paths under a directory */
function collectFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collectFiles(full, results)
    else results.push(full)
  }
  return results
}

main().catch((err) => {
  console.error(`${RED}Setup failed:${RESET}`, err.message)
  process.exit(1)
})
