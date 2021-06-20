import { useState } from "react";

import { OrderedScreenCollection } from "../OrderedScreenCollection";
import { CookingTime } from "./CookingTime";
import { Diet } from "./Diet";
import { Restrictions } from "./Restrictions";

/**
 * The collection of onboarding screens. Will eventually have a prop
 * which is a callback which will take the selected values.
 * 
 * Props:
 *  * cookingTimes: string[]: an array of cooking time options
 *  * diets: string[]: an array of dietary options
 *  * restrictions: string[]: an array of dietary restrictions
 * 
 *  * onSubmit: (timeOption: string, diet: string, restrictions: string[]) => void, optional: a callback to be run when the user submits their options
 */
export function Onboarding(props) {

    // cookingTime state
    const [currentCookingTimeIndex, setCurrentCookingTimeIndex] = useState(0)

    function onCookingTimeChange(selectedIndex) {
        setCurrentCookingTimeIndex(selectedIndex)
    }

    // diet state
    const [dietsAndValues, setDietsAndValues] = useState(props.diets.map(diet => [diet, false]))

    function onDietClick(clickedDiet, preClickValue) {
        setDietsAndValues(dietsAndValues.map(dietAndValue => {
            const [diet, value] = dietAndValue
            if (diet === clickedDiet) {
                return [clickedDiet, !preClickValue]
            } else {
                return [diet, value]
            }
        }))
    }

    // restrictions state
    const [restrictions, setRestrictions] = useState(props.restrictions.map(restriction => {
        return [restriction, false]
    }))

    function onRestrictionClick(clickedRestriction, preClickValue) {
        setRestrictions(restrictions.map(restrictionAndValue => {
            const [restriction, value] = restrictionAndValue
            if (restriction === clickedRestriction) {
                return [clickedRestriction, !preClickValue]
            } else {
                return [restriction, value]
            }
        }))
    }



    function onLastNext() { // i.e., submit for the whole set
        if (props.onSubmit !== undefined && props.onSubmit !== null) {
            props.onSubmit(
                props.cookingTimes[currentCookingTimeIndex],
                dietsAndValues.reduce((resultArr, dietAndValue) => {
                    const [diet, value] = dietAndValue
                    if (value) {
                        resultArr.push(diet)
                    }
                    return resultArr
                }, []),
                restrictions.reduce((resultArr, restrictionAndValue) => {
                    const [restriction, value] = restrictionAndValue
                    if (value) {
                        resultArr.push(restriction)
                    }
                    return resultArr
                }, [])
            )
        }
    }


    return <OrderedScreenCollection onLastNext={onLastNext}>

        <CookingTime
            cookingTimes={props.cookingTimes}
            onChange={onCookingTimeChange}
            initialOption={currentCookingTimeIndex}
        />

        <Diet diets={dietsAndValues} onClick={onDietClick} />

        <Restrictions restrictions={restrictions} onClick={onRestrictionClick}/>

    </OrderedScreenCollection>
}