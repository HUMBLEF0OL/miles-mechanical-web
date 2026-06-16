import { env } from './env'

export const apiConfig = {
  baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30_000,
} as const

export const pagination = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const

export const httpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const
