/**
 * TODO as of 6/28/21:
 *  * Update documentation to include JSDoc types
 */

import { OnboardingScreen } from "./OnboardingScreen"
import { ClockSlider } from "../../inputs/ClockSlider/ClockSlider"
import { RecipePreferences } from "../../types/RecipePreferences"

export type CookingTimeProps = {
    cookingTimes: ReadonlyArray<RecipePreferences['cookingTime']>,
    onChange: (newCookingTime: RecipePreferences['cookingTime']) => void,
    initialCookingTimeIndex?: number
}

export function CookingTime(props: CookingTimeProps) {

    const options = props.cookingTimes.map(cookingTime => {
        if (typeof(cookingTime) === 'number') {
            return `${cookingTime} mins`
        } else {
            return cookingTime
        }
    })

    const onChange = (newValue: string) => {
        if (newValue === "No Limit") {
            props.onChange(newValue)
        } else {
            const numberString: string = newValue.slice(0, -5)
            const newNumberValue: number = parseInt(numberString)
            props.onChange(newNumberValue)
        }
    }

    return <OnboardingScreen
        prompt="How much time do you have?"
        instruction="Drag to let us know your ideal cooking time."
    >
        <ClockSlider options={options} onChange={onChange} initialOption={props.initialCookingTimeIndex} />
    </OnboardingScreen>
}