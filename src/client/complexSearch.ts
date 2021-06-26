import axios from 'axios'
import { rapidAPIRequestHeaders, RapidAPIResponseHeaders } from './rapidAPIHeaders';
import type { RecipeOverview } from "./RecipeOverview";
import type { SPDiet, SPIntolerance, SPType } from './spoonacularTypes'
import { calcUrl, logRemainingHeaders } from './util';

export type ComplexSearchParams = {
    diet?: SPDiet,
    intolerances?: ReadonlyArray<SPIntolerance>
    type?: SPType,
    addRecipeInformation?: boolean
}

type Result = {
    results: ReadonlyArray<RecipeOverview>,
    offset: number,
    number: number,
    totalResults: number
}

export async function getByComplexSearch(
    params: ComplexSearchParams
): Promise<ReadonlyArray<RecipeOverview>> {
    return await axios.get<Result>(
        calcUrl('/recipes/complexSearch'),
        { params, headers: { ...rapidAPIRequestHeaders } }
    ).then(response => {
        logRemainingHeaders(response.headers as RapidAPIResponseHeaders)
        return response.data.results
    })
}