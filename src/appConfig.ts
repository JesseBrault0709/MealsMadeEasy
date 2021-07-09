import AppConfig_en from './appConfig_en.json'

import { SPDiet, SPIntolerance, SPType } from './client/spoonacularTypes'
import { MealName } from './types/MealName'

export type RecipeListConfig = {
    name: MealName,
    type: SPType
}

export type AppConfig = {
    availableCookingTimes: ReadonlyArray<"No Limit" | number>,
    availableDiets: ReadonlyArray<SPDiet>,
    availableIntolerances: ReadonlyArray<SPIntolerance>,

    initialCookingTime: "No Limit" | number,

    meals: ReadonlyArray<MealName>,
    recipeLists: ReadonlyArray<RecipeListConfig>,
    recipeListLimit: number
}

export const appConfig: AppConfig = {
    availableCookingTimes: AppConfig_en.availableCookingTimes,
    availableDiets: AppConfig_en.availableDiets,
    availableIntolerances: AppConfig_en.availableIntolerances,
    
    initialCookingTime: AppConfig_en.initialCookingTime,
    
    meals: AppConfig_en.meals,
    recipeListLimit: AppConfig_en.recipeListLimit,
    recipeLists: AppConfig_en.recipeListTabs
} as AppConfig