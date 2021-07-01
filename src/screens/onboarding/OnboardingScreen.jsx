/**
 * A wrapper for each Onboarding page. It displays
 * the page title, prompt, and instruction.
 * 
 * @param {{
 *  prompt: string,
 *  instruction: string,
 *  children: React.ReactNode
 * }} props
 */
export function OnboardingScreen(props) {
    return <>
        <h1>Let's get you started!</h1>
        <h2>{props.prompt}</h2>
        <span>({props.instruction})</span>

        <div>{props.children}</div>
    </>
}