import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { FullRecipe } from "../client/FullRecipe";
import { getRecipeInformation } from "../client/recipeInformation";
import { useAppDispatch, useAppSelector } from "../hooks";

export type FullRecipesState = {
    recipes: ReadonlyArray<FullRecipe>
    fetchStatus: 'idle' | 'fetching' | 'success' | 'error'
    fetchError?: SerializedError
}

const initialState: FullRecipesState = {
    recipes: [],
    fetchStatus: 'idle'
}

export const fetchFullRecipe = createAsyncThunk(
    'recipes/fetchRecipeOverview', 
    async (id: number) => await getRecipeInformation(id)
)

export const fullRecipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: { },
    extraReducers: builder => {
        
        builder.addCase(fetchFullRecipe.pending, state => {
            state.fetchStatus = 'fetching'
        })

        builder.addCase(fetchFullRecipe.fulfilled, (state, action) => {
            state.fetchStatus = 'success'
            state.recipes.push(action.payload as any) // ts complains about readonly AnalyzedInstructions
        })

        builder.addCase(fetchFullRecipe.rejected, (state, action) => {
            state.fetchStatus = 'error'
            state.fetchError = action.error
        })

    }
})

export const useFullRecipe = (id: number): {
    recipe?: FullRecipe,
    fetchStatus: FullRecipesState['fetchStatus'],
    fetchError?: FullRecipesState['fetchError']
} => {
    
    const dispatch = useAppDispatch()

    const recipe = useAppSelector(state => state.fullRecipes.recipes.find(
        recipe => recipe.id === id
    ))

    if (recipe === undefined) {
        dispatch(fetchFullRecipe(id))
    }

    const fetchStatus = useAppSelector(state => state.fullRecipes.fetchStatus)
    const fetchError = useAppSelector(state => state.fullRecipes.fetchError)

    return {
        recipe, fetchStatus, fetchError
    }
    
}