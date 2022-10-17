import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nutrition from '../routes/nutrition'
// import userEvent from '@testing-library/user-event'

test('renders the landing page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Nutrition />
    </MemoryRouter>
  )
  const linkElement = getByText(/Search Meals/i)
  expect(linkElement).toBeInTheDocument()
})
