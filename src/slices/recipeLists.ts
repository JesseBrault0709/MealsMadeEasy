import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    SerializedError
} from '@reduxjs/toolkit'
import { getByComplexSearch } from '../client/complexSearch'
import { RecipeOverview } from '../client/RecipeOverview'
import { SPType } from '../client/spoonacularTypes'
import { AppState } from '../index'

export type RecipeListsState = {
    lists: ReadonlyArray<{
        name: string
        type: SPType
        currentOffset: number
        recipesByOffset: ReadonlyArray<{
            offset: number
            recipes: ReadonlyArray<RecipeOverview>
        }>
    }>
    activeList?: string

    fetchLimit: number

    fetchStatus: 'idle' | 'fetching' | 'error' | 'success'
    fetchError?: SerializedError
}

const initialState: RecipeListsState = {
    lists: [],
    fetchLimit: 0,
    fetchStatus: 'idle'
}

/** Middleware thunk to retrieve recipes */
export const fetchRecipes = createAsyncThunk<
    | {
          listName: string
          offset: number
          recipes: ReadonlyArray<RecipeOverview>
      }
    | undefined,
    string,
    {
        state: AppState
    }
>('recipeLists/fetchRecipes', async (listName: string, thunkApi) => {
    const state = thunkApi.getState()

    const targetList = state.recipeLists.lists.find(
        list => list.name === listName
    )
    if (targetList === undefined) {
        throw new Error(`there is no targetList named ${listName}`)
    }
    const { currentOffset, type } = targetList

    const recipesForOffset = targetList.recipesByOffset.find(
        ({ offset }) => offset === currentOffset
    )

    if (recipesForOffset !== undefined) {
        return undefined
    }

    const {
        cookingTime,
        diet,
        intolerances
    } = state.onboardingPreferences.preferences

    const { query, cuisines, sort } = state.searchPreferences

    const { fetchLimit } = state.recipeLists

    const recipes = await getByComplexSearch({
        addRecipeInformation: true,
        maxReadyTime:
            cookingTime === 'No Limit' || cookingTime === null
                ? undefined
                : cookingTime,
        diet: diet ?? undefined,
        intolerances: intolerances ?? undefined,
        cuisine: cuisines ?? undefined,
        sort: sort ?? undefined,
        number: fetchLimit,
        offset: currentOffset,
        type,
        query: query ?? undefined
    })

    return {
        listName,
        offset: currentOffset,
        recipes
    }
})

/** The main slice */

export const recipeListsSlice = createSlice({
    name: 'recipeLists',
    initialState,
    reducers: {
        setRecipeLists: (
            state,
            action: PayloadAction<{ lists: RecipeListsState['lists'] }>
        ) => {
            const { lists } = action.payload
            state.lists = lists.map(
                ({ name, type, currentOffset, recipesByOffset }) => ({
                    name,
                    type,
                    currentOffset,
                    recipesByOffset: recipesByOffset.map(
                        ({ offset, recipes }) => ({
                            offset,
                            recipes: [...recipes]
                        })
                    )
                })
            )
        },

        setActiveList: (state, action: PayloadAction<{ listName: string }>) => {
            state.activeList = action.payload.listName
        },

        setFetchLimit: (
            state,
            action: PayloadAction<{ fetchLimit: number }>
        ) => {
            state.fetchLimit = action.payload.fetchLimit
        },

        incrementOffset: (
            state,
            action: PayloadAction<{ listName: string }>
        ) => {
            const list = state.lists.find(
                list => list.name === action.payload.listName
            )
            if (list === undefined) {
                throw new Error(
                    `there is no list named ${action.payload.listName}`
                )
            }
            list.currentOffset += state.fetchLimit
        },

        setActiveListStatus: (
            state,
            action: PayloadAction<{ status: RecipeListsState['fetchStatus'] }>
        ) => {
            state.fetchStatus = action.payload.status
        },

        setActiveListError: (
            state,
            action: PayloadAction<{ error: SerializedError }>
        ) => {
            state.fetchError = action.payload.error
        },

        resetAllRecipes: state => {
            state.lists.forEach(list => {
                list.currentOffset = 0
                list.recipesByOffset = []
            })
        },

        clearFetchStatus: state => {
            state.fetchStatus = 'idle'
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchRecipes.pending, state => {
            state.fetchStatus = 'fetching'
        })

        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.fetchStatus = 'success'

            if (action.payload !== undefined) {
                const targetList = state.lists.find(
                    list => list.name === action.payload!.listName
                ) // because we checked in the if
                if (targetList === undefined) {
                    throw new Error(
                        `there is no targetList named ${action.payload.listName}`
                    )
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
    setRecipeLists,
    incrementOffset,
    setFetchLimit,
    setActiveList,
    setActiveListStatus,
    setActiveListError,
    resetAllRecipes,
    clearFetchStatus
} = recipeListsSlice.actions
