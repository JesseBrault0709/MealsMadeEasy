/**
 * TODO as of 6/28/21:
 *  * nested function needs to be of form const func = lambda
 */

import { OnboardingScreen } from "./OnboardingScreen"
import { Button } from "react-bootstrap"
import { TwoColumnButtons } from "../../inputs/TwoColumnButtons/TwoColumnButtons"

/**
 * The page for the user to select their diet.
 * 
 * @param {{
 *  diets: ReadonlyArray<string>
 *  onClick?: (diet: string) => void
 * }} props
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