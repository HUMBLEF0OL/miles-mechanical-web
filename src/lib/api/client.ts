import { apiConfig } from '@/config'
import ky, { type HTTPError } from 'ky'

export const apiClient = ky.create({
  baseUrl: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  credentials: 'include',
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 429, 503, 504],
  },
  hooks: {
    afterResponse: [
      async ({ response }) => {
        if (response.status === 401 && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:unauthorized'))
        }
        return response
      },
    ],
    beforeError: [
      ({ error, request }) => {
        const httpError = error as HTTPError
        if (httpError.response) {
          error.message = 'HTTP ' + request.url + ' \u2192 ' + httpError.response.status
        }
        return error
      },
    ],
  },
})
