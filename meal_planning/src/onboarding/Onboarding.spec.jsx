import { render } from '@testing-library/react'
import { Onboarding } from './Onboarding'

it('renders without throwing when given correct props', () => {
    const props = {
        cookingTimes: ['10 mins'],
        diets: [],
        restrictions: []
    }
    render(<Onboarding {...props}/>)
})