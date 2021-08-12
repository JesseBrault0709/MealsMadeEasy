import axios from 'axios'
import { devLog } from '../util/util'
import type { RecipeOverview } from './RecipeOverview'
import type {
    SPCuisine,
    SPDiet,
    SPIntolerance,
    SPSortingOption,
    SPType
} from './spoonacularTypes'
import { calcUrl } from './util'

export type ComplexSearchParams = {
    maxReadyTime?: number
    diet?: SPDiet
    intolerances?: ReadonlyArray<SPIntolerance>
    type?: SPType
    addRecipeInformation?: boolean
    offset?: number
    number?: number
    query?: string
    cuisine?: ReadonlyArray<SPCuisine>
    sort?: SPSortingOption
}

type Result = {
    results: ReadonlyArray<RecipeOverview>
    offset: number
    number: number
    totalResults: number
}

export async function getByComplexSearch(
    params: ComplexSearchParams
): Promise<ReadonlyArray<RecipeOverview>> {
    devLog({
        requestParams: params
    })

    return await axios
        .get<Result>(calcUrl('/complexSearch'), { params })
        .then(response => {
            return response.data.results
        })
}
