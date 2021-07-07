import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appConfig } from "../appConfig";
import { getByComplexSearch } from "../client/complexSearch";
import { RecipeOverview } from "../client/RecipeOverview";
import { AppState, store } from "../store";
import { setAppScreen } from "./appScreens";

type RecipeListsState = {
    lists: ReadonlyArray<{
        name: string,
        offset: number,
        recipes: ReadonlyArray<RecipeOverview>
    }>
    activeList?: string
}

const initialState: RecipeListsState = {
    lists: appConfig.recipeLists.map(listConfig => ({
        name: listConfig.name,
        offset: 0,
        recipes: []
    }))
}

/** Middleware thunk to retrieve recipes */

export const fetchRecipes = createAsyncThunk<
    {
        listName: string,
        recipes: ReadonlyArray<RecipeOverview>
    },
    string,
    {
        state: AppState
    }
>('recipeLists/fetchRecipes', async (listName: string, thunkApi) => {
    const state = thunkApi.getState()
    const { cookingTime, diet, intolerances } = state.recipePreferences.preferences
    
    const targetList = state.recipeLists.lists.find(list => list.name === listName)
    if (targetList === undefined) {
        throw new Error(`there is no targetList named ${listName}`)
    }
    const { offset } = targetList

    const targetListConfig = appConfig.recipeLists.find(config => config.name === listName)
    if (targetListConfig === undefined) {
        throw new Error(`there is no targetListConfig named ${listName}`)
    }
    const { type } = targetListConfig

    const recipes = await getByComplexSearch({
        addRecipeInformation: true,
        maxReadyTime: cookingTime === "No Limit" ? undefined : cookingTime,
        diet,
        intolerances,
        number: appConfig.recipeListLimit,
        offset,
        type
    })
    
    thunkApi.dispatch(setAppScreen({ screen: "Home" }))

    return {
        listName, recipes
    }

})

/** The main slice */

export const recipeListsSlice = createSlice({
    name: 'recipeLists',
    initialState,
    reducers: {

        setActiveList: (state, action: PayloadAction<{ listName: string }>) => {
            state.activeList = action.payload.listName
        },

        incrementOffset: (state, action: PayloadAction<{ listName: string }>) => {
            const list = state.lists.find(list => list.name === action.payload.listName)
            if (list === undefined) {
                throw new Error(`there is no list named ${action.payload.listName}`)
            }
            list.offset += appConfig.recipeListLimit
        }

    },
    extraReducers: builder => {

        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            const targetList = state.lists.find(list => list.name === action.payload.listName)
            if (targetList === undefined) {
                throw new Error(`there is no targetList named ${action.payload.listName}`)
            }
            targetList.recipes = [...targetList.recipes, ...action.payload.recipes]
        })

    }
})

export const { incrementOffset, setActiveList } = recipeListsSlice.actions
