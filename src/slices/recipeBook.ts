import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeBookScreen } from "../screens/recipe-book/RecipeBook/RecipeBook";

export type RecipeBookState = {
    currentScreen: RecipeBookScreen,
    recipeInfoId?: number
}

const initialState: RecipeBookState = {
    currentScreen: 'Recipe List'
}

export const recipeBookSlice = createSlice({
    name: 'recipeBookScreens',
    initialState,
    reducers: {

        setRecipeBookScreen: (
            state,
            action: PayloadAction<{ screen: RecipeBookScreen }>
        ) => {
            state.currentScreen = action.payload.screen
        },

        setRecipeInfoId: (
            state,
            action: PayloadAction<{ id: number }>
        ) => {
            state.recipeInfoId = action.payload.id
        }

    }
})

export const { setRecipeBookScreen, setRecipeInfoId } = recipeBookSlice.actions