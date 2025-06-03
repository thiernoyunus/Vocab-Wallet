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
})
