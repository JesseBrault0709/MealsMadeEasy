import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appConfig } from "../appConfig";
import { RecipeOverview } from "../client/RecipeOverview";
import { DayMealPlan, getBlankDayMealPlan, getRecipeSelection, isPlanForDate, MealPlan, RecipeSelection } from "../types/DayMealPlan";
import { MealName } from "../types/MealName";

export type DayMealPlansState = {
    plans: ReadonlyArray<DayMealPlan>
}

const initialState: DayMealPlansState = {
    plans: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(dayIndex => {
        const date = new Date()
        date.setDate(date.getDate() + dayIndex)
        return getBlankDayMealPlan(date, appConfig.meals)
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
            action: PayloadAction<{ 
                targetDate: Date, 
                targetMeal: MealName,
                recipe: RecipeOverview
            }>
        ) => {
            const dayMealPlan = state.plans.find(isPlanForDate(action.payload.targetDate))
            
            if (dayMealPlan === undefined) {
                throw new Error(`there is no dayMealPlan for date ${action.payload.targetDate}`)
            }

            const meal = dayMealPlan.meals.find(mealPlan => mealPlan.name === action.payload.targetMeal)
        
            if (meal === undefined) {
                throw new Error(`there is no meal named ${action.payload.targetMeal} in dayMealPlan for date ${action.payload.targetDate}`)
            }

            meal.recipeSelections.push(getRecipeSelection(new Date(), action.payload.recipe.id))
        },

        removeSelectionFromMealPlan: (
            state,
            action: PayloadAction<{
                date: Date,
                mealName: MealName,
                selection: RecipeSelection
            }>
        ) => {
            const mealPlan = getMealPlan(state, action.payload.date, action.payload.mealName)
            mealPlan.recipeSelections = mealPlan.recipeSelections.filter(selection => selection.selectionId !== action.payload.selection.selectionId)
        },

        replaceSelectionInMealPlan: (
            state,
            action: PayloadAction<{
                targetDate: Date,
                targetMealName: MealName,
                targetSelection: RecipeSelection,
                newRecipe: RecipeOverview
            }>
        ) => {
            const mealPlan = getMealPlan(state, action.payload.targetDate, action.payload.targetMealName)

            mealPlan.recipeSelections = mealPlan.recipeSelections.map(selection =>
                selection.selectionId === action.payload.targetSelection.selectionId ?
                    getRecipeSelection(new Date(), action.payload.newRecipe.id) :
                    selection
            )

        }

    }
})

export const { 
    addRecipeToMealPlan,
    removeSelectionFromMealPlan,
    replaceSelectionInMealPlan
} = dayMealPlansSlice.actions