import { configureStore } from "@reduxjs/toolkit";
import { recipePreferencesSlice } from "./slices/recipePreferences";
import { recipeListsSlice } from "./slices/recipeLists";
import { appScreensSlice } from "./slices/appScreens";
import { homeScreensSlice } from "./slices/homeScreens";
import { recipeBookSlice } from "./slices/recipeBook";
import { recipeInfoSlice } from "./slices/recipeInfo";

export const store = configureStore({
    reducer: {
        homeScreens: homeScreensSlice.reducer,
        recipeBook: recipeBookSlice.reducer,
        recipeInfo: recipeInfoSlice.reducer,
        recipeLists: recipeListsSlice.reducer,
        recipePreferences: recipePreferencesSlice.reducer,
        screens: appScreensSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch