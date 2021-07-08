import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeBookScreen } from "../screens/recipe-book/RecipeBook/RecipeBook";

export type RecipeBookState = {
    currentScreen: RecipeBookScreen
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
        }

    }
})

export const { setRecipeBookScreen } = recipeBookSlice.actions