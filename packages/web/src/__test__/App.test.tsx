import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

test('renders the landing page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  const linkElement = getByText(/Nutrition Nuts 🌰/i)
  expect(linkElement).toBeInTheDocument()
})
