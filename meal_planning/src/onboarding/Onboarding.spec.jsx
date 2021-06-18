import { render } from '@testing-library/react'
import { Onboarding } from './Onboarding'

it('renders without throwing', () => {
    const props = {
        cookingTimes: [],
        diets: [],
        mouths: []
    }
    render(<Onboarding {...props}/>)
})