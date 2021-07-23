import { render } from '@testing-library/react'
import { TimeDietAllergies } from './TimeDietAllergies'

it('renders without throwing when given proper props', () => {
    render(<TimeDietAllergies cookingTime="No limit" intolerances={[]} />)
})
