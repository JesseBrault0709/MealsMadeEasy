/**
 * TODO as of 6/28/21:
 *  * Move the time/diet/intolerance choices to a JSON file which is then imported here.
 */

import { useState } from 'react';
import "./App.css";
import { Onboarding } from './screens/onboarding/Onboarding'
import { SPDiet, SPIntolerance } from './client/spoonacularTypes';
import { Home } from './screens/home/Home';
import { RecipePreferences } from './types/RecipePreferences';
import { getWeekOfBlankDayMealPlans } from './types/DayMealPlan';
import { MealName } from './types/MealName';

/** Set to true for dev mode. */
export const DEV_MODE = false


/** There are two main screens */
type Screen = "Onboarding" | "Home"

/**
 * For now these are hard-coded but eventually we want to move these elsewhere,
 * if possible.
 */
const availableCookingTimes: ReadonlyArray<RecipePreferences['cookingTime']> = ['No Limit', 15, 30, 45, 60]

const availableDiets: ReadonlyArray<SPDiet> = [
    'Vegan', 'Vegetarian',
    'Ketogenic', 'Pescetarian',
    'Paleo', 'Whole30'
]

const availableIntolerances: ReadonlyArray<SPIntolerance> = [
    'Dairy', 'Egg',
    'Gluten', 'Grain',
    'Peanut', 'Seafood',
    'Wheat'
]

const meals: ReadonlyArray<MealName> = ['Breakfast', 'Lunch', 'Dinner']

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

