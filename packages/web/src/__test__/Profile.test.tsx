import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Profile } from '../routes/profile'

test('renders the landing page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  )
  const linkElement = getByText(/Profile Info/i)
  expect(linkElement).toBeInTheDocument()
})
