/**
 * TODO as of 6/28/21: 
 *  * Update documentation to include JSDoc types
 *  * Clean up and prune unused code/comments
 */

import { useState } from "react";
import { RecipePreferences } from "../../types/RecipePreferences";

import { OrderedScreenCollection } from "../OrderedScreenCollection";
import { CookingTime } from "./CookingTime";
import { Diet } from "./Diet";
import { Restrictions } from "./Restrictions";

export type OnboardingProps = {
    allCookingTimes: ReadonlyArray<RecipePreferences['cookingTime']>,
    allDiets: ReadonlyArray<RecipePreferences['diet']>,
    allIntolerances: RecipePreferences['intolerances'],

    initialPreferences?: RecipePreferences,

    onSubmit: (preferences: RecipePreferences) => void
}

export function Onboarding(props: OnboardingProps) {

    // new cookingTime state

    const [cookingTime, setCookingTime] = useState<RecipePreferences['cookingTime']>("No Limit")
    const [diet, setDiet] = useState<RecipePreferences['diet']>()
    const [intolerances, setIntolerances] = useState<RecipePreferences['intolerances']>([])

    // function onRestrictionClick(clickedRestriction, preClickValue) {
    //     setRestrictions(restrictions.map(restrictionAndValue => {
    //         const [restriction, value] = restrictionAndValue
    //         if (restriction === clickedRestriction) {
    //             return [clickedRestriction, !preClickValue]
    //         } else {
    //             return [restriction, value]
    //         }
    //     }))
    // }



    // function onLastNext() { // i.e., submit for the whole set
    //     if (props.onSubmit !== undefined && props.onSubmit !== null) {
    //         props.onSubmit(
    //             props.allCookingTimes[currentCookingTimeIndex],
    //             props.allDiets[dietIndex],
    //             restrictions.reduce((resultArr, restrictionAndValue) => {
    //                 const [restriction, value] = restrictionAndValue
    //                 if (value) {
    //                     resultArr.push(restriction)
    //                 }
    //                 return resultArr
    //             }, [])
    //         )
    //     }
    // }

    const onLastNext = () => {
        props.onSubmit({
            cookingTime, diet, intolerances
        })
    }

    return <OrderedScreenCollection onLastNext={onLastNext}>

        <CookingTime
            cookingTimes={props.allCookingTimes}
            onChange={setCookingTime}
        />

        <Diet diets={props.allDiets} onClick={setDiet} />

        <Restrictions restrictions={props.allIntolerances} onClick={setIntolerances}/>

    </OrderedScreenCollection>
}