import { z } from 'zod'
import { emailSchema } from './primitives'

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  avatarUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})
export type UserProfileFormValues = z.infer<typeof userProfileSchema>
