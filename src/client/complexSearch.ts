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

/**
 * The parameters to pass to getByComplexSearch()
 *
 * @see https://spoonacular.com/food-api/docs
 */
export type ComplexSearchParams = {
    /**
     * The (natural language) recipe search query.
     */
    query?: string

    /**
     * The maximum time in minutes it should take to
     * prepare and cook the recipe.
     *
     * Known elsewhere as cookingTime.
     * */
    maxReadyTime?: number

    /**
     * The diet for which the recipes must be suitable.
     */
    diet?: SPDiet

    /**
     * All recipes returned must not contain ingredients
     * that are not suitable for people with the
     * intolerances entered.
     *
     * Known elsewhere as 'allergies'.
     */
    intolerances?: ReadonlyArray<SPIntolerance>

    /**
     * The type of recipe (eg. 'main course', etc.).
     */
    type?: SPType

    /**
     * The cuisine(s) of the recipes. One or more.
     */
    cuisine?: ReadonlyArray<SPCuisine>

    /**
     * The strategy to sort recipes by.
     */
    sort?: SPSortingOption

    /**
     * If set to true, you get more information
     * about the recipes returned.
     */
    addRecipeInformation?: boolean

    /**
     * The number of results to skip (between 0 and 900).
     */
    offset?: number

    /**
     * The number of expected results (between 1 and 100).
     */
    number?: number
}

/**
 * A utility type for converting all complexSearch params to strings.
 */
type SerializedComplexSearchParams = {
    [K in keyof ComplexSearchParams]: string
}

/**
 * Converts the given number to a string suitable for a query param
 * if not undefined, else returns undefined.
 *
 * @param n The number to convert
 * @returns A string representing the number if number is not
 *  undefined, else undefined.
 */
const serializeNumberParam = (n?: number): string | undefined => n?.toString()

/**
 * Converts the given boolean to a string suitable for a query param.
 *
 * @param b The boolean to convert
 * @returns 'true' or 'false'
 */
const serializeBooleanParam = (b?: boolean): string => (b ? 'true' : 'false')

/**
 * Converts the given string to a string suitable as a query param; if
 * undefined, returns undefined; if s.length === 0, returns undefined; else
 * returns the original string.
 *
 * @param s The string to convert
 * @returns The original string or undefined if the original is
 *  undefined or s.length === 0.
 */
const serializeStringParam = (s?: string): string | undefined => {
    if (s === undefined || s.length === 0) {
        return undefined
    } else {
        return s
    }
}

/**
 * Converts the given array of strings to a single string suitable
 * as a query param for Spoonacular (i.e., a comma-separated list).
 *
 * @param arr The array of strings to convert.
 * @returns A single string representing the array, or undefined
 *  if the original arr was undefined or arr.length === 0.
 */
const serializeStringArrayParam = (
    arr?: ReadonlyArray<string>
): string | undefined => {
    if (arr === undefined || arr.length === 0) {
        return undefined
    } else {
        return arr.join(',')
    }
}

/**
 * Converts all of the given ComplexSearchParams to strings
 * suitable for sending to Spoonacular via axios.
 *
 * @param params The params to convert.
 * @returns A Record of string keys and string values (or an undefined
 *  value if the original value was undefined) for each original param.
 *
 * @throws If a non-serializable value is contained within params.
 */
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

/**
 * The type of the data object returned from Spoonacular via axios.
 */
type Result = {
    results: ReadonlyArray<RecipeOverview>
    offset: number
    number: number
    totalResults: number
}

/**
 * Searches through Spoonacular's recipe database via
 * its complexSearch endpoint.
 *
 * @param params The params to send to spoonacular via
 *  the query string
 * @returns A readonly array of RecipeOverviews.
 *
 * @see https://spoonacular.com/food-api/docs
 */
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
