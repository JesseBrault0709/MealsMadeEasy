import axios from 'axios'
import { FullRecipe } from './FullRecipe'
import { rapidAPIRequestHeaders, RapidAPIResponseHeaders } from './rapidAPIHeaders'
import { calcUrl, logRemainingHeaders } from './util'

export type RecipeInformationParams = {
    includeNutrition?: boolean
}

export async function getRecipeInformation(
    id: number,
    params: RecipeInformationParams = {}
): Promise<FullRecipe> {
    return await axios.get<FullRecipe>(
        calcUrl(`/recipes/${id}/information`),
        {
            headers: { ...rapidAPIRequestHeaders },
            params
        }
    ).then(response => {
        logRemainingHeaders(response.headers as RapidAPIResponseHeaders)
        return response.data
    })
}