'use client'

import { useCallback, useState } from 'react'

function readLocalStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.localStorage.getItem(key)
    return item !== null ? (JSON.parse(item) as T) : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => readLocalStorage(key, initialValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          return valueToStore
        })
      } catch {
        // Ignore write errors
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
