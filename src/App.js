import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';

import "./App.css";
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/transitions/Sweet';

const Screens = Object.freeze({
    ONBOARDING: "ONBOARDING",
    SWEET: "SWEET"
})

/**
 * For now these are hard-coded but eventually we want to move these elsewhere,
 * if possible.
 */
const cookingTimes = ['No limit', '15 mins', '30 mins', '45 mins', '60 minutes', '90 minutes']

const diets = [
    'Vegan', 'Vegetarian',
    'Ketogenic', 'Pescatarian',
    'Paleo', 'Whole30',
]

const restrictions = [
    'Dairy free', 'Egg free',
    'Gluten free', 'Grain free',
    'Peanut free', 'Seafood free',
    'Wheat free', 'No restrictions'
]
 
function App() {

    const [currentScreen, setCurrentScreen] = useState(Screens.ONBOARDING)

    if (currentScreen === Screens.ONBOARDING) {

        function onOnboardingSubmit(cookingTime, diet, restrictions) {
            console.log({
                cookingTime, diet, restrictions
            })
            setCurrentScreen(Screens.SWEET)
        }

        return <div className="App">
            <Onboarding
                cookingTimes={cookingTimes}
                diets={diets}
                restrictions={restrictions}
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
