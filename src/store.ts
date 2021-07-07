import { configureStore } from "@reduxjs/toolkit";
import { recipePreferencesSlice } from "./slices/recipePreferences";
import { recipeListsSlice } from "./slices/recipeLists";
import { appScreensSlice } from "./slices/appScreens";

export const store = configureStore({
    reducer: {
        recipePreferences: recipePreferencesSlice.reducer,
        recipeLists: recipeListsSlice.reducer,
        screens: appScreensSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch