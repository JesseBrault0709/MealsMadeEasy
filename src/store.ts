/**
 * TODO 7/8/21
 *  * Fix the model of the DayMealPlan so that the date is a number (timestamp)
 *      instead of a Date instance; this way it is fully serializable
 */

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { recipePreferencesSlice } from "./slices/recipePreferences";
import { recipeListsSlice } from "./slices/recipeLists";
import { appScreensSlice } from "./slices/appScreens";
import { homeScreensSlice } from "./slices/homeScreens";
import { recipeBookSlice } from "./slices/recipeBook";
import { dayMealPlansSlice } from "./slices/dayMealPlans";
import { selectionModeSlice } from "./slices/selectionMode";
import { fullRecipesSlice } from "./slices/fullRecipes";

export const store = configureStore({
    reducer: {
        dayMealPlans: dayMealPlansSlice.reducer,
        fullRecipes: fullRecipesSlice.reducer,
        homeScreens: homeScreensSlice.reducer,
        recipeBook: recipeBookSlice.reducer,
        recipeLists: recipeListsSlice.reducer,
        recipePreferences: recipePreferencesSlice.reducer,
        screens: appScreensSlice.reducer,
        selectionMode: selectionModeSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch