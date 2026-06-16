export const queryKeys = {
  auth: {
    session: ['auth', 'session'] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
    me: ['users', 'me'] as const,
  },
} as const
