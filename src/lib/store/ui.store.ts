/**
 * @Author: Amit Rana
 * @Date:   2026-04-05 14:12:54
 * @Last Modified by:   Amit Rana
 * @Last Modified time: 2026-05-01 11:27:11
 */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { toast } from 'sonner'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface SidebarSlice {
  isOpen: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

interface NotificationSlice {
  toast: {
    success: (message: string) => void
    error: (message: string) => void
    warning: (message: string) => void
    info: (message: string) => void
  }
}

interface LoadingSlice {
  isGlobal: boolean
  setGlobal: (loading: boolean) => void
}

interface UISlice {
  sidebar: SidebarSlice
  notification: NotificationSlice
  loading: LoadingSlice
}

interface UIState {
  ui: UISlice
}

export const useUIStore = create<UIState>()(
  devtools(
    () => ({
      ui: {
        sidebar: {
          isOpen: true,
          toggle: () =>
            useUIStore.setState((s) => ({
              ui: { ...s.ui, sidebar: { ...s.ui.sidebar, isOpen: !s.ui.sidebar.isOpen } },
            })),
          setOpen: (open) =>
            useUIStore.setState((s) => ({
              ui: { ...s.ui, sidebar: { ...s.ui.sidebar, isOpen: open } },
            })),
        },

        notification: {
          toast: {
            success: (message: string) => toast.success(message),
            error: (message: string) => toast.error(message),
            warning: (message: string) => toast.warning(message),
            info: (message: string) => toast.info(message),
          },
        },

        loading: {
          isGlobal: false,
          setGlobal: (loading: boolean) =>
            useUIStore.setState((s) => ({
              ui: { ...s.ui, loading: { ...s.ui.loading, isGlobal: loading } },
            })),
        },
      },
    }),
    { name: 'ui-store', enabled: process.env.NODE_ENV === 'development' }
  )
)
