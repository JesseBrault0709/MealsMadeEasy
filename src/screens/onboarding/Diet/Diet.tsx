import './Diet.css'

import { OnboardingScreen } from "../OnboardingScreen/OnboardingScreen"
import { JBButton } from "../../../inputs/Button/JBButton"
import { SPDiet } from "../../../client/spoonacularTypes"
import { useState } from "react"
import { groupIntoPairs } from "../../../util"

export type DietProps = {
    diets: ReadonlyArray<SPDiet>,
    onDietSelect?: (diet: SPDiet) => void
}

/**
 * The page for the user to select their diet.
 */
export function Diet(props: DietProps) {

    const [selectedDiet, setSelectedDiet] = useState<SPDiet>()
    
    const getOnClick = (diet: SPDiet) => () => {
        if (diet === selectedDiet) {
            setSelectedDiet(undefined)
        } else {
            setSelectedDiet(diet)
        }

        if (props.onDietSelect !== undefined) {
            props.onDietSelect(diet)
        }
    }

    const getButton = (diet: SPDiet) => <JBButton
        key={diet}
        variant="circle-large"
        active={diet === selectedDiet}
        onClick={getOnClick(diet)}
        style={{
            margin: '10px'
        }}
    >
        {diet}
    </JBButton>

    return <OnboardingScreen
        prompt="What diet do you follow?"
        instruction="Select your preference."
    >
        <div className="diet-buttons">
            {
                groupIntoPairs(props.diets).map((pair, index) => {
                    const [d1, d2] = pair

                    return <div className="diet-button-pair" key={index}>
                        {getButton(d1)}
                        {getButton(d2)}
                    </div>
                })
            }
        </div>
    </OnboardingScreen>
}