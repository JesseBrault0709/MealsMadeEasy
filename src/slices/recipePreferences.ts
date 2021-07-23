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
        intolerances: null
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
                intolerances
            } = action.payload.preferences

            state.preferences = {
                cookingTime,
                diet,
                intolerances: intolerances === null ? [] : [...intolerances]
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
    setCompletedOnboarding
} = recipePreferencesSlice.actions
