import { CarouselInput } from "../inputs/CarouselInput";
import { OrderedScreenCollection } from "../screens/OrderedScreenCollection";
import { ClockSlider } from "../inputs/ClockSlider";

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
 * The collection of onboarding screens. Will eventually have a prop
 * which is a callback which will take the selected values.
 * 
 * Props:
 *  * cookingTimes: string[]: an array of cooking time options
 *  * diets: string[]: an array of dietary options
 *  * mouths: number[]: an array of number of mouths to feed
 *  * onSubmit: (timeOption: string, diet: string, mouths: number) => void, optional: a callback to be run when the user submits their options
 */
export function Onboarding(props) {

    // not using useState() since no rendering needs to be triggered when this changes
    let currentCookingTimeIndex = 0

    function onCookingTimeChange(selectedIndex) {
        currentCookingTimeIndex = selectedIndex
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
        if (props.onSubmit !== undefined && props.onSubmit !== null) {
            props.onSubmit(
                props.cookingTimes[currentCookingTimeIndex],
                props.diets[currentDietIndex],
                props.mouths[currentMouthsIndex]
            )
        }
    }


    return <OrderedScreenCollection onLastNext={onLastNext}>

        <OnboardingScreen
            prompt="How much time do you have?"
            instruction="Drag to let us know your ideal cooking time."
        >
            <ClockSlider options={props.cookingTimes} onChange={onCookingTimeChange} initialOption={currentCookingTimeIndex}/>
        </OnboardingScreen>

        <OnboardingScreen
            prompt="What diet do you follow?"
            instruction="Tap on your preference."
        >

            <ToggleButtonGroup type="radio" name="diet" onChange={onDietSelection} vertical>
                {props.diets.map((diet, index) => <ToggleButton key={diet} value={index}>{diet}</ToggleButton>)}
            </ToggleButtonGroup>

        </OnboardingScreen>

        <OnboardingScreen
            prompt="How many mouths to feed?"
            instruction="Drag to select how many people you're cooking for."
        >
            <CarouselInput options={props.mouths} onChange={onMouthsChange} initialIndex={currentMouthsIndex} />
        </OnboardingScreen>

    </OrderedScreenCollection>
}