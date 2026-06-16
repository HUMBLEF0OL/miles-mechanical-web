import { cn } from '@/lib/utils/cn'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-8 border-3',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-current border-t-transparent',
        SIZE_CLASSES[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading…</span>
    </div>
  )
}
