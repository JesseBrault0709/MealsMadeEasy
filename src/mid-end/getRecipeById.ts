import axios from 'axios'
import { Recipe } from './Recipe'
import { rapidAPIRequestHeaders, RapidAPIResponseHeaders } from './rapidAPIHeaders'
import { calcUrl, logRemainingHeaders } from './util'

type RequestParams = {
    includeNutrition: boolean
}

type ResponseData = {
    id: number,
    title: string,
    image: string,
    imagetype: string,
    servings: number
    readyInMinutes: number
    spoonacularScore: number
}

export async function getRecipeById(id: number): Promise<Recipe> {
    const params: RequestParams = {
        includeNutrition: false
    }

    const result: Recipe = await axios.get<ResponseData>(
        calcUrl(`/recipes/${id}/information`),
        {
            headers: { ...rapidAPIRequestHeaders },
            params
        }
    ).then(response => {
        logRemainingHeaders(response.headers as RapidAPIResponseHeaders)
        const { data } = response
        const recipe: Recipe = {
            id: data.id,
            title: data.title,
            imgSrc: data.image,
            rating: Math.floor(data.spoonacularScore / 20) // score is 0-100; convert to 0-5 by dividing by 20
        }
        return recipe
    })

    return result
}