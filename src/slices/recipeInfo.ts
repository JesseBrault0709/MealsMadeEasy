import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { FullRecipe } from "../client/FullRecipe";
import { getRecipeInformation } from "../client/recipeInformation";
import { RecipeOverview } from "../client/RecipeOverview";

export type RecipeInfoState = {
    status: 'empty' | 'fetching' | 'success' | 'error',
    recipe?: FullRecipe,
    error?: SerializedError
}

export const fetchFullRecipe = createAsyncThunk(
    'recipeBookScreens/fetchCurrentRecipe', 
    (recipe: RecipeOverview) => getRecipeInformation(recipe.id)
)

const initialState: RecipeInfoState = {
    status: 'empty'
}

export const recipeInfoSlice = createSlice({
    name: 'recipeInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFullRecipe.pending, state => {
            state.status = 'fetching'
        })
        builder.addCase(fetchFullRecipe.fulfilled, (state, action) => {
            state.status = 'success'
            state.recipe = action.payload as any // TS complains about readonly
        })
        builder.addCase(fetchFullRecipe.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error
        })
    }
})
