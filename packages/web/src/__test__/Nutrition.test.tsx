import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nutrition from '../routes/nutrition'
import userEvent from '@testing-library/user-event'

test('renders the landing page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Nutrition />
    </MemoryRouter>
  )
  const linkElement = getByText(/What are you feeling for.../i)
  expect(linkElement).toBeInTheDocument()
})

test('render breakfast input', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Nutrition />
    </MemoryRouter>
  )
  userEvent.type(
    screen.getByRole('textbox', { name: 'recipe-breakfast' }),
    'eggs'
  )
  expect(screen.getByRole('text')).toHaveValue('eggs!')
})
