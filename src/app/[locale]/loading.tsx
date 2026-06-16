export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="border-t-brand-500 dark:border-t-brand-400 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700" />
        <p className="text-muted text-sm">Loading…</p>
      </div>
    </div>
  )
}
