/**
 * Auth cookie configuration — single source of truth.
 * Used by BFF API routes (login, logout, me) and the proxy middleware.
 */
export const authConfig = {
  cookieName: 'auth-token',
  cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
} as const
