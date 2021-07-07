import './OnboardingScreen.css'

export type OnboardingScreenProps = {
    title?: string
    prompt?: string
    instruction?: string
    children: React.ReactNode
}

export function OnboardingScreen(props: OnboardingScreenProps) {
    return <div className="onboarding-screen">
        
        <div className="onboarding-header">
            <h1>{props.title ?? "Let's get you started!"}</h1>
            {props.prompt ? <h2>{props.prompt}</h2> : ''}
            <span>({props.instruction})</span>
        </div>

        <div className="onboarding-children">
            {props.children}
        </div>

    </div>
}