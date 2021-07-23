
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { appConfig } from "./appConfig";
import { configureStore } from "@reduxjs/toolkit";
import { appScreensSlice } from "./slices/appScreens";
import { dayMealPlansSlice, mergeDayMealPlans } from "./slices/dayMealPlans";
import { fullRecipesSlice } from "./slices/fullRecipes";
import { homeScreensSlice } from "./slices/homeScreens";
import { recipeBookSlice } from "./slices/recipeBook";
import { recipeListsSlice } from "./slices/recipeLists";
import { recipePreferencesSlice, setCompletedOnboarding, setPreferences } from "./slices/recipePreferences";
import { selectionModeSlice } from "./slices/selectionMode";
import { DayMealPlan } from "./types/DayMealPlan";
import { RecipePreferences } from "./types/RecipePreferences";
// import './index.css';
import './styles.scss'

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

/** Hydrate dayMealPlans with values from localStorage */

const LS_DAY_MEAL_PLANS = 'dayMealPlans'

const hydrateDayMealPlans = () => {
    console.log('loading oldDayMealPlans from localStorage')
    const oldDayMealPlansJSON = localStorage.getItem(LS_DAY_MEAL_PLANS)
    if (oldDayMealPlansJSON !== null) {
        try {
            console.log('parsing oldDayMealPlans and dispatching to store')
            const oldDayMealPlans: ReadonlyArray<DayMealPlan> = JSON.parse(oldDayMealPlansJSON)
            store.dispatch(mergeDayMealPlans({ plans: oldDayMealPlans }))
        } catch (err) {
            console.error(err)
        }
    } else {
        console.log('no dayMealPlans in storage')
    }
}

hydrateDayMealPlans()

/** When state.dayMealPlans.plans is different, update local storage */

const getWriteDayMealPlans = () => {
    let oldDayMealPlans: AppState['dayMealPlans']['plans'] = []
    return () => {
        const state = store.getState()
        if (oldDayMealPlans !== state.dayMealPlans.plans) {
            console.log('writing dayMealPlans to localStorage')
            localStorage.setItem(LS_DAY_MEAL_PLANS, JSON.stringify(state.dayMealPlans.plans))
            oldDayMealPlans = state.dayMealPlans.plans
        }
    }
}

store.subscribe(getWriteDayMealPlans())

/** Hydrate recipePreferences from localStorage */

const LS_RECIPE_PREFERENCES = 'recipePreferences'

const hydrateRecipePreferences = () => {
    console.log('loading recipePreferences from localStorage')
    const oldPreferencesJSON = localStorage.getItem(LS_RECIPE_PREFERENCES)
    if (oldPreferencesJSON !== null) {
        try {
            const oldPreferences: RecipePreferences = JSON.parse(oldPreferencesJSON)
            store.dispatch(setPreferences({ preferences: oldPreferences }))
        } catch (err) {
            console.error(err)
        }
    } else {
        console.log('no recipePreferences in localStorage')
    }
}

hydrateRecipePreferences()

/** When recipePreferences changes, write to localStorage */

const getWriteRecipePreferences = () => {
    let oldPreferences: AppState['recipePreferences']['preferences'] = store.getState().recipePreferences.preferences
    return () => {
        const state = store.getState()
        if (state.recipePreferences.preferences !== oldPreferences) {
            console.log('writing recipePreferences to localStorage')
            localStorage.setItem(LS_RECIPE_PREFERENCES, JSON.stringify(state.recipePreferences.preferences))
            oldPreferences = state.recipePreferences.preferences
        }
    }
}

store.subscribe(getWriteRecipePreferences())

/** Hydrate completedOnboarding from storage */

const LS_COMPLETED_ONBOARDING = 'completedOnboarding';

(() => {
    console.log('hydrating completedOnboarding from localStorage')
    const completedOnboardingString = localStorage.getItem(LS_COMPLETED_ONBOARDING)
    if (completedOnboardingString !== null) {
        store.dispatch(setCompletedOnboarding({ completedOnboarding: completedOnboardingString === 'true' ? true : false }))
    } else {
        console.log('no completedOnboarding in localStorage')
    }
})();

/** When completedOnboarding changes, write to localStorage */

const getWriteCompletedOnboarding = () => {
    let oldCompletedOnboarding: AppState['recipePreferences']['completedOnboarding'] = store.getState().recipePreferences.completedOnboarding
    return () => {
        const state = store.getState()
        if (state.recipePreferences.completedOnboarding !== oldCompletedOnboarding) {
            console.log('writing completedOnboarding to localStorage')
            localStorage.setItem(LS_COMPLETED_ONBOARDING, state.recipePreferences.completedOnboarding ? 'true' : 'false')
            oldCompletedOnboarding = state.recipePreferences.completedOnboarding
        }
    }
}

store.subscribe(getWriteCompletedOnboarding())


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
