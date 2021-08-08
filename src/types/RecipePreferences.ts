import {
    SPCuisine,
    SPDiet,
    SPIntolerance,
    SPSortingOption
} from '../client/spoonacularTypes'

export type RecipePreferences = {
    cookingTime: number | 'No Limit' | null
    diet: SPDiet | null
    intolerances: ReadonlyArray<SPIntolerance> | null
    cuisines: ReadonlyArray<SPCuisine> | null
    sortingOption: SPSortingOption | null
}
