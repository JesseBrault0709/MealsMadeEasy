import axios from 'axios'
import { rapidAPIRequestHeaders, RapidAPIResponseHeaders } from './rapidAPIHeaders'
import { SPComplexSearchRecipe, SPComplexSearchResult, SPDiet, SPIntolerance, SPType } from './spoonacularTypes'
import { calcUrl, logRemainingHeaders } from './util'

export type DietAllergySearchResult = ReadonlyArray<SPComplexSearchRecipe>

export async function dietAllergySearch(
    diet: SPDiet | null,
    intolerances: ReadonlyArray<SPIntolerance> | null,
    type: SPType | null
): Promise<DietAllergySearchResult> {
    
    const params: Record<string, any> = { }

    if (diet !== null) {
        params.diet = diet
    }

    if (intolerances !== null) {
        params.intolerances = intolerances.join(', ')
    }

    if (type !== null) {
        params.type = type
    }

    const result = await axios.get<SPComplexSearchResult>(
        calcUrl('/recipes/complexSearch'),
        { params, headers: { ...rapidAPIRequestHeaders } }
    ).then(response => {
        logRemainingHeaders(response.headers as RapidAPIResponseHeaders)
        return response.data.results
    })

    return result
}
