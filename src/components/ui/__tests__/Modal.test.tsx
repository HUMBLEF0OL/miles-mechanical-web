import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../Modal'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <p>Content</p>
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('shows title and description', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Heading" description="Sub text">
        <p>Body</p>
      </Modal>
    )
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(screen.getByText('Sub text')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    let closed = false
    render(
      <Modal
        isOpen
        onClose={() => {
          closed = true
        }}
      >
        <p>Content</p>
      </Modal>
    )
    await user.click(screen.getByLabelText('Close modal'))
    expect(closed).toBe(true)
  })

  it('calls onClose on Escape key', async () => {
    const user = userEvent.setup()
    let closed = false
    render(
      <Modal
        isOpen
        onClose={() => {
          closed = true
        }}
      >
        <p>Content</p>
      </Modal>
    )
    await user.keyboard('{Escape}')
    expect(closed).toBe(true)
  })

  it('has proper ARIA attributes', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Test Title">
        <p>Content</p>
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })
})
