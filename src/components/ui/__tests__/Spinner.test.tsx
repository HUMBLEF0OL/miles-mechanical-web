import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../Spinner'

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('applies size classes', () => {
    const { container } = render(<Spinner size="lg" />)
    expect(container.firstChild).toHaveClass('size-8')
  })

  it('defaults to md size', () => {
    const { container } = render(<Spinner />)
    expect(container.firstChild).toHaveClass('size-6')
  })

  it('applies custom className', () => {
    const { container } = render(<Spinner className="text-red-500" />)
    expect(container.firstChild).toHaveClass('text-red-500')
  })
})
