import { describe, expect, it } from 'vitest'
import {
  formatDate,
  formatRelativeTime,
  toISOString,
  formatCurrency,
  formatCentsAsCurrency,
  formatCompactNumber,
  formatPercent,
  truncate,
  capitalize,
  toTitleCase,
  slugToLabel,
} from '../format'

// ─── Date ───────────────────────────────────────────────────

describe('formatDate', () => {
  it('formats a Date object', () => {
    const result = formatDate(new Date(2026, 0, 15))
    expect(result).toBe('Jan 15, 2026')
  })

  it('formats an ISO string', () => {
    const result = formatDate('2026-06-01T12:00:00Z')
    expect(result).toBe('Jun 1, 2026')
  })

  it('formats a timestamp number', () => {
    const result = formatDate(new Date(2026, 3, 8).getTime())
    expect(result).toBe('Apr 8, 2026')
  })

  it('supports custom pattern', () => {
    const result = formatDate('2026-01-15T00:00:00Z', 'yyyy/MM/dd')
    expect(result).toBe('2026/01/15')
  })

  it('returns dash for invalid date string', () => {
    expect(formatDate('invalid')).toBe('—')
  })
})

describe('formatRelativeTime', () => {
  it('returns a relative string', () => {
    const result = formatRelativeTime(new Date())
    expect(result).toContain('ago')
  })

  it('returns dash for invalid date', () => {
    expect(formatRelativeTime('invalid')).toBe('—')
  })
})

describe('toISOString', () => {
  it('converts a Date to ISO string', () => {
    const result = toISOString(new Date('2026-01-01T00:00:00Z'))
    expect(result).toBe('2026-01-01T00:00:00.000Z')
  })

  it('returns empty string for invalid date', () => {
    expect(toISOString('invalid')).toBe('')
  })
})

// ─── Currency ───────────────────────────────────────────────

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats with custom currency', () => {
    const result = formatCurrency(1000, 'EUR', 'de-DE')
    expect(result).toContain('1.000')
  })
})

describe('formatCentsAsCurrency', () => {
  it('converts cents to dollars', () => {
    expect(formatCentsAsCurrency(1999)).toBe('$19.99')
  })

  it('handles zero', () => {
    expect(formatCentsAsCurrency(0)).toBe('$0.00')
  })
})

// ─── Numbers ────────────────────────────────────────────────

describe('formatCompactNumber', () => {
  it('formats large numbers compactly', () => {
    expect(formatCompactNumber(1200)).toBe('1.2K')
  })

  it('formats millions', () => {
    expect(formatCompactNumber(2_500_000)).toBe('2.5M')
  })

  it('keeps small numbers as-is', () => {
    expect(formatCompactNumber(42)).toBe('42')
  })
})

describe('formatPercent', () => {
  it('formats as percentage', () => {
    expect(formatPercent(0.756)).toBe('75.6%')
  })

  it('supports custom decimals', () => {
    expect(formatPercent(0.33333, 2)).toBe('33.33%')
  })
})

// ─── Strings ────────────────────────────────────────────────

describe('truncate', () => {
  it('returns original if shorter than max', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates with ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello…')
  })

  it('handles empty string', () => {
    expect(truncate('', 5)).toBe('')
  })
})

describe('capitalize', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles single character', () => {
    expect(capitalize('a')).toBe('A')
  })
})

describe('toTitleCase', () => {
  it('converts to title case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
  })
})

describe('slugToLabel', () => {
  it('converts slug to label', () => {
    expect(slugToLabel('user-profile')).toBe('User Profile')
  })

  it('handles single word', () => {
    expect(slugToLabel('dashboard')).toBe('Dashboard')
  })
})
