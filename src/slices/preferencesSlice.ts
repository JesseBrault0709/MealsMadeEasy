import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipePreferences } from "../types/RecipePreferences";

type RecipePreferencesState = {
    preferences: RecipePreferences
}

const initialState: RecipePreferencesState = {
    preferences: { }
}

export const recipePreferencesSlice = createSlice({
    name: 'recipePreferences',
    initialState,
    reducers: {

        setCookingTime: (
            state, 
            action: PayloadAction<{ cookingTime: RecipePreferences['cookingTime'] }>
        ) => {
            state.preferences.cookingTime = action.payload.cookingTime
        },

        setDiet: (
            state,
            action: PayloadAction<{ diet: RecipePreferences['diet'] }>
        ) => {
            state.preferences.diet = action.payload.diet
        },

        setIntolerances: (
            state,
            action: PayloadAction<{ intolerances: RecipePreferences['intolerances'] }>
        ) => {
            action.payload.intolerances === undefined ?
                state.preferences.intolerances = undefined :
                state.preferences.intolerances = [...action.payload.intolerances]
        }

    }
})

export const { setCookingTime, setDiet, setIntolerances } = recipePreferencesSlice.actions

