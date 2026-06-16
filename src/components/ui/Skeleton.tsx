import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-gray-700', className)}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-slate-800">
      <Skeleton className="mb-4 h-5 w-32" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}
