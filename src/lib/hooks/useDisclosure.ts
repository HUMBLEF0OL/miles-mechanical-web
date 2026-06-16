'use client'

import { useCallback, useState } from 'react'

interface UseDisclosureReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export function useDisclosure(initialState = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialState)
  return {
    isOpen,
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
    toggle: useCallback(() => setIsOpen((s) => !s), []),
  }
}
