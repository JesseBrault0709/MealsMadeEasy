import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecipeSelection } from '../types/DayMealPlan'
import { MealName } from '../types/MealName'

type SelectionModeState = {
    mode: 'add' | 'replace'
    target?: {
        date: number
        meal: MealName
        selection: RecipeSelection
    }
}

const initialState: SelectionModeState = {
    mode: 'add'
}

export const selectionModeSlice = createSlice({
    name: 'selectionMode',
    initialState,
    reducers: {
        setToAddMode: (state, action: PayloadAction<{ mode: 'add' }>) => {
            state.mode = action.payload.mode
        },

        setToReplaceMode: (
            state,
            action: PayloadAction<{
                mode: 'replace'
                targetDate: number
                targetMeal: MealName
                targetSelection: RecipeSelection
            }>
        ) => {
            const {
                mode,
                targetDate,
                targetMeal,
                targetSelection
            } = action.payload

            state.mode = mode
            state.target = {
                date: targetDate,
                meal: targetMeal,
                selection: targetSelection
            }
        }
    }
})

export const { setToAddMode, setToReplaceMode } = selectionModeSlice.actions
