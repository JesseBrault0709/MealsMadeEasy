import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';

import "./App.css";
import { Onboarding } from './onboarding/Onboarding'
import { Sweet } from './transitionScreens/Sweet';

const Screens = Object.freeze({
    ONBOARDING: "ONBOARDING",
    SWEET: "SWEET"
})

/**
 * For now these are hard-coded but eventually we want to move these elsewhere,
 * if possible.
 */
const cookingTimes = ['No limit', '10 mins', '20 mins', '30 mins']
const diets = ['Vegetarian', 'Vegan', 'No Preference']
const mouths = [1, 2, 3, 4, 5, 6, 7, 8] // haha
 
function App() {

    const [currentScreen, setCurrentScreen] = useState(Screens.ONBOARDING)

    if (currentScreen === Screens.ONBOARDING) {

        function onOnboardingSubmit(cookingTime, diet, mouths) {
            console.log({
                cookingTime, diet, mouths
            })
            setCurrentScreen(Screens.SWEET)
        }

        return <div className="App">
            <Onboarding
                cookingTimes={cookingTimes}
                diets={diets}
                mouths={mouths}
                onSubmit={onOnboardingSubmit}
            />
        </div>

    } else if (currentScreen === Screens.SWEET) {

        return <div className="App">
            <Sweet />
        </div>

    }
}

export default App;
