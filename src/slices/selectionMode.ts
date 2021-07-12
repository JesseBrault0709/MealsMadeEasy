import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RecipeOverview } from "../client/RecipeOverview"
import { MealName } from "../types/MealName"

type SelectionModeState = {
    mode: 'add' | 'replace'
    target?: {
        date: Date,
        meal: MealName,
        recipe: RecipeOverview
    }
}

const initialState: SelectionModeState = {
    mode: 'add'
}

export const selectionModeSlice = createSlice({
    name: 'selectionMode',
    initialState,
    reducers: {
        setToAddMode: (
            state,
            action: PayloadAction<{ mode: 'add' }>
        ) => {
            state.mode = action.payload.mode
        },
        setToReplaceMode: (
            state,
            action: PayloadAction<{
                mode: 'replace',
                targetDate: Date,
                targetMeal: MealName,
                targetRecipe: RecipeOverview
            }>
        ) => {
            const {
                mode, targetDate, targetMeal, targetRecipe
            } = action.payload

            state.mode = mode
            state.target = {
                date: targetDate,
                meal: targetMeal,
                recipe: targetRecipe
            }
        }
    }
})

export const { setToAddMode, setToReplaceMode } = selectionModeSlice.actions