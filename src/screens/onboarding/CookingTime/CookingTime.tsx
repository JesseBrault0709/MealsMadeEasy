import { OnboardingScreen } from "../OnboardingScreen/OnboardingScreen"
import { ClockSlider } from "../../../inputs/ClockSlider/ClockSlider"
import { RecipePreferences } from "../../../types/RecipePreferences"

export type CookingTimeProps = {

    /** The cookingTimes that the user can choose from */
    cookingTimes: ReadonlyArray<RecipePreferences['cookingTime']>,

    /** The callback for when the user changes their desired cookingTime */
    onChange: (newCookingTime: RecipePreferences['cookingTime']) => void,

    /** The index of the initial cookingTime in the cookingTimes prop */
    initialCookingTimeIndex?: number

}

/**
 * The page where the user selects their preferred cooking time.
 */
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