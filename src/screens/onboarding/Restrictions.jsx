/**
 * TODO as of 6/28/21:
 *  * Update documentation to include JSDoc types
 *  * Nested function should be of form const func = lambda
 */

import { OnboardingScreen } from "./OnboardingScreen"
import { TwoColumnButtons } from "../../inputs/TwoColumnButtons/TwoColumnButtons"
import { Button } from "react-bootstrap"

/**
 * Props:
 *  * restrictions: [string, boolean][]: an array of tuples consisting of a 
 *      restriction-string and a boolean indicating
 *      wether the restriction is currently selected.
 *  * onClick: (restriction: string, oldValue: boolean) => void, optional: 
 *      a callback for when a restriction button is clicked.
 */
export function Restrictions(props) {
    return <OnboardingScreen
        prompt="Do you have any dietary restrictions?"
        instruction="Tap on any restrictions you may have."
    >
        <TwoColumnButtons>
            {props.restrictions.map(restrictionAndValue => {
                const [restriction, value] = restrictionAndValue

                function onClick() {
                    if (props.onClick !== undefined && props.onClick !== null) {
                        props.onClick(restriction, value)
                    }
                }

                return <Button active={value} onClick={onClick} key={restriction}>
                    {restriction}
                </Button>
            })}
        </TwoColumnButtons>
    </OnboardingScreen>
}