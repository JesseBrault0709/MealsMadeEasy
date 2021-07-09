import './TimeDietAllergies.css'

import Check from './assets/Check.png'
import X from './assets/X.png'
import Funnel from './assets/Funnel.png'

import { Chip } from '../../../common/Chip/Chip'
import { RecipePreferences } from '../../../../types/RecipePreferences'
import { useState } from 'react'
import { ChangeCookingTime } from './ChangeCookingTime/ChangeCookingTime'
import { useAppDispatch } from '../../../../hooks'
import { setCookingTime, setDiet, setIntolerances } from '../../../../slices/recipePreferences'
import { ChangeDiet } from './ChangeDiet/ChangeDiet'
import { ChangeIntolerances } from './ChangeIntolerances/ChangeIntolerances'

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


    const [showChangeDiet, setShowChangeDiet] = useState(false)

    const onChangeDietSubmit = (newDiet: RecipePreferences['diet']) => {
        dispatch(setDiet({ diet: newDiet }))
        setShowChangeDiet(false)
    }

    const onChangeDietCancel = () => {
        setShowChangeDiet(false)
    }

    
    const [showChangeIntolerances, setShowChangeIntolerances] = useState(false)

    const onChangeIntolerancesSubmit = (newIntolerances: RecipePreferences['intolerances']) => {
        dispatch(setIntolerances({ intolerances: newIntolerances }))
        setShowChangeIntolerances(false)
    }

    const onChangeIntolerancesCancel = () => {
        setShowChangeIntolerances(false)
    }


    return <div className="time-diet-allergies">
        <img className="funnel" src={Funnel} alt=""/>
        {
            props.cookingTime !== undefined ?
                <Chip 
                    avatar={<img src={Check} alt=""/>} 
                    label={props.cookingTime === "No Limit" ? props.cookingTime : `${props.cookingTime} mins`} 
                    type="strong"
                    onClick={() => setShowChangeCookingTime(true)}
                /> :
                <Chip 
                    avatar={<img src={X} alt=""/>} 
                    label="Time"
                    type="no-value"
                    onClick={() => setShowChangeCookingTime(true)}
                />
        }

        {
            props.diet !== undefined ?
                <Chip 
                    avatar={<img src={Check} alt=""/>} 
                    label={props.diet} 
                    type="strong"
                    onClick={() => setShowChangeDiet(true)}
                /> :
                <Chip
                    avatar={<img src={X} alt=""/>}
                    label="Diet"
                    type="no-value"
                    onClick={() => setShowChangeDiet(true)}
                />
        }

        {
            props.intolerances === undefined || props.intolerances.length === 0 ?
            <Chip
                avatar={<img src={X} alt=""/>}
                label="Allergies"
                type="no-value"
                onClick={() => setShowChangeIntolerances(true)}
            /> :
            <Chip
                avatar={props.intolerances.length}
                label="Allergies"
                type="strong"
                onClick={() => setShowChangeIntolerances(true)}
            />
        }

        {
            showChangeCookingTime ?
                <ChangeCookingTime 
                    onSubmit={onChangeCookingTimeSubmit}
                    onCancel={onChangeCookingTimeCancel}
                /> : ''
        }

        {
            showChangeDiet ?
                <ChangeDiet 
                    onCancel={onChangeDietCancel}
                    onSubmit={onChangeDietSubmit}
                /> : ''
        }

        {
            showChangeIntolerances ?
                <ChangeIntolerances 
                    onCancel={onChangeIntolerancesCancel}
                    onSubmit={onChangeIntolerancesSubmit}
                /> : ''
        }
    </div>
}