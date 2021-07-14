import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { appConfig } from "./appConfig";
import { configureStore } from "@reduxjs/toolkit";
import { appScreensSlice } from "./slices/appScreens";
import { dayMealPlansSlice } from "./slices/dayMealPlans";
import { fullRecipesSlice } from "./slices/fullRecipes";
import { homeScreensSlice } from "./slices/homeScreens";
import { recipeBookSlice } from "./slices/recipeBook";
import { recipeListsSlice } from "./slices/recipeLists";
import { recipePreferencesSlice } from "./slices/recipePreferences";
import { selectionModeSlice } from "./slices/selectionMode";

/** The AppConfig context */
export const AppConfigContext = React.createContext(appConfig)


/** The main store object from redux, and associated consts/types */
const store = configureStore({
    reducer: {
        dayMealPlans: dayMealPlansSlice.reducer,
        fullRecipes: fullRecipesSlice.reducer,
        homeScreens: homeScreensSlice.reducer,
        recipeBook: recipeBookSlice.reducer,
        recipeLists: recipeListsSlice.reducer,
        recipePreferences: recipePreferencesSlice.reducer,
        screens: appScreensSlice.reducer,
        selectionMode: selectionModeSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useAppStore = () => useStore<AppState>()

/** Execution starts here */


/** Render the App */

ReactDOM.render(
    <React.StrictMode>
        <AppConfigContext.Provider value={appConfig}>
            <Provider store={store}>
                <App />
            </Provider>
        </AppConfigContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
