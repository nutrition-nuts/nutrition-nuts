import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Workouts from '../routes/workouts'

test('renders the landing page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Workouts />
    </MemoryRouter>
  )
  const linkElement = getByText(/Workout Info/i)
  expect(linkElement).toBeInTheDocument()
})
