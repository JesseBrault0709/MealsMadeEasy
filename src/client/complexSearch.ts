import axios from 'axios'
import { devLog } from '../util';
import type { RecipeOverview } from "./RecipeOverview";
import type { SPDiet, SPIntolerance, SPType } from './spoonacularTypes'
import { calcUrl } from './util';

export type ComplexSearchParams = {
    maxReadyTime?: number,
    diet?: SPDiet,
    intolerances?: ReadonlyArray<SPIntolerance>
    type?: SPType,
    addRecipeInformation?: boolean,
    offset?: number,
    number?: number
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

    devLog({
        requestParams: params
    })
    
    return await axios.get<Result>(
        calcUrl('/complexSearch'),
        { params }
    ).then(response => {
        return response.data.results
    })
}