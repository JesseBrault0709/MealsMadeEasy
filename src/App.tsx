import "./App.css";

import { useEffect } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { RecipePreferences } from './types/RecipePreferences';
import { Sweet } from "./screens/Sweet/Sweet";
import { Splash } from "./screens/Splash/Splash";
import { appConfig } from "./appConfig";
import { useAppDispatch, useAppSelector, useAppStore } from "./hooks";
import { setPreferences } from "./slices/recipePreferences";
import { fetchRecipes, setActiveList } from "./slices/recipeLists";
import { setAppScreen } from "./slices/appScreens";
import { Home } from "./screens/home/Home";
import { mergeDayMealPlans } from "./slices/dayMealPlans";
import { DayMealPlan } from "./types/DayMealPlan";

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

/** The possible screens */
export type AppScreen = "Splash" | "Onboarding" | "Sweet" | "Home"

function App() {

    const dispatch = useAppDispatch()

    const store = useAppStore()

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

    const currentScreen = useAppSelector(state => state.screens.current)

    useEffect(() => {
        if (currentScreen === "Splash") {
            setTimeout(() => {
                dispatch(setAppScreen({ screen: "Onboarding" }))
            }, 2000)
        }
    }, [currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentScreen === "Sweet") {
            const firstListName = appConfig.recipeLists[0].name
            dispatch(setActiveList({ listName: firstListName }))
            dispatch(fetchRecipes(firstListName))
        }
    }, [currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps

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

