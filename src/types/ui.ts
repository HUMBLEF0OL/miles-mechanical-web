import type { ComponentType } from 'react'

export type Size = 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface NavItem {
  label: string
  href: string
  icon?: ComponentType
  children?: NavItem[]
}
