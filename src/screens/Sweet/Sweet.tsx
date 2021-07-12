import { OnboardingScreen } from "../onboarding/OnboardingScreen/OnboardingScreen"
import { LoadingCircle } from '../common/LoadingCircle/LoadingCircle'
import { useAppSelector } from "../../hooks"
import { TechnicalError } from "../errors/TechnicalError/TechnicalError"

export function Sweet() {

    const fetchStatus = useAppSelector(state => state.recipeLists.fetchStatus)
    
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

        {
            fetchStatus === 'error' ?
                <TechnicalError
                    message="Server error. Please try again later."
                    onTryAgain={() => console.log('try again')}
                /> : ''
        }
    </OnboardingScreen>
}