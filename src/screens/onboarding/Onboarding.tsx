import { useReducer, useState } from "react";
import { JBButton } from "../../inputs/Button/JBButton";
import { RecipePreferences } from "../../types/RecipePreferences";
import { OrderedScreenCollection } from "../common/OrderedScreenCollection/OrderedScreenCollection";
import { CookingTimeInput } from "./CookingTime/CookingTime";
import { DietInput } from "./Diet/Diet";
import { IntolerancesInput, intolerancesReducer } from "./Intolerances/Intolerances";
import { OnboardingScreen } from "./OnboardingScreen/OnboardingScreen";

export type OnboardingProps = {
    /** A callback for when the user submits their preferences */
    onSubmit?: (preferences: RecipePreferences) => void
}

/**
 * The main Onboarding component. This component contains each of the three
 * Onboarding pages and switches between them based on user input.
 */
export function Onboarding(props: OnboardingProps) {

    const [cookingTime, setCookingTime] = useState<RecipePreferences['cookingTime']>(15)
    const [diet, setDiet] = useState<RecipePreferences['diet']>()
    const [intolerances, dispatchIntolerances] = useReducer(intolerancesReducer, [])


    const onLastNext = () => {
        if (props.onSubmit !== undefined) {
            props.onSubmit({
                cookingTime, diet, intolerances
            })
        }
    }

    return <OrderedScreenCollection onLastNext={onLastNext}>

        <OnboardingScreen
            prompt="How much time do you have?"
            instruction="Drag to let us know your ideal cooking time."
        >

            <CookingTimeInput 
                onChange={setCookingTime}
                value={cookingTime}
            />

        </OnboardingScreen>

        <OnboardingScreen
            prompt="What diet do you follow?"
            instruction="Select your preference."
        >
            <DietInput
                renderButton={dietOption => 
                    <JBButton
                        variant="circle-large"
                        active={dietOption === diet}
                        onClick={() => setDiet(dietOption)}
                        style={{ margin: '10px' }}
                        key={dietOption}
                    >
                        {dietOption}
                    </JBButton>
                }
            />
        </OnboardingScreen>

        <OnboardingScreen
            prompt="Do you have any allergies?"
            instruction="Select any allergies you may have."
        >

            <IntolerancesInput 
                renderButton={intolerance => 
                    <JBButton
                        variant="circle-large"
                        active={intolerances.includes(intolerance)}
                        style={{ margin: '10px' }}
                        onClick={() => {
                            if (intolerances.includes(intolerance)) {
                                dispatchIntolerances({
                                    type: 'remove',
                                    intolerance
                                })
                            } else {
                                dispatchIntolerances({
                                    type: 'add',
                                    intolerance
                                })
                            }
                        }}
                        key={intolerance}
                    >
                        {intolerance}
                    </JBButton>
                }
            />

        </OnboardingScreen>

    </OrderedScreenCollection>

}