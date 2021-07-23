import { SPDiet, SPIntolerance } from '../client/spoonacularTypes'

export type RecipePreferences = {
    cookingTime: number | 'No Limit' | null
    diet: SPDiet | null
    intolerances: ReadonlyArray<SPIntolerance> | null
}
