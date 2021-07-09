import './Diet.css'

import { OnboardingScreen } from "../OnboardingScreen/OnboardingScreen"
import { JBButton } from "../../../inputs/Button/JBButton"
import { SPDiet } from "../../../client/spoonacularTypes"
import React, { useContext, useState } from "react"
import { groupIntoPairs } from "../../../util"
import { AppConfigContext } from '../../../App'

export type DietInputProps = {
    renderButton: (diet: SPDiet) => React.ReactNode
}

export function DietInput(props: DietInputProps) {

    const appConfig = useContext(AppConfigContext)
    
    return <div className="diet-buttons">
        {
            groupIntoPairs(appConfig.availableDiets).map((pair, index) => {
                const [d1, d2] = pair

                return <div className="diet-button-pair" key={index}>
                    {props.renderButton(d1)}
                    {props.renderButton(d2)}
                </div>
            })
        }
    </div>
}

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
        <DietInput
            renderButton={getButton}
        />
    </OnboardingScreen>
}