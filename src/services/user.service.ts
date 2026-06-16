import { apiClient } from '@/lib/api'
import type { User } from '@/types'

export const userService = {
  getMe: (): Promise<User> => apiClient.get('users/me').json(),
  getById: (id: string): Promise<User> => apiClient.get(`users/${id}`).json(),
  updateMe: (data: Partial<User>): Promise<User> =>
    apiClient.patch('users/me', { json: data }).json(),
  deleteMe: (): Promise<void> => apiClient.delete('users/me').then(() => undefined),
}
