/**
 * TODO as of 6/28/21:
 *  * Do styling, esp of the filter button.
 */

import './TimeDietAllergies.css'

import Check from './assets/Check.png'
import X from './assets/X.png'
import Funnel from './assets/Funnel.png'

import { Chip } from '../../../common/Chip/Chip'
import { RecipePreferences } from '../../../../types/RecipePreferences'
import { useState } from 'react'
import { ChangeCookingTime } from './ChangeCookingTime/ChangeCookingTime'
import { useAppDispatch } from '../../../../hooks'
import { setCookingTime } from '../../../../slices/recipePreferences'

export type TimeDietAllergiesProps = {
    cookingTime: RecipePreferences['cookingTime']
    diet: RecipePreferences['diet']
    intolerances: RecipePreferences['intolerances']
}

export function TimeDietAllergies(props: TimeDietAllergiesProps) {

    const dispatch = useAppDispatch()
    
    const [showChangeCookingTime, setShowChangeCookingTime] = useState<boolean>(false)

    const onChangeCookingTimeSubmit = (newCookingTime: RecipePreferences['cookingTime']) => {
        dispatch(setCookingTime({ cookingTime: newCookingTime }))
        setShowChangeCookingTime(false)
    }

    const onChangeCookingTimeCancel = () => {
        setShowChangeCookingTime(false)
    }

    return <div className="time-diet-allergies">
        <img className="funnel" src={Funnel} alt=""/>
        {
            props.cookingTime !== undefined ?
            <Chip 
                avatar={<img src={Check} alt=""/>} 
                label={props.cookingTime === "No Limit" ? props.cookingTime : `${props.cookingTime} mins`} 
                type="strong"
                onClick={() => {
                    setShowChangeCookingTime(true)
                    console.log('hello')
                }}
            /> :
            <Chip avatar={<img src={X} alt=""/>} label="Time" type="no-value" />
        }

        {
            props.diet !== undefined ?
            <Chip avatar={<img src={Check} alt=""/>} label={props.diet} type="strong" /> :
            <Chip avatar={<img src={X} alt=""/>} label="Diet" type="no-value" />
        }

        {
            props.intolerances === undefined || props.intolerances.length === 0 ?
            <Chip avatar={<img src={X} alt=""/>} label="Allergies" type="no-value" /> :
            <Chip avatar={props.intolerances.length} label="Allergies" type="strong" />
        }

        {
            showChangeCookingTime ?
                <ChangeCookingTime 
                    onSubmit={onChangeCookingTimeSubmit}
                    onCancel={onChangeCookingTimeCancel}
                /> : ''
        }
    </div>
}