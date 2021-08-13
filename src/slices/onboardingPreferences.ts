import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OnboardingPreferences } from '../types/OnboardingPreferences'

type OnboardingPreferencesState = {
    preferences: OnboardingPreferences
    completedOnboarding: boolean
}

const initialState: OnboardingPreferencesState = {
    preferences: {
        cookingTime: null,
        diet: null,
        intolerances: null
    },
    completedOnboarding: false
}

export const onboardingPreferencesSlice = createSlice({
    name: 'recipePreferences',
    initialState,
    reducers: {
        setPreferences: (
            state,
            action: PayloadAction<{ preferences: OnboardingPreferences }>
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
                cookingTime: OnboardingPreferences['cookingTime']
            }>
        ) => {
            state.preferences = {
                ...state.preferences,
                cookingTime: action.payload.cookingTime
            }
        },

        setDiet: (
            state,
            action: PayloadAction<{ diet: OnboardingPreferences['diet'] }>
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
                intolerances: OnboardingPreferences['intolerances']
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
} = onboardingPreferencesSlice.actions
