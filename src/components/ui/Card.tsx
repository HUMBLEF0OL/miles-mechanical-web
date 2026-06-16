import { cn } from '@/lib/utils/cn'
import type { ReactNode } from 'react'

type CardTone = 'default' | 'dark'

interface CardProps {
  tone?: CardTone
  className?: string
  children: ReactNode
}

const TONE_STYLES: Record<CardTone, string> = {
  default: 'border-line bg-page',
  dark: 'bg-hero text-hero-ink border-hero-line',
}

export function Card({ tone = 'default', className, children }: CardProps) {
  return (
    <div className={cn('rounded-card border p-6 shadow-e1', TONE_STYLES[tone], className)}>
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
  return <h3 className={cn('text-heading font-sans text-lg font-bold', className)}>{children}</h3>
}

interface CardContentProps {
  className?: string
  children: ReactNode
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn('text-sub', className)}>{children}</div>
}
