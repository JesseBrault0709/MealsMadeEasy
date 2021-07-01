/**
 * TODO as of 6/28/21: 
 *  * Update documentation to include JSDoc types
 */

import { useState } from "react";
import { SPDiet, SPIntolerance } from "../../client/spoonacularTypes";
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
    const [intoleranceMap, setIntoleranceMap] = useState<Map<string, boolean>>(props.allIntolerances.reduce(
        (result: Map<string, boolean>, intolerance: string) => {
            result.set(intolerance, false)
            return result
        }, new Map()
    ))

    const onLastNext = () => {
        if (props.onSubmit !== undefined) {

            const selectedIntolerances: SPIntolerance[] = []

            intoleranceMap.forEach((isSelected, intolerance) => {
                if (isSelected) {
                    selectedIntolerances.push(intolerance as SPIntolerance)
                }
            })

            props.onSubmit({
                cookingTime, diet,
                intolerances: selectedIntolerances
            })
        }
    }

    const onIntoleranceClick = (targetIntolerance: string) => {

        const newIntoleranceMap = new Map<string, boolean>()

        intoleranceMap.forEach((isSelected, intolerance) => {
            if (targetIntolerance === intolerance) {
                newIntoleranceMap.set(targetIntolerance, !isSelected) // opposite
            } else {
                newIntoleranceMap.set(intolerance, isSelected)
            }
        })

        setIntoleranceMap(newIntoleranceMap)
        
    }

    return <OrderedScreenCollection onLastNext={onLastNext}>

        <CookingTime
            cookingTimes={props.allCookingTimes}
            onChange={setCookingTime}
        />

        <Diet diets={props.allDiets} onClick={diet => setDiet(diet as SPDiet)} />

        <Restrictions restrictions={intoleranceMap} onClick={onIntoleranceClick}/>

    </OrderedScreenCollection>
}