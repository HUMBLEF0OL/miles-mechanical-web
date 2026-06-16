import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent } from '../Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })
})

describe('CardTitle', () => {
  it('renders as h3', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title')
  })
})

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Body</CardContent>)
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})

describe('Card composition', () => {
  it('renders full card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Card</CardTitle>
        </CardHeader>
        <CardContent>Some content here</CardContent>
      </Card>
    )
    expect(screen.getByRole('heading', { name: 'My Card' })).toBeInTheDocument()
    expect(screen.getByText('Some content here')).toBeInTheDocument()
  })
})
