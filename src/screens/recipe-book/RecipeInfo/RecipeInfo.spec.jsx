import { act, render } from '@testing-library/react'
import { RecipeInfo } from './RecipeInfo'

/**
 * Uses async/await to shut up the warning about act()
 */
it('renders without throwing', async () => {
    await act(async () => {
        const getRecipe = () =>
            Promise.resolve({
                id: 0,
                title: 'Sausage',
                image: '',
                imageType: '',
                analyzedInstructions: [],
                instructions: 'Put it in the oven.',
                extendedIngredients: []
            })

        render(<RecipeInfo getRecipe={getRecipe} />)
    })
})
