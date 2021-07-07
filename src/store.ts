import { configureStore } from "@reduxjs/toolkit";
import { recipePreferencesSlice } from "./slices/preferencesSlice";
import { recipeListsSlice } from "./slices/recipeListsSlice";
import { recipesSlice } from "./slices/recipesSlice";

export const store = configureStore({
    reducer: {
        recipes: recipesSlice.reducer,
        recipePreferences: recipePreferencesSlice.reducer,
        recipeLists: recipeListsSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>