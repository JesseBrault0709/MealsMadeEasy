import { OnboardingScreen } from "./OnboardingScreen"
import { TwoColumnButtons } from "../inputs/TwoColumnButtons"
import { Button } from "react-bootstrap"

/**
 * Props:
 *  * restrictions: string[]
 *  * onClick: (restriction: string, oldValue: boolean) => void, optional: a callback for when a restriction button is clicked
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