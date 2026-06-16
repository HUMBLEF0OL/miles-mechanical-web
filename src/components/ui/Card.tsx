import { cn } from '@/lib/utils/cn'
import type { ReactNode } from 'react'

interface CardProps {
  className?: string
  children: ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('border-line bg-page rounded-lg border p-6 shadow-sm', className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  className?: string
  children: ReactNode
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return <div className={cn('mb-4 flex flex-col gap-1', className)}>{children}</div>
}

interface CardTitleProps {
  className?: string
  children: ReactNode
}

export function CardTitle({ className, children }: CardTitleProps) {
  return <h3 className={cn('text-heading text-lg font-semibold', className)}>{children}</h3>
}

interface CardContentProps {
  className?: string
  children: ReactNode
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn('text-sub', className)}>{children}</div>
}
