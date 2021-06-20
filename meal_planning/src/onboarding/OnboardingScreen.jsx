/**
 * Props:
 *  * prompt: string: the prompt displayed at the top of the screen.
 *  * instruction: string: the instruction to the user what to do with the control(s)
 * 
 * Children: the control(s) to render beneath the prompt/instructions
 */
export function OnboardingScreen(props) {
    return <>
        <h1>Let's get you started!</h1>
        <h2>{props.prompt}</h2>
        <span>({props.instruction})</span>

        <div>{props.children}</div>
    </>
}