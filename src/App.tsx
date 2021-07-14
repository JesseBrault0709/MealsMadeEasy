import "./App.css";

import { useContext, useEffect } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { RecipePreferences } from './types/RecipePreferences';
import { Sweet } from "./screens/Sweet/Sweet";
import { Splash } from "./screens/Splash/Splash";
import { useAppDispatch, useAppSelector, useAppStore } from "./index"
import { setPreferences } from "./slices/recipePreferences";
import { fetchRecipes, setActiveList } from "./slices/recipeLists";
import { setAppScreen } from "./slices/appScreens";
import { Home } from "./screens/home/Home";
import { mergeDayMealPlans } from "./slices/dayMealPlans";
import { DayMealPlan } from "./types/DayMealPlan";
import { AppConfigContext } from ".";

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

/** The possible screens */
export type AppScreen = "Splash" | "Onboarding" | "Sweet" | "Home"

function App() {

    const config = useContext(AppConfigContext)

    const dispatch = useAppDispatch()

    const store = useAppStore()

    /** Load the old day meal plans, if they exist */

    useEffect(() => {
        const oldDayMealPlansJSON = localStorage.getItem('dayMealPlans')
        if (oldDayMealPlansJSON !== null) {
            try {
                const oldDayMealPlans: ReadonlyArray<DayMealPlan> = JSON.parse(oldDayMealPlansJSON)
                dispatch(mergeDayMealPlans({ plans: oldDayMealPlans }))
            } catch (err) {
                console.error(err)
            }
        }

        store.subscribe(() => {
            const state = store.getState()
            localStorage.setItem('dayMealPlans', JSON.stringify(state.dayMealPlans.plans))
        })
    }, [dispatch, store])

    /** Load the old recipePreferences, if they exist */

    useEffect(() => {
        const oldPreferencesJSON = localStorage.getItem('recipePreferences')
        if (oldPreferencesJSON !== null) {
            try {
                const oldPreferences: RecipePreferences = JSON.parse(oldPreferencesJSON)
                dispatch(setPreferences({ preferences: oldPreferences }))
            } catch (err) {
                console.error(err)
            }
        }

        store.subscribe(() => {
            const state = store.getState()
            localStorage.setItem('recipePreferences', JSON.stringify(state.recipePreferences.preferences))
        })
    }, [dispatch, store])

    /** Various effects for transitioning between screens */

    const currentScreen = useAppSelector(state => state.screens.current)

    const recipePreferences = useAppSelector(state => state.recipePreferences.preferences)

    useEffect(() => {
        if (currentScreen === "Splash") {
            setTimeout(() => {
                if (recipePreferences === undefined) {
                    dispatch(setAppScreen({ screen: "Onboarding" }))
                } else {
                    const firstListName = config.recipeLists[0].name
                    dispatch(setActiveList({ listName: firstListName }))
                    dispatch(fetchRecipes(firstListName))
                    dispatch(setAppScreen({ screen: 'Home' }))
                }
            }, 2000)
        }
    }, [currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentScreen === "Sweet") {
            const firstListName = config.recipeLists[0].name
            dispatch(setActiveList({ listName: firstListName }))
            dispatch(fetchRecipes(firstListName))
        }
    }, [currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps


    /** Main getScreen function */

    const getScreen = () => {
        if (currentScreen === "Splash") {
            
            return <Splash />

        } else if (currentScreen === "Onboarding") {

            const onOnboardingSubmit = (preferences: RecipePreferences) => {
                dispatch(setPreferences({ preferences }))
                dispatch(setAppScreen({ screen: "Sweet" }))
            }
    
            return <Onboarding
                onSubmit={onOnboardingSubmit}
            />
    
        } else if (currentScreen === "Sweet") { 

            return <Sweet />

        } else if (currentScreen === "Home") {

            return <Home />
        }
    }

    return <div className="App">
        {getScreen()}
    </div>

}

export default App;

