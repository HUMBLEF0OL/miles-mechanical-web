import { describe, it, expect } from 'vitest'
import { publicRoutes, privatePaths } from '../registry'
import { seoRoutes } from '@/config'

const PRIVATE_ROUTE_KEYS = ['login', 'signup', 'forgotPassword', 'dashboard', 'profile', 'settings']

describe('seoRoutes', () => {
  it('contains no private route keys', () => {
    const keys = Object.keys(seoRoutes)
    for (const priv of PRIVATE_ROUTE_KEYS) {
      expect(keys).not.toContain(priv)
    }
  })
})

describe('publicRoutes', () => {
  it('returns only indexable routes with their path', () => {
    const routes = publicRoutes()
    expect(routes.every((r) => r.indexable)).toBe(true)
    expect(routes.find((r) => r.key === 'home')?.path).toBe('/')
  })
})

describe('privatePaths', () => {
  it('lists every private/auth path and excludes home', () => {
    const paths = privatePaths()
    expect(paths).toContain('/login')
    expect(paths).toContain('/dashboard')
    expect(paths).toContain('/settings')
    expect(paths).not.toContain('/')
  })
})
