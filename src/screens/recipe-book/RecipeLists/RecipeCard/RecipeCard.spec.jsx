import { render } from '@testing-library/react'
import { RecipeCard } from './RecipeCard'

it('renders without throwing', () => {
    render(
        <RecipeCard
            recipe={{
                id: 0,
                image: 'test',
                imageType: 'fake',
                title: 'A hello world recipe!'
            }}
        />
    )
})
