import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(
      <Button
        onClick={() => {
          clicked = true
        }}
      >
        Click
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies variant classes', () => {
    render(<Button variant="danger">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('red')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
