import axios from 'axios'
import { FullRecipe } from './FullRecipe'
import { calcUrl } from './util'

export type RecipeInformationParams = {
    includeNutrition?: boolean
}

export async function getRecipeInformation(
    id: number,
    params: RecipeInformationParams = {}
): Promise<FullRecipe> {
    return await axios.get<FullRecipe>(
        calcUrl(`/recipeInformation`),
        {
            params: {
                id,
                ...params
            }
        }
    ).then(response => {
        return response.data
    })
}