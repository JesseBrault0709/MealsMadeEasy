import "./App.css";

import React, { useEffect } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { RecipePreferences } from './types/RecipePreferences';
import { Sweet } from "./screens/Sweet/Sweet";
import { Splash } from "./screens/Splash/Splash";
import { appConfig } from "./appConfig";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setPreferences } from "./slices/recipePreferences";
import { fetchRecipes, setActiveList } from "./slices/recipeLists";
import { setAppScreen } from "./slices/appScreens";
import { Home } from "./screens/home/Home";

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

/** The possible screens */
export type AppScreen = "Splash" | "Onboarding" | "Sweet" | "Home"

export const AppConfigContext = React.createContext(appConfig)

function App() {

    const dispatch = useAppDispatch()
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
                allCookingTimes={appConfig.availableCookingTimes}
                allDiets={appConfig.availableDiets}
                allIntolerances={appConfig.availableIntolerances}
                initialCookingTimeIndex={appConfig.initialCookingTimeIndex}
                onSubmit={onOnboardingSubmit}
            />
    
        } else if (currentScreen === "Sweet") { 

            return <Sweet />

        } else if (currentScreen === "Home") {

            return <Home />
        }
    }

    return <div className="App">
        <Provider store={store}>
            <AppConfigContext.Provider value={appConfig}>
                {getScreen()}
            </AppConfigContext.Provider>
        </Provider>
    </div>

}

export default App;

