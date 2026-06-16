import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDisclosure } from '../useDisclosure'

describe('useDisclosure', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current.isOpen).toBe(false)
  })

  it('starts open when initialState is true', () => {
    const { result } = renderHook(() => useDisclosure(true))
    expect(result.current.isOpen).toBe(true)
  })

  it('opens via open()', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)
  })

  it('closes via close()', () => {
    const { result } = renderHook(() => useDisclosure(true))
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })

  it('toggles via toggle()', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => result.current.toggle())
    expect(result.current.isOpen).toBe(true)
    act(() => result.current.toggle())
    expect(result.current.isOpen).toBe(false)
  })

  it('open() is idempotent', () => {
    const { result } = renderHook(() => useDisclosure(true))
    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)
  })

  it('close() is idempotent', () => {
    const { result } = renderHook(() => useDisclosure(false))
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })
})
