import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader } from '../PageHeader'

describe('PageHeader', () => {
  it('renders the title', () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<PageHeader title="Settings" description="Manage your preferences" />)
    expect(screen.getByText('Manage your preferences')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<PageHeader title="Settings" />)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })

  it('renders actions when provided', () => {
    render(<PageHeader title="Users" actions={<button>Add user</button>} />)
    expect(screen.getByRole('button', { name: 'Add user' })).toBeInTheDocument()
  })

  it('does not render actions container when not provided', () => {
    const { container } = render(<PageHeader title="Users" />)
    // Only the title div, no actions div
    expect(container.firstChild?.childNodes).toHaveLength(1)
  })

  it('applies custom className', () => {
    const { container } = render(<PageHeader title="Test" className="my-class" />)
    expect(container.firstChild).toHaveClass('my-class')
  })
})
