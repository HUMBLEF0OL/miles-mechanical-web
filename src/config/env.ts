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

export const env = {
  // ─── Runtime ──────────────────────────────────────────────────────────────
  NODE_ENV: readNodeEnv(),
  PORT: readPort('PORT', 3000),

  // ─── Public (safe to expose to the browser) ───────────────────────────────
  NEXT_PUBLIC_APP_NAME: readString('NEXT_PUBLIC_APP_NAME', 'Starter'),
  NEXT_PUBLIC_APP_URL: readString('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  NEXT_PUBLIC_API_BASE_URL: readString('NEXT_PUBLIC_API_BASE_URL', '/api'),
} as const

export const isProd = env.NODE_ENV === 'production'
export const isDev = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'
