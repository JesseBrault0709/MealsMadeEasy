import { render } from '@testing-library/react'
import { RecipeBook } from './RecipeBook'

it('renders without throwing', () => {
    render(<RecipeBook intolerances={[]} />)
})
