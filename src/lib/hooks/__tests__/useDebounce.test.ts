import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('does not update value before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    })

    rerender({ value: 'world' })
    vi.advanceTimersByTime(100)
    expect(result.current).toBe('hello')
  })

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    })

    rerender({ value: 'world' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('world')
  })

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'b' })
    vi.advanceTimersByTime(200)
    rerender({ value: 'c' })
    vi.advanceTimersByTime(200)
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe('c')
  })

  it('uses default delay of 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('updated')
  })
})
