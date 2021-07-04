import { RecipeOverview } from '../client/RecipeOverview'
import { MealName } from './MealName'

export type DayMealPlan = {
    readonly date: Date
    readonly meals: ReadonlyMap<MealName, ReadonlyArray<RecipeOverview>>
}

export const getBlankDayMealPlan = (date: Date, meals: ReadonlyArray<MealName>): DayMealPlan => {
    const mealMap = new Map<MealName, ReadonlyArray<RecipeOverview>>()
    meals.forEach(meal => mealMap.set(meal, []))
    return {
        date,
        meals: mealMap
    }
}

/**
 * @returns An array of eight (8) days worth of blank DayMealPlans
 */
export const getWeekOfBlankDayMealPlans = (meals: ReadonlyArray<MealName>): ReadonlyArray<DayMealPlan> => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(dayIndex => {
        const date = new Date()
        date.setDate(date.getDate() + dayIndex)
        return getBlankDayMealPlan(date, meals)
    })
}

export const isPlanForDate = (date: Date) => (plan: DayMealPlan) => {
    return plan.date.getFullYear() === date.getFullYear() &&
        plan.date.getMonth() === date.getMonth() &&
        plan.date.getDate() === date.getDate()
}

/**
 * @returns A new object containing an updated meals.
 */
export const addToMeal = (plan: DayMealPlan, targetMeal: MealName, recipe: RecipeOverview): DayMealPlan => {
    const newMeals = new Map<MealName, ReadonlyArray<RecipeOverview>>()

    plan.meals.forEach((recipes, meal) => {
        if (meal === targetMeal) {
            newMeals.set(meal, [...recipes, recipe])
        } else {
            newMeals.set(meal, recipes)
        }
    })

    return {
        date: plan.date,
        meals: newMeals
    }
}