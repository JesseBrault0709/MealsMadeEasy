import { createAsyncThunk, createSlice, Store } from "@reduxjs/toolkit";
import { appConfig } from "../appConfig";
import { getByComplexSearch } from "../client/complexSearch";
import { RecipeOverview } from "../client/RecipeOverview";
import { AppState } from "../store";

type RecipesState = {
    recipes: ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>
    status: "idle" | "fetching" | "success" | "error",
    error?: string
}

const initialState: RecipesState = {
    recipes: new Map(),
    status: "idle"
}

type FetchRecipesPayload = {
    listName: string,
    offset: number,
    recipes: ReadonlyArray<RecipeOverview>
}

const fetchRecipes = createAsyncThunk<
    FetchRecipesPayload,
    string,
    {
        state: AppState
    }
>('recipes/fetchRecipes', async (listName: string, thunkApi) => {
    const state = thunkApi.getState()
    const { cookingTime, diet, intolerances } = state.recipePreferences.preferences
    
    const recipeListState = state.recipeLists.lists.find(list => list.name === listName)
    if (recipeListState === undefined) {
        throw new Error(`there is no recipeListState named ${listName}`)
    }
    const { offset } = recipeListState

    const recipeListConfig = appConfig.recipeLists.find(listConfig => listConfig.name === listName)
    if (recipeListConfig === undefined) {
        throw new Error(`there is no recipeListConfig for ${listName}`)
    }
    const { type } = recipeListConfig

    const recipes = await getByComplexSearch({
        addRecipeInformation: true,
        maxReadyTime: cookingTime === "No Limit" ? undefined : cookingTime,
        diet,
        intolerances,
        number: appConfig.recipeListLimit,
        offset,
        type
    })

    return {
        listName,
        offset,
        recipes
    }
})

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRecipes.pending, state => {
            state.status = "fetching"
        })
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = "success"
            state.error = undefined
            const recipesByOffset = state.recipes.get(action.payload.listName)
            if (recipesByOffset === undefined) {
                throw new Error(`there are no recipesByOffset for ${action.payload.listName}`)
            }
            recipesByOffset.set(action.payload.offset, [...action.payload.recipes])
        }),
        builder.addCase(fetchRecipes.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

