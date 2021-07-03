import { RecipeOverview } from '../client/RecipeOverview'
import { MealName } from './MealName'

export type MealPlan = {
    name: MealName,
    recipes: ReadonlyArray<RecipeOverview>
}

export type DayMealPlan = {
    date: Date,
    meals: ReadonlyArray<MealPlan>
}