import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('shows required asterisk', () => {
    render(<Input label="Name" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input label="Email" error="Invalid email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email')
  })

  it('shows hint when no error', () => {
    render(<Input label="Email" hint="We won't share it" />)
    expect(screen.getByText("We won't share it")).toBeInTheDocument()
  })

  it('hides hint when error is present', () => {
    render(<Input label="Email" hint="Hint text" error="Error text" />)
    expect(screen.queryByText('Hint text')).not.toBeInTheDocument()
    expect(screen.getByText('Error text')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input label="Name" />)
    const input = screen.getByLabelText('Name')
    await user.type(input, 'John')
    expect(input).toHaveValue('John')
  })

  it('applies custom className', () => {
    render(<Input label="Test" className="custom-class" />)
    const input = screen.getByLabelText('Test')
    expect(input.className).toContain('custom-class')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input label="Test" disabled />)
    expect(screen.getByLabelText('Test')).toBeDisabled()
  })
})
