import { render } from '@testing-library/react'
import { RecipesGrid } from './RecipesGrid'

it('renders without throwing', () => {
    render(<RecipesGrid recipes={[]} />)
})