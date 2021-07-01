/**
 * TODO as of 6/28/21: 
 *  * Update documentation to include JSDoc types
 *  * Clean up and prune unused code/comments
 */

import { useState } from "react";
import { SPDiet } from "../../client/spoonacularTypes";
import { RecipePreferences } from "../../types/RecipePreferences";

import { OrderedScreenCollection } from "../OrderedScreenCollection";
import { CookingTime } from "./CookingTime";
import { Diet } from "./Diet";
import { Restrictions } from "./Restrictions";

export type OnboardingProps = {

    /** The available cookingTimes for the user to choose from */
    allCookingTimes: ReadonlyArray<RecipePreferences['cookingTime']>,

    /** The available diets for the user to choose from */
    allDiets: ReadonlyArray<SPDiet>,

    /** The available intolerances for the user to choose from */
    allIntolerances: RecipePreferences['intolerances'],

    /** Any initially selected preferences */
    initialPreferences?: RecipePreferences,

    /** A callback for when the user submits their preferences */
    onSubmit?: (preferences: RecipePreferences) => void

}

/**
 * The main Onboarding component. This component contains each of the three
 * Onboarding pages and switches between them based on user input.
 */
export function Onboarding(props: OnboardingProps) {

    const [cookingTime, setCookingTime] = useState<RecipePreferences['cookingTime']>("No Limit")
    const [diet, setDiet] = useState<RecipePreferences['diet']>()
    const [intolerances, setIntolerances] = useState<RecipePreferences['intolerances']>([])

    const onLastNext = () => {
        if (props.onSubmit !== undefined) {
            props.onSubmit({
                cookingTime, diet, intolerances
            })
        }
    }

    return <OrderedScreenCollection onLastNext={onLastNext}>

        <CookingTime
            cookingTimes={props.allCookingTimes}
            onChange={setCookingTime}
        />

        <Diet diets={props.allDiets} onClick={diet => setDiet(diet as SPDiet)} />

        {/* TODO: Fix the logic of this! */}
        <Restrictions restrictions={props.allIntolerances as any} onClick={setIntolerances as any}/>

    </OrderedScreenCollection>
}