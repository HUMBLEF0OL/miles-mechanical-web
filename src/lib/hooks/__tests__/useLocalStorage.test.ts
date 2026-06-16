import { describe, expect, it, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial value when key is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('returns stored value when key exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('stored-value')
  })

  it('updates state and localStorage on setValue', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    act(() => {
      result.current[1]('updated')
    })
    expect(result.current[0]).toBe('updated')
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated')
  })

  it('supports updater function', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0))
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    expect(result.current[0]).toBe(1)
    expect(JSON.parse(localStorage.getItem('counter')!)).toBe(1)
  })

  it('handles objects', () => {
    const initial = { name: 'test' }
    const { result } = renderHook(() => useLocalStorage('obj-key', initial))
    act(() => {
      result.current[1]({ name: 'updated' })
    })
    expect(result.current[0]).toEqual({ name: 'updated' })
  })

  it('handles corrupted JSON in localStorage gracefully', () => {
    localStorage.setItem('bad-key', 'not-json')
    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })
})
