import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/config'
import { userService } from '@/services'
import type { User } from '@/types'

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.users.me,
    queryFn: () => userService.getMe(),
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => userService.deleteMe(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}
