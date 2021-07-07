import { SPDiet, SPIntolerance } from '../client/spoonacularTypes'

export type RecipePreferences = {
    cookingTime?: number | "No Limit"
    diet?: SPDiet
    intolerances?: ReadonlyArray<SPIntolerance>
}