import './styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
    Provider,
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
    useStore
} from 'react-redux'
import { appConfig } from './appConfig'
import { configureStore } from '@reduxjs/toolkit'
import { dayMealPlansSlice, mergeDayMealPlans } from './slices/dayMealPlans'
import { fullRecipesSlice } from './slices/fullRecipes'
import { homeScreensSlice } from './slices/homeScreens'
import {
    recipeListsSlice,
    RecipeListsState,
    setActiveList,
    setFetchLimit,
    setRecipeLists
} from './slices/recipeLists'
import {
    onboardingPreferencesSlice,
    setCompletedOnboarding,
    setPreferences
} from './slices/onboardingPreferences'
import { selectionModeSlice } from './slices/selectionMode'
import { DayMealPlan, getBlankDayMealPlan } from './types/DayMealPlan'
import { OnboardingPreferences } from './types/OnboardingPreferences'
import { setRecentSearches, recentSearchesSlice } from './slices/recentSearches'
import {
    searchPreferencesSlice,
    setSearchSort
} from './slices/searchPreferences'
import { BrowserRouter } from 'react-router-dom'

/** The AppConfig context */
export const AppConfigContext = React.createContext(appConfig)

/** The main store object from redux, and associated consts/types */
const store = configureStore({
    reducer: {
        dayMealPlans: dayMealPlansSlice.reducer,
        fullRecipes: fullRecipesSlice.reducer,
        homeScreens: homeScreensSlice.reducer,
        recentSearches: recentSearchesSlice.reducer,
        recipeLists: recipeListsSlice.reducer,
        onboardingPreferences: onboardingPreferencesSlice.reducer,
        searchPreferences: searchPreferencesSlice.reducer,
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
    // begin with a week's worth of plans starting from today's date

    const newPlans = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(dayIndex => {
        const date = new Date()
        date.setDate(date.getDate() + dayIndex)
        return getBlankDayMealPlan(date, appConfig.meals)
    })

    store.dispatch(mergeDayMealPlans({ plans: newPlans }))

    // load old plans from localStorage

    console.log('loading oldDayMealPlans from localStorage')
    const oldDayMealPlansJSON = localStorage.getItem(LS_DAY_MEAL_PLANS)
    if (oldDayMealPlansJSON !== null) {
        try {
            console.log('parsing oldDayMealPlans and dispatching to store')
            const oldDayMealPlans: ReadonlyArray<DayMealPlan> = JSON.parse(
                oldDayMealPlansJSON
            )
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
            localStorage.setItem(
                LS_DAY_MEAL_PLANS,
                JSON.stringify(state.dayMealPlans.plans)
            )
            oldDayMealPlans = state.dayMealPlans.plans
        }
    }
}

store.subscribe(getWriteDayMealPlans())

/** Hydrate recipeLists using appConfg */

const hydrateRecipeLists = () => {
    // create list objects from config

    const lists: RecipeListsState['lists'] = appConfig.recipeLists.map(
        ({ name, type }) => ({
            name,
            type,
            currentOffset: 0,
            recipesByOffset: []
        })
    )
    store.dispatch(setRecipeLists({ lists }))

    // set fetchLimit from config

    store.dispatch(setFetchLimit({ fetchLimit: appConfig.recipeListLimit }))

    // set initially active list from config

    const initiallyActiveList = appConfig.recipeLists.find(
        recipeList => recipeList.initiallyActive
    )
    if (initiallyActiveList === undefined) {
        throw new Error(`There is no initiallyActive recipeList in the config`)
    }
    store.dispatch(setActiveList({ listName: initiallyActiveList.name }))
}

hydrateRecipeLists()

/** Hydrate recipePreferences from localStorage */

const LS_RECIPE_PREFERENCES = 'recipePreferences'

const hydrateRecipePreferences = () => {
    console.log('loading recipePreferences from localStorage')
    const oldPreferencesJSON = localStorage.getItem(LS_RECIPE_PREFERENCES)
    if (oldPreferencesJSON !== null) {
        try {
            const oldPreferences: OnboardingPreferences = JSON.parse(
                oldPreferencesJSON
            )
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
    let oldPreferences: AppState['onboardingPreferences']['preferences'] = store.getState()
        .onboardingPreferences.preferences
    return () => {
        const state = store.getState()
        if (state.onboardingPreferences.preferences !== oldPreferences) {
            console.log('writing recipePreferences to localStorage')
            localStorage.setItem(
                LS_RECIPE_PREFERENCES,
                JSON.stringify(state.onboardingPreferences.preferences)
            )
            oldPreferences = state.onboardingPreferences.preferences
        }
    }
}

store.subscribe(getWriteRecipePreferences())

/** Hydrate completedOnboarding from storage */

const LS_COMPLETED_ONBOARDING = 'completedOnboarding'

;(() => {
    console.log('hydrating completedOnboarding from localStorage')
    const completedOnboardingString = localStorage.getItem(
        LS_COMPLETED_ONBOARDING
    )
    if (completedOnboardingString !== null) {
        store.dispatch(
            setCompletedOnboarding({
                completedOnboarding:
                    completedOnboardingString === 'true' ? true : false
            })
        )
    } else {
        console.log('no completedOnboarding in localStorage')
    }
})()

/** When completedOnboarding changes, write to localStorage */

const getWriteCompletedOnboarding = () => {
    let oldCompletedOnboarding: AppState['onboardingPreferences']['completedOnboarding'] = store.getState()
        .onboardingPreferences.completedOnboarding
    return () => {
        const state = store.getState()
        if (
            state.onboardingPreferences.completedOnboarding !==
            oldCompletedOnboarding
        ) {
            console.log('writing completedOnboarding to localStorage')
            localStorage.setItem(
                LS_COMPLETED_ONBOARDING,
                state.onboardingPreferences.completedOnboarding
                    ? 'true'
                    : 'false'
            )
            oldCompletedOnboarding =
                state.onboardingPreferences.completedOnboarding
        }
    }
}

store.subscribe(getWriteCompletedOnboarding())

/** Hydrate recentSearches from local storage */

const LS_RECENT_SEARCHES = 'recentSearches'

;(() => {
    console.log('hydrating recentSearches from localStorage')
    const recentSearchesString = localStorage.getItem(LS_RECENT_SEARCHES)
    if (recentSearchesString !== null) {
        try {
            const recentSearches: ReadonlyArray<string> = JSON.parse(
                recentSearchesString
            )
            store.dispatch(setRecentSearches({ searches: recentSearches }))
        } catch (err) {
            console.error(`error while parsing recentSearchesString: ${err}`)
        }
    } else {
        console.log(`no recentSearchesString in localStorage`)
    }
})()

/** When recentSearches changes, write to localStorage */

const getWriteRecentSearches = () => {
    let oldRecentSearches = store.getState().recentSearches.searches

    return () => {
        const { searches } = store.getState().recentSearches
        if (searches !== oldRecentSearches) {
            console.log('writing recentSearches to localStorage')
            localStorage.setItem(LS_RECENT_SEARCHES, JSON.stringify(searches))
            oldRecentSearches = searches
        }
    }
}

store.subscribe(getWriteRecentSearches())

/** Set the current sort option from appConfig's default option */
;(() => {
    console.log('setting current sort option from appConfig')
    const defaultSortingOption = appConfig.availbleSortingOptions.find(
        sortingOption => sortingOption.default
    )
    if (defaultSortingOption !== undefined) {
        store.dispatch(setSearchSort({ sort: defaultSortingOption.apiValue }))
    }
})()

/** Render the App */

ReactDOM.render(
    <React.StrictMode>
        <AppConfigContext.Provider value={appConfig}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </AppConfigContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
