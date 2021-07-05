import "./App.css";

import AppConfig from './AppConfig_en.json'

import { useState } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { SPDiet, SPIntolerance } from './client/spoonacularTypes';
import { Home } from './screens/home/Home';
import { RecipePreferences } from './types/RecipePreferences';
import { getWeekOfBlankDayMealPlans } from './types/DayMealPlan';
import { MealName } from './types/MealName';

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true


/** There are two main screens */
type Screen = "Onboarding" | "Home"

const availableCookingTimes = 
    AppConfig.availableCookingTimes as 
        ReadonlyArray<RecipePreferences['cookingTime']>

const availableDiets = AppConfig.availableDiets as ReadonlyArray<SPDiet>

const availableIntolerances = 
    AppConfig.availableIntolerances as ReadonlyArray<SPIntolerance>

const meals = AppConfig.meals as ReadonlyArray<MealName>

function App() {

    const [currentScreen, setCurrentScreen] = useState<Screen>("Onboarding")

    const [userPreferences, setUserPreferences] = useState<RecipePreferences>({
        cookingTime: 'No Limit',
        intolerances: []
    })

    const getScreen = () => {
        if (currentScreen === "Onboarding") {

            const onOnboardingSubmit = (preferences: RecipePreferences) => {
                setUserPreferences(preferences)
                setCurrentScreen("Home")
            }
    
            return <Onboarding
                allCookingTimes={availableCookingTimes}
                allDiets={availableDiets}
                allIntolerances={availableIntolerances}
                onSubmit={onOnboardingSubmit}
            />
    
        } else if (currentScreen === "Home") {
    
            return <Home 
                showLoadingScreen 
                initialRecipePreferences={userPreferences}
                initialDayMealPlans={getWeekOfBlankDayMealPlans(['Breakfast', 'Lunch', 'Dinner'])}
                meals={meals}
            />
        }
    }

    return <div className="App">
        {getScreen()}
    </div>

}

export default App;

