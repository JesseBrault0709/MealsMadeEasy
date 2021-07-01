/**
 * TODO as of 6/28/21:
 *  * Nested function should be of form const func = lambda
 */

import { OnboardingScreen } from "./OnboardingScreen"
import { TwoColumnButtons } from "../../inputs/TwoColumnButtons/TwoColumnButtons"
import { Button } from "react-bootstrap"

/**
 * The page for the user to select any dietary restrictions
 * (elsewhere referred to as 'intolerances' or 'allergies').
 * 
 * @param {{
 *  restrictions: ReadonlyArray<[string, boolean]>,
 *  onClick?: (restriction: string, oldValue: boolean) => void
 * }} props
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