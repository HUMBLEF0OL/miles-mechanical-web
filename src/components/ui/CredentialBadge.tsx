import { cn } from '@/lib/utils/cn'

interface CredentialBadgeProps {
  label: string
  className?: string
}

export function CredentialBadge({ label, className }: CredentialBadgeProps) {
  return (
    <span
      className={cn(
        'border-primary bg-primary-tint text-primary-ink rounded-control inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-semibold',
        className
      )}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {label}
    </span>
  )
}
