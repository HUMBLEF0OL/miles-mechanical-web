import { describe, it, expect } from 'vitest'
import { parseApiError } from '../error-handler'

describe('parseApiError', () => {
  it('parses HTTP error with JSON body', async () => {
    const error = {
      response: new Response(JSON.stringify({ message: 'Not found', code: 'NOT_FOUND' }), {
        status: 404,
      }),
      name: 'HTTPError',
      message: 'HTTP 404',
    }

    const result = await parseApiError(error)
    expect(result.status).toBe(404)
    expect(result.message).toBe('Not found')
    expect(result.code).toBe('NOT_FOUND')
  })

  it('handles non-JSON response body', async () => {
    const error = {
      response: new Response('plain text', { status: 500 }),
      name: 'HTTPError',
      message: 'HTTP 500',
    }

    const result = await parseApiError(error)
    expect(result.status).toBe(500)
    expect(result.code).toBe('HTTP_500')
  })

  it('handles TypeError as network error', async () => {
    const error = new TypeError('Failed to fetch')

    const result = await parseApiError(error)
    expect(result.code).toBe('NETWORK_ERROR')
    expect(result.status).toBe(0)
  })

  it('handles unknown errors', async () => {
    const result = await parseApiError('something broke')
    expect(result.code).toBe('UNKNOWN')
    expect(result.status).toBe(0)
  })

  it('extracts fieldErrors from response', async () => {
    const error = {
      response: new Response(
        JSON.stringify({
          message: 'Validation failed',
          fieldErrors: { email: ['Invalid email'] },
        }),
        { status: 400 }
      ),
      name: 'HTTPError',
      message: 'HTTP 400',
    }

    const result = await parseApiError(error)
    expect(result.fieldErrors).toEqual({ email: ['Invalid email'] })
  })
})
