import { cn } from '@/lib/utils/cn'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed',
        'border-gray-300 bg-gray-50 px-6 py-16 text-center dark:border-gray-600 dark:bg-slate-800/50',
        className
      )}
    >
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-500">{icon}</div>}
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
