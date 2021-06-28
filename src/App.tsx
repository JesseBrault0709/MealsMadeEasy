/**
 * TODO as of 6/28/21:
 *  * Move the time/diet/intolerance choices to a JSON file which is then imported here.
 */

import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';

import "./App.css";
import { Onboarding } from './screens/onboarding/Onboarding'
import { SPDiet, SPIntolerance } from './client/spoonacularTypes';
import { Home } from './screens/home/Home';

type Screen = "Onboarding" | "Home"

/**
 * For now these are hard-coded but eventually we want to move these elsewhere,
 * if possible.
 */
const availableCookingTimes = ['No limit', '15 mins', '30 mins', '45 mins', '60 minutes', '90 minutes']

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

function App() {

    const [currentScreen, setCurrentScreen] = useState<Screen>("Onboarding")

    const [userPreferences, setUserPreferences] = useState<{
        cookingTime?: string,
        diet?: SPDiet,
        intolerances?: ReadonlyArray<SPIntolerance>
    }>({})

    if (currentScreen === "Onboarding") {

        const onOnboardingSubmit = (
            cookingTime: string, 
            diet: SPDiet, 
            intolerances: ReadonlyArray<SPIntolerance>
        ) => {
            console.log({
                cookingTime, diet, intolerances
            })
            setUserPreferences({
                cookingTime, diet, intolerances
            })
            setCurrentScreen("Home")
        }

        return <div className="App">
            <Onboarding
                cookingTimes={availableCookingTimes}
                diets={availableDiets}
                restrictions={availableIntolerances}
                onSubmit={onOnboardingSubmit}
            />
        </div>

    } else if (currentScreen === "Home") {

        return <div className="App">
            <Home 
                showLoadingScreen 
                initialCookingTime={userPreferences.cookingTime} 
                initialDiet={userPreferences.diet} 
                initialIntolerances={userPreferences.intolerances} 
            />
        </div>
    }

}

export default App;

