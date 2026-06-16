import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'

// ─── Date ───────────────────────────────────────────────────

export function formatDate(date: Date | string | number, pattern = 'MMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date)
  if (!isValid(d)) return '—'
  return format(d, pattern)
}

export function formatRelativeTime(date: Date | string | number): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date)
  if (!isValid(d)) return '—'
  return formatDistanceToNow(d, { addSuffix: true })
}

export function toISOString(date: Date | string | number): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date)
  if (!isValid(d)) return ''
  return d.toISOString()
}

// ─── Currency ───────────────────────────────────────────────

export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCentsAsCurrency(cents: number, currency = 'USD'): string {
  return formatCurrency(cents / 100, currency)
}

// ─── Numbers ────────────────────────────────────────────────

export function formatCompactNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

// ─── Strings ────────────────────────────────────────────────

export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}…`
}

export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (word) => capitalize(word.toLowerCase()))
}

export function slugToLabel(slug: string): string {
  return toTitleCase(slug.replace(/-/g, ' '))
}
