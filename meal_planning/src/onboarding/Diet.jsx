import { OnboardingScreen } from "./OnboardingScreen"
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap"

/**
 * Props:
 *  * diets: string[]
 *  * onDietSelection: (selectedIndex: number) => void, optional: a callback for when the selected diet changes
 */
export function Diet(props) {
    return <OnboardingScreen
        prompt="What diet do you follow?"
        instruction="Tap on your preference."
    >

        <ToggleButtonGroup type="radio" name="diet" onChange={props.onDietSelection} vertical>
            {props.diets.map((diet, index) => <ToggleButton key={diet} value={index}>{diet}</ToggleButton>)}
        </ToggleButtonGroup>

    </OnboardingScreen>
}