import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecipePreferences } from '../types/RecipePreferences'

type RecipePreferencesState = {
    preferences: RecipePreferences
    completedOnboarding: boolean
}

const initialState: RecipePreferencesState = {
    preferences: {
        cookingTime: null,
        diet: null,
        intolerances: null,
        cuisines: null,
        sortingOption: null,
        query: null
    },
    completedOnboarding: false
}

export const recipePreferencesSlice = createSlice({
    name: 'recipePreferences',
    initialState,
    reducers: {
        setPreferences: (
            state,
            action: PayloadAction<{ preferences: RecipePreferences }>
        ) => {
            const {
                cookingTime,
                diet,
                intolerances,
                cuisines,
                sortingOption,
                query
            } = action.payload.preferences

            state.preferences = {
                cookingTime,
                diet,
                intolerances: intolerances === null ? [] : [...intolerances],
                cuisines: cuisines === null ? [] : [...cuisines],
                sortingOption,
                query
            }
        },

        setCookingTime: (
            state,
            action: PayloadAction<{
                cookingTime: RecipePreferences['cookingTime']
            }>
        ) => {
            state.preferences = {
                ...state.preferences,
                cookingTime: action.payload.cookingTime
            }
        },

        setDiet: (
            state,
            action: PayloadAction<{ diet: RecipePreferences['diet'] }>
        ) => {
            state.preferences = {
                ...state.preferences,
                diet: action.payload.diet
            }
        },

        /**
         * TODO: Investigate why there is the undefined check
         * since the RecipePreferences type can only be
         * [] | null
         */
        setIntolerances: (
            state,
            action: PayloadAction<{
                intolerances: RecipePreferences['intolerances']
            }>
        ) => {
            action.payload.intolerances === undefined
                ? (state.preferences = {
                      ...state.preferences,
                      intolerances: []
                  })
                : (state.preferences = {
                      ...state.preferences,
                      intolerances: [...(action.payload.intolerances ?? [])]
                  })
        },

        /**
         * TODO: simplfy to no null check based on the results
         * of the above investigation
         */
        setCuisines: (
            state,
            action: PayloadAction<{
                cuisines: RecipePreferences['cuisines']
            }>
        ) => {
            action.payload.cuisines === null
                ? (state.preferences = {
                      ...state.preferences,
                      cuisines: []
                  })
                : (state.preferences = {
                      ...state.preferences,
                      cuisines: [...action.payload.cuisines]
                  })
        },

        setSortingOption: (
            state,
            action: PayloadAction<{
                sortingOption: RecipePreferences['sortingOption']
            }>
        ) => {
            state.preferences = {
                ...state.preferences,
                sortingOption: action.payload.sortingOption
            }
        },

        setQuery: (
            state,
            action: PayloadAction<{ query: RecipePreferences['query'] }>
        ) => {
            state.preferences = {
                ...state.preferences,
                query: action.payload.query
            }
        },

        setCompletedOnboarding: (
            state,
            action: PayloadAction<{ completedOnboarding: boolean }>
        ) => {
            state.completedOnboarding = action.payload.completedOnboarding
        }
    }
})

export const {
    setPreferences,
    setCookingTime,
    setDiet,
    setIntolerances,
    setCuisines,
    setSortingOption,
    setQuery,
    setCompletedOnboarding
} = recipePreferencesSlice.actions
