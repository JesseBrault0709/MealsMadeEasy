/**
 * TODO as of 6/28/21:
 *  * Update documentation to include JSDoc types
 *  * nested function needs to be of form const func = lambda
 */

import { OnboardingScreen } from "./OnboardingScreen"
import { Button } from "react-bootstrap"
import { TwoColumnButtons } from "../../inputs/TwoColumnButtons/TwoColumnButtons"

/**
 * Props:
 *  * diets: string[]: an array diet strings
 *  * onClick: (diet: string) => void, optional: 
 *      a callback for when the given diet is clicked.
 */
export function Diet(props) {
    return <OnboardingScreen
        prompt="What diet do you follow?"
        instruction="Tap on your preference."
    >

        <TwoColumnButtons>
            {
                props.diets.map(diet => {

                    function onClick() {
                        if (props.onClick !== undefined && props.onClick !== null) {
                            props.onClick(diet)
                        }
                    }

                    return <Button onClick={onClick} key={diet}>
                        {diet}
                    </Button>
                })
            }
        </TwoColumnButtons>

    </OnboardingScreen>
}