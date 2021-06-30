import { RecipeOverview } from '../client/RecipeOverview'

export type MealPlan = {
    name: string,
    recipes: ReadonlyArray<RecipeOverview>
}

export type DayMealPlan = {
    date: Date,
    meals: ReadonlyArray<MealPlan>
}