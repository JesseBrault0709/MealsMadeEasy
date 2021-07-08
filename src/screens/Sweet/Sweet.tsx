import { OnboardingScreen } from "../onboarding/OnboardingScreen/OnboardingScreen"
import { LoadingCircle } from '../common/LoadingCircle/LoadingCircle'

export function Sweet() {
    return <OnboardingScreen
        title="Sweeeeet!"
        instruction="We're personalizing your recipe book."
    >
        <LoadingCircle />
    </OnboardingScreen>
}