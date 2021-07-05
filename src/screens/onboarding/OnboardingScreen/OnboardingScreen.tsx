import './OnboardingScreen.css'

export type OnboardingScreenProps = {
    prompt?: string
    instruction?: string
    children: React.ReactNode
}

export function OnboardingScreen(props: OnboardingScreenProps) {
    return <div className="onboarding-screen">
        
        <div className="onboarding-header">
            <h1>Let's get you started!</h1>
            <h2>{props.prompt}</h2>
            <span>({props.instruction})</span>
        </div>

        <div className="onboarding-children">
            {props.children}
        </div>

    </div>
}