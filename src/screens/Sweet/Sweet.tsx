import './Sweet.css'

import { OnboardingScreen } from "../onboarding/OnboardingScreen/OnboardingScreen"
import LoadingCircle from './assets/LoadingCircle.png'

export function Sweet() {
    return <OnboardingScreen
        title="Sweeeeet!"
        instruction="We're personalizing your recipe book."
    >
        <div className="sweet">
            <img src={LoadingCircle} alt=""/>
        </div>
    </OnboardingScreen>
}