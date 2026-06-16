import type { z } from 'zod'

type ValidationSuccess<T> = { success: true; data: T }
type ValidationFailure = { success: false; errors: z.ZodError['issues'] }

export function validate<T>(
  schema: z.ZodType<T>,
  data: unknown
): ValidationSuccess<T> | ValidationFailure {
  const result = schema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return { success: false, errors: result.error.issues }
}
