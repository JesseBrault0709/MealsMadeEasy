import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appConfig } from "../appConfig";
import { RecipeOverview } from "../client/RecipeOverview";
import { DayMealPlan, isPlanForDate, MealPlan } from "../types/DayMealPlan";
import { MealName } from "../types/MealName";

export type DayMealPlansState = {
    plans: ReadonlyArray<DayMealPlan>
}

const initialState: DayMealPlansState = {
    plans: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(dayIndex => {
        const date = new Date()
        date.setDate(date.getDate() + dayIndex)
        return {
            date,
            meals: appConfig.meals.map(mealName => ({
                name: mealName,
                recipes: []
            }))
        }
    })
}

const getMealPlan = (
    state: DayMealPlansState,
    date: Date,
    mealName: MealName
): MealPlan => {
    const dayMealPlan = state.plans.find(isPlanForDate(date))
            
    if (dayMealPlan === undefined) {
        throw new Error(`there is no dayMealPlan for date ${date}`)
    }

    const mealPlan = dayMealPlan.meals.find(mealPlan => mealPlan.name === mealName)

    if (mealPlan === undefined) {
        throw new Error(`there is no meal named ${mealName} in dayMealPlan for date ${date}`)
    }

    return mealPlan
}

export const dayMealPlansSlice = createSlice({
    name: 'dayMealPlans',
    initialState,
    reducers: {

        addRecipeToMealPlan: (
            state, 
            action: PayloadAction<{ date: Date, mealName: MealName, recipe: RecipeOverview }>
        ) => {
            const dayMealPlan = state.plans.find(isPlanForDate(action.payload.date))
            
            if (dayMealPlan === undefined) {
                throw new Error(`there is no dayMealPlan for date ${action.payload.date}`)
            }

            const meal = dayMealPlan.meals.find(mealPlan => mealPlan.name === action.payload.mealName)
        
            if (meal === undefined) {
                throw new Error(`there is no meal named ${action.payload.mealName} in dayMealPlan for date ${action.payload.date}`)
            }

            meal.recipes.push(action.payload.recipe)
        },

        removeRecipeFromMealPlan: (
            state,
            action: PayloadAction<{
                date: Date,
                mealName: MealName,
                recipe: RecipeOverview
            }>
        ) => {
            const mealPlan = getMealPlan(state, action.payload.date, action.payload.mealName)
            mealPlan.recipes = mealPlan.recipes.filter(recipe => recipe.id !== action.payload.recipe.id)
        }

    }
})

export const { addRecipeToMealPlan, removeRecipeFromMealPlan } = dayMealPlansSlice.actions