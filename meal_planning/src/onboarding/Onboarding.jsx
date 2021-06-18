import { CarouselInput } from "../inputs/CarouselInput";
import { OrderedScreenCollection } from "../screens/OrderedScreenCollection";

import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

/**
 * Props:
 *  * prompt: string: the prompt displayed at the top of the screen.
 *  * instruction: string: the instruction to the user what to do with the control(s)
 * 
 * Children: the control(s) to render beneath the prompt/instructions
 */
function OnboardingScreen(props) {
    return <>
        <h1>Let's get you started!</h1>
        <h2>{props.prompt}</h2>
        <span>({props.instruction})</span>

        <div>{props.children}</div>
    </>
}


/**
 * For now these are hard-coded but eventually we want to move these elsewhere.
 */
const timeOptions = ['No limit', '10 mins', '20 mins', '30 mins']
const diets = ['Vegetarian', 'Vegan', 'No Preference']
const mouths = [1, 2, 3, 4, 5, 6, 7, 8] // haha


/**
 * The collection of onboarding screens. Will eventually have a prop
 * which is a callback which will take the selected values.
 */
export function Onboarding() {

    // not using useState() since no rendering needs to be triggered when this changes
    let currentTimeOptionIndex = 0

    function onTimeOptionChange(selectedIndex) {
        currentTimeOptionIndex = selectedIndex
    }


    let currentDietIndex = null

    function onDietSelection(dietIndex) {
        currentDietIndex = dietIndex
    }


    let currentMouthsIndex = 0

    function onMouthsChange(selectedIndex) {
        currentMouthsIndex = selectedIndex
    }


    function onLastNext() { // i.e., submit for the whole set
        console.log(`currentTimeOptionIndex: ${currentTimeOptionIndex}, currentDietIndex: ${currentDietIndex}, currentMouthsIndex: ${currentMouthsIndex}`)
    }


    return <OrderedScreenCollection onLastNext={onLastNext}>

        <OnboardingScreen
            prompt="How much time do you have?"
            instruction="Drag to let us know your ideal cooking time."
        >
            <CarouselInput options={timeOptions} onChange={onTimeOptionChange} initialIndex={currentTimeOptionIndex}/>
        </OnboardingScreen>

        <OnboardingScreen
            prompt="What diet do you follow?"
            instruction="Tap on your preference."
        >

            <ToggleButtonGroup type="radio" name="diet" onChange={onDietSelection} vertical>
                {diets.map((diet, index) => <ToggleButton key={diet} value={index}>{diet}</ToggleButton>)}
            </ToggleButtonGroup>

        </OnboardingScreen>

        <OnboardingScreen
            prompt="How many mouths to feed?"
            instruction="Drag to select how many people you're cooking for."
        >
            <CarouselInput options={mouths} onChange={onMouthsChange} initialIndex={currentMouthsIndex} />
        </OnboardingScreen>

    </OrderedScreenCollection>
}