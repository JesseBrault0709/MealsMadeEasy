import { OnboardingScreen } from "./OnboardingScreen"
import { Button } from "react-bootstrap"
import { TwoColumnButtons } from "../../inputs/TwoColumnButtons/TwoColumnButtons"

/**
 * Props:
 *  * diets: [string, boolean][]: an array of tuples consisting of a
 *      diet-string and a boolean indicating wether the diet is
 *      currently selected.
 *  * onClick: (diet: string, oldValue: boolean) => void, optional: 
 *      a callback for when the selected diet is clicked.
 */
export function Diet(props) {
    return <OnboardingScreen
        prompt="What diet do you follow?"
        instruction="Tap on your preference."
    >

        <TwoColumnButtons>
            {
                props.diets.map(dietAndValue => {

                    const [diet, value] = dietAndValue

                    function onClick() {
                        if (props.onClick !== undefined && props.onClick !== null) {
                            props.onClick(diet, value)
                        }
                    }

                    return <Button active={value} onClick={onClick} key={diet}>
                        {diet}
                    </Button>
                })
            }
        </TwoColumnButtons>

    </OnboardingScreen>
}