import { RecipePreferences } from '../types/RecipePreferences'

/**
 * Converts the given value (whose type is RecipePreferences['cookingTime'])
 * to a string representing that value. For example:
 *  * 15 -> '15 mins'
 *  * 30 -> '30 mins'
 *  * 'No Limit' -> 'No Limit'
 *
 * @param value the value to convert
 * @returns a string representing the given value
 */
export const convertCookingTimeValueToString = (
    value: RecipePreferences['cookingTime']
): string => {
    if (value === 'No Limit') {
        return value
    } else if (value !== null) {
        return `${value.toString()} mins`
    } else {
        throw new Error(
            'cannot convert an undefined/null cookingTime value to a string'
        )
    }
}

/**
 * Converts the given string to a value whose type
 * is RecipePreferences['cookingTime'] (i.e., 'No Limit', 15, 30, etc.).
 *
 * The given string must be one of the following:
 *  * 'No Limit'
 *  * a string of the form '%d mins', where %d represents any integer
 *
 * @param s the string to convert
 * @returns a value whose type is RecipePreferences['cookingTime']
 */
export const convertStringToCookingTime = (
    s: string
): RecipePreferences['cookingTime'] => {
    if (s === 'No Limit') {
        return s
    } else {
        const asNumber = parseInt(s.slice(0, -5))
        if (asNumber === undefined) {
            throw new Error(`cannot convert '${s}' to a cookingTime value`)
        }
        return asNumber
    }
}
