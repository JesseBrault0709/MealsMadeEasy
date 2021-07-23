import { MealName } from './MealName'
import { v1 as uuid } from 'uuid'

/** Model types */

export type RecipeSelection = {
    selectionId: string
    dateAdded: number
    recipeId: number
}

export type MealPlan = {
    name: MealName
    recipeSelections: ReadonlyArray<RecipeSelection>
}

export type DayMealPlan = {
    date: number
    meals: ReadonlyArray<MealPlan>
}

/** Model creation functions */

export const getRecipeSelection = (
    dateAdded: Date,
    recipeId: number
): RecipeSelection => ({
    selectionId: uuid(),
    dateAdded: dateAdded.valueOf(),
    recipeId
})

export const getBlankMealPlan = (mealName: MealName): MealPlan => ({
    name: mealName,
    recipeSelections: []
})

export const getBlankDayMealPlan = (
    date: Date,
    meals: ReadonlyArray<MealName>
): DayMealPlan => ({
    date: date.valueOf(),
    meals: meals.map(mealName => ({
        name: mealName,
        recipeSelections: []
    }))
})

/** util functions for models */

export const extractDateFromDayMealPlan = (dayMealPlan: DayMealPlan): Date =>
    new Date(dayMealPlan.date)

export const isPlanForDate = (date: Date) => (plan: DayMealPlan) => {
    const planDate = extractDateFromDayMealPlan(plan)

    return (
        planDate.getFullYear() === date.getFullYear() &&
        planDate.getMonth() === date.getMonth() &&
        planDate.getDate() === date.getDate()
    )
}
