import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { FullRecipe } from "../client/FullRecipe";
import { getRecipeInformation } from "../client/recipeInformation";
import { RecipeOverview } from "../client/RecipeOverview";
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