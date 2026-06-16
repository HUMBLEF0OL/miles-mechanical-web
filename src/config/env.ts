/**
 * Centralized, typed access to environment variables.
 *
 * Why this file exists:
 *  - Single source of truth for env var names + defaults (kept in lockstep
 *    with `.env.example` declared in the foundations module manifest).
 *  - Eagerly fails on bad values (e.g. a non-numeric PORT) rather than
 *    surfacing a confusing runtime error deep in the request lifecycle.
 *  - Distinguishes server-only vars from `NEXT_PUBLIC_*` ones so accidental
 *    client imports of secrets are easy to spot in code review.
 *
 * Usage:
 *   import { env } from '@/config'
 *   apiClient.extend({ prefixUrl: env.NEXT_PUBLIC_API_BASE_URL })
 *
 * Do NOT read `process.env.X` directly elsewhere — go through this module so
 * defaults stay consistent and the type system enforces the contract.
 */

function readString(name: string, fallback: string): string {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  return raw
}

function readPort(name: string, fallback: number): number {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`Invalid ${name}: "${raw}" is not a valid port (1-65535)`)
  }
  return parsed
}

function readNodeEnv(): 'development' | 'test' | 'production' {
  const raw = process.env.NODE_ENV
  if (raw === 'production' || raw === 'test') return raw
  return 'development'
}

/**
 * Public origin for absolute links + metadata. Resolution order (server-side):
 *   1. `NEXT_PUBLIC_APP_URL` — the explicit, authoritative origin.
 *   2. Vercel's injected `VERCEL_PROJECT_PRODUCTION_URL` (stable prod domain)
 *      then `VERCEL_URL` (per-deployment) — so previews/deploys work without
 *      manual config. These are host-only (no scheme), so `https://` is added.
 *   3. `http://localhost:3000` fallback for local dev.
 *
 * Fails loud at build/SSR time if a production deploy still resolves to
 * localhost — otherwise every canonical, Open Graph, sitemap, and JSON-LD URL
 * ships wrong. Guarded to the server: this var is read dynamically (not
 * inlined), so on the client it always falls back to localhost and the check
 * there would be a false positive.
 *
 * The returned origin is always normalized to drop a trailing slash, matching
 * the `trailingSlash: false` canonical policy in `site.ts` — a trailing slash
 * would otherwise produce double-slash URLs (e.g. `https://host//en`).
 */
function normalizeOrigin(url: string): string {
  return url.replace(/\/+$/, '')
}

function readAppUrl(): string {
  const explicit = readString('NEXT_PUBLIC_APP_URL', '')
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? ''
  const url =
    explicit !== ''
      ? explicit
      : vercelHost !== ''
        ? `https://${vercelHost}`
        : 'http://localhost:3000'

  if (
    typeof window === 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    /localhost|127\.0\.0\.1/.test(url)
  ) {
    throw new Error(
      'NEXT_PUBLIC_APP_URL is unset (defaulting to localhost) in a production build. ' +
      'Set it to the real public origin (e.g. https://milesmechanicalac.vercel.app) or ' +
      'every canonical, Open Graph, sitemap, and JSON-LD URL will be wrong.'
    )
  }
  return normalizeOrigin(url)
}

export const env = {
  // ─── Runtime ──────────────────────────────────────────────────────────────
  NODE_ENV: readNodeEnv(),
  PORT: readPort('PORT', 3000),

  // ─── Public (safe to expose to the browser) ───────────────────────────────
  NEXT_PUBLIC_APP_NAME: readString('NEXT_PUBLIC_APP_NAME', 'Miles Mechanical'),
  NEXT_PUBLIC_APP_URL: readAppUrl(),
  NEXT_PUBLIC_API_BASE_URL: readString('NEXT_PUBLIC_API_BASE_URL', '/api'),
  // Literal `process.env.NEXT_PUBLIC_*` reference (not readString) so Next.js
  // inlines it into the client bundle — dynamic lookups aren't replaced, so the
  // value would be undefined in the browser. Empty string = "no endpoint".
  NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',
} as const

export const isProd = env.NODE_ENV === 'production'
export const isDev = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'
