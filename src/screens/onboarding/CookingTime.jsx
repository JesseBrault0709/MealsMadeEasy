/**
 * TODO as of 6/28/21:
 *  * Update documentation to include JSDoc types
 */

import { OnboardingScreen } from "./OnboardingScreen"
import { ClockSlider } from "../../inputs/ClockSlider/ClockSlider"

/**
 * Props:
 *  * cookingTimes: string[]
 *  * onChange: (selectedIndex: number) => void, optional: a callback for when the clock slider's value is changed
 *  * initialOption: number, optional: the index of the initially selected option
 */
export function CookingTime(props) {
    return <OnboardingScreen
        prompt="How much time do you have?"
        instruction="Drag to let us know your ideal cooking time."
    >
        <ClockSlider options={props.cookingTimes} onChange={props.onChange} initialOption={props.initialOption}/>
    </OnboardingScreen>
}