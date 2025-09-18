import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Dictionary } from '../components/Dictionary'
import { describe, it, expect } from 'vitest'

describe('Dictionary', () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Dictionary />
      </MemoryRouter>
    )

  it('filters words based on search input', async () => {
    setup()

    const input = screen.getByPlaceholderText(/search english or arabic vocabulary/i)
    await userEvent.type(input, 'bro')

    expect(screen.getByText('Brother')).toBeInTheDocument()
    expect(screen.queryByText('Sister')).not.toBeInTheDocument()
    expect(screen.getByText('1 entries')).toBeInTheDocument()
  })

  it('allows searching by Arabic', async () => {
    setup()

    const input = screen.getByPlaceholderText(/search english or arabic vocabulary/i)
    await userEvent.type(input, 'أَخ')

    expect(screen.getByText('Brother')).toBeInTheDocument()
  })

  it('is case insensitive for English search', async () => {
    setup()

    const input = screen.getByPlaceholderText(/search english or arabic vocabulary/i)
    await userEvent.type(input, 'BRO')

    expect(screen.getByText('Brother')).toBeInTheDocument()
    expect(screen.queryByText('Sister')).not.toBeInTheDocument()
  })

  it('shows lesson view when search is cleared', async () => {
    setup()

    const input = screen.getByPlaceholderText(/search english or arabic vocabulary/i)
    await userEvent.type(input, 'bro')
    await userEvent.clear(input)

    expect(screen.getByText('All praise be to Allah')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Greetings التحية/i }).length).toBeGreaterThan(0)
  })

  it('handles no matches', async () => {
    setup()

    const input = screen.getByPlaceholderText(/search english or arabic vocabulary/i)
    await userEvent.type(input, 'xyz')

    expect(screen.queryByText('Brother')).not.toBeInTheDocument()
    expect(screen.queryByText('Sister')).not.toBeInTheDocument()
    expect(screen.getByText('0 entries')).toBeInTheDocument()
  })
})
