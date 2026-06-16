import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No items found" />)
    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<EmptyState title="Empty" description="Try adding something" />)
    expect(screen.getByText('Try adding something')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState title="Empty" />)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })

  it('renders the icon when provided', () => {
    render(<EmptyState title="Empty" icon={<span data-testid="icon">📦</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders the action when provided', () => {
    render(<EmptyState title="Empty" action={<button>Add item</button>} />)
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<EmptyState title="Empty" className="my-custom" />)
    expect(container.firstChild).toHaveClass('my-custom')
  })
})
