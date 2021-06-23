import { render } from '@testing-library/react'
import { CookingTime } from './CookingTime'

it('renders without throwing', () => {
    render(<CookingTime cookingTimes={['No limit', '10 mins']} />)
})