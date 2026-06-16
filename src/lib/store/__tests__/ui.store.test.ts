import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useUIStore } from '../ui.store'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
}))

const ui = () => useUIStore.getState().ui

describe('useUIStore', () => {
  beforeEach(() => {
    // Reset store state
    ui().sidebar.setOpen(true)
    ui().loading.setGlobal(false)
  })

  describe('sidebar', () => {
    it('starts open by default', () => {
      expect(ui().sidebar.isOpen).toBe(true)
    })

    it('toggles sidebar', () => {
      ui().sidebar.toggle()
      expect(ui().sidebar.isOpen).toBe(false)
      ui().sidebar.toggle()
      expect(ui().sidebar.isOpen).toBe(true)
    })

    it('sets sidebar open state directly', () => {
      ui().sidebar.setOpen(false)
      expect(ui().sidebar.isOpen).toBe(false)
    })
  })

  describe('toasts', () => {
    it('delegates to sonner toast methods', async () => {
      const { toast } = await import('sonner')
      ui().notification.toast.success('Success!')
      ui().notification.toast.error('Error!')
      ui().notification.toast.warning('Warning!')
      ui().notification.toast.info('Info!')
      expect(toast.success).toHaveBeenCalledWith('Success!')
      expect(toast.error).toHaveBeenCalledWith('Error!')
      expect(toast.warning).toHaveBeenCalledWith('Warning!')
      expect(toast.info).toHaveBeenCalledWith('Info!')
    })
  })

  describe('global loading', () => {
    it('defaults to false', () => {
      expect(ui().loading.isGlobal).toBe(false)
    })

    it('sets global loading', () => {
      ui().loading.setGlobal(true)
      expect(ui().loading.isGlobal).toBe(true)
    })
  })
})
