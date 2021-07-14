import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { appConfig } from "../appConfig";
import { getByComplexSearch } from "../client/complexSearch";
import { RecipeOverview } from "../client/RecipeOverview";
import { AppState } from "../index";
import { setAppScreen } from "./appScreens";

type RecipeListsState = {
    lists: ReadonlyArray<{
        name: string,
        currentOffset: number,
        recipesByOffset: ReadonlyArray<{
            offset: number,
            recipes: ReadonlyArray<RecipeOverview>
        }>
    }>
    activeList?: string

    fetchStatus: 'idle' | 'fetching' | 'error'
    fetchError?: SerializedError
}

const initialState: RecipeListsState = {
    lists: appConfig.recipeLists.map(listConfig => ({
        name: listConfig.name,
        currentOffset: 0,
        recipesByOffset: []
    })),
    fetchStatus: 'idle'
}

/** Middleware thunk to retrieve recipes */
export const fetchRecipes = createAsyncThunk<
    {
        listName: string,
        offset: number,
        recipes: ReadonlyArray<RecipeOverview>
    } | undefined,
    string,
    {
        state: AppState
    }
>('recipeLists/fetchRecipes', async (listName: string, thunkApi) => {
    const state = thunkApi.getState()

    const targetList = state.recipeLists.lists.find(list => list.name === listName)
    if (targetList === undefined) {
        throw new Error(`there is no targetList named ${listName}`)
    }
    const { currentOffset } = targetList

    const recipesForOffset = targetList.recipesByOffset.find(({ offset }) => offset === currentOffset)

    if (recipesForOffset !== undefined) {
        return undefined
    }

    const { cookingTime, diet, intolerances } = state.recipePreferences.preferences


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
        offset: currentOffset,
        type
    })
    
    thunkApi.dispatch(setAppScreen({ screen: "Home" }))

    return {
        listName, offset: currentOffset, recipes
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
            list.currentOffset += appConfig.recipeListLimit
        },

        setActiveListStatus: (state, action: PayloadAction<{ status: RecipeListsState['fetchStatus'] }>) => {
            state.fetchStatus = action.payload.status
        },

        setActiveListError: (state, action: PayloadAction<{ error: SerializedError }>) => {
            state.fetchError = action.payload.error
        },

        resetAllRecipes: state => {
            state.lists.forEach(list => {
                list.currentOffset = 0
                list.recipesByOffset = []
            })
        }

    },
    extraReducers: builder => {

        builder.addCase(fetchRecipes.pending, state => {
            state.fetchStatus = 'fetching'
        })

        builder.addCase(fetchRecipes.fulfilled, (state, action) => {

            state.fetchStatus = 'idle'

            if (action.payload !== undefined) {
                const targetList = state.lists.find(list => list.name === action.payload!.listName) // because we checked in the if
                if (targetList === undefined) {
                    throw new Error(`there is no targetList named ${action.payload.listName}`)
                }
                targetList.recipesByOffset.push({
                    offset: action.payload.offset,
                    recipes: action.payload.recipes as RecipeOverview[]
                })
            }
        })

        builder.addCase(fetchRecipes.rejected, (state, action) => {

            state.fetchStatus = 'error'
            state.fetchError = action.error

        })

    }
})

export const { 
    incrementOffset, 
    setActiveList, 
    setActiveListStatus, 
    setActiveListError, 
    resetAllRecipes 
} = recipeListsSlice.actions
