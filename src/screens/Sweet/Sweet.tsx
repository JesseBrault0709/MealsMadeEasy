import { OnboardingScreen } from "../onboarding/OnboardingScreen/OnboardingScreen"
import { LoadingCircle } from '../common/LoadingCircle/LoadingCircle'

export function Sweet() {
    return <OnboardingScreen
        title="Sweeeeet!"
        instruction="We're personalizing your recipe book."
    >
        <LoadingCircle style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}/>
    </OnboardingScreen>
}