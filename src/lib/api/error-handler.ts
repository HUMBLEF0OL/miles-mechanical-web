import { httpStatus } from '@/config'

import type { ApiError } from '@/types'

interface ErrorWithResponse {
  response: Response
  name: string
  message: string
}

function isErrorWithResponse(error: unknown): error is ErrorWithResponse {
  return typeof error === 'object' && error !== null && 'response' in error
}

export async function parseApiError(error: unknown): Promise<ApiError> {
  if (isErrorWithResponse(error)) {
    const status = error.response.status

    let body: Record<string, unknown> = {}
    try {
      body = await error.response.json()
    } catch {
      // response body wasn't JSON
    }

    return {
      message: (body?.message as string) ?? (body?.error as string) ?? getDefaultMessage(status),
      code: (body?.code as string) ?? `HTTP_${status}`,
      status,
      fieldErrors:
        (body?.fieldErrors as Record<string, string[]>) ??
        (body?.errors as Record<string, string[]>) ??
        undefined,
    }
  }

  if (error instanceof TypeError && error.name === 'TimeoutError') {
    return { message: 'Request timed out. Please try again.', code: 'TIMEOUT', status: 0 }
  }

  if (error instanceof TypeError) {
    return { message: 'Network error. Check your connection.', code: 'NETWORK_ERROR', status: 0 }
  }

  return {
    message: (error as Error)?.message ?? 'An unexpected error occurred.',
    code: 'UNKNOWN',
    status: 0,
  }
}

function getDefaultMessage(status: number): string {
  const messages: Record<number, string> = {
    [httpStatus.BAD_REQUEST]: 'Invalid request. Please check your input.',
    [httpStatus.UNAUTHORIZED]: 'You must be logged in to do that.',
    [httpStatus.FORBIDDEN]: "You don't have permission to do that.",
    [httpStatus.NOT_FOUND]: 'The requested resource was not found.',
    [httpStatus.CONFLICT]: 'A conflict occurred. The resource may already exist.',
    [httpStatus.TOO_MANY_REQUESTS]: 'Too many requests. Please slow down.',
    [httpStatus.SERVER_ERROR]: 'Server error. Please try again later.',
  }
  return messages[status] ?? `Request failed with status ${status}.`
}
