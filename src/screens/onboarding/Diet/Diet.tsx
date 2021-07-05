import { OnboardingScreen } from "../OnboardingScreen/OnboardingScreen"
import { JBButton } from "../../../inputs/Button/JBButton"
import { SPDiet } from "../../../client/spoonacularTypes"
import { useState } from "react"
import { RowsOfPairs } from "../../common/RowsOfPairs/RowsOfPairs"

export type DietProps = {
    diets: ReadonlyArray<SPDiet>,
    onDietSelect?: (diet: SPDiet) => void
}

/**
 * The page for the user to select their diet.
 */
export function Diet(props: DietProps) {

    const [selectedDiet, setSelectedDiet] = useState<SPDiet>()
    
    return <OnboardingScreen
        prompt="What diet do you follow?"
        instruction="Tap on your preference."
    >

        <RowsOfPairs>
            {
                props.diets.map(diet => {

                    const onClick = () => {

                        if (diet === selectedDiet) {
                            setSelectedDiet(undefined)
                        } else {
                            setSelectedDiet(diet)
                        }

                        if (props.onDietSelect !== undefined) {
                            props.onDietSelect(diet)
                        }

                    }

                    return <JBButton 
                        variant="circle-large" 
                        onClick={onClick} 
                        active={selectedDiet === diet}
                        key={diet}
                    >{diet}</JBButton>
                })
            }

        </RowsOfPairs>

    </OnboardingScreen>
}