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

type SerializedComplexSearchParams = {
    [K in keyof ComplexSearchParams]: string
}

const serializeNumberParam = (n?: number): string | undefined => n?.toString()

const serializeBooleanParam = (b?: boolean): string => (b ? 'true' : 'false')

const serializeStringParam = (s?: string): string | undefined => {
    if (s === undefined || s.length === 0) {
        return undefined
    } else {
        return s
    }
}

const serializeStringArrayParam = (
    arr?: ReadonlyArray<string>
): string | undefined => {
    if (arr === undefined || arr.length === 0) {
        return undefined
    } else {
        return arr.join(',')
    }
}

const serializeParams = (
    params: ComplexSearchParams
): SerializedComplexSearchParams => {
    const result: Record<string, string | undefined> = {}
    Object.entries(params).forEach(([key, value]) => {
        switch (typeof value) {
            case 'undefined':
                return
            case 'boolean':
                result[key] = serializeBooleanParam(value)
                return
            case 'number':
                result[key] = serializeNumberParam(value)
                return
            case 'string':
                result[key] = serializeStringParam(value)
                return
            case 'object':
                if (value instanceof Array) {
                    result[key] = serializeStringArrayParam(value)
                } else {
                    throw new Error(
                        `cannot serialize non-array object (given: ${value})`
                    )
                }
                return
            default:
                throw new Error(`cannot serialize this value: ${value}`)
        }
    })
    return result
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
        .get<Result>(calcUrl('/complexSearch'), {
            params: serializeParams(params)
        })
        .then(response => {
            return response.data.results
        })
}
