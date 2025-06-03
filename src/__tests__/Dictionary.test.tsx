import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Dictionary } from '../components/Dictionary'
import { describe, it, expect } from 'vitest'

describe('Dictionary', () => {
  it('filters words based on search input', async () => {
    render(
      <MemoryRouter>
        <Dictionary />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/search words/i)
    await userEvent.type(input, 'bro')

    expect(screen.getByText('Brother')).toBeInTheDocument()
    expect(screen.queryByText('Sister')).not.toBeInTheDocument()
  })

  it('allows searching by Arabic', async () => {
    render(
      <MemoryRouter>
        <Dictionary />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/search words/i)
    await userEvent.type(input, 'أَخ')

    expect(screen.getByText('Brother')).toBeInTheDocument()
  })

  it('is case insensitive for English search', async () => {
    render(
      <MemoryRouter>
        <Dictionary />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/search words/i)
    await userEvent.type(input, 'BRO')

    expect(screen.getByText('Brother')).toBeInTheDocument()
    expect(screen.queryByText('Sister')).not.toBeInTheDocument()
  })

  it('shows lesson view when search is cleared', async () => {
    render(
      <MemoryRouter>
        <Dictionary />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/search words/i)
    await userEvent.type(input, 'bro')
    await userEvent.clear(input)

    expect(
      screen.getByText('Lesson 1: Salutation التحية')
    ).toBeInTheDocument()
  })

  it('handles no matches', async () => {
    render(
      <MemoryRouter>
        <Dictionary />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/search words/i)
    await userEvent.type(input, 'xyz')

    expect(screen.queryByText('Brother')).not.toBeInTheDocument()
    expect(screen.queryByText('Sister')).not.toBeInTheDocument()
  })
})
