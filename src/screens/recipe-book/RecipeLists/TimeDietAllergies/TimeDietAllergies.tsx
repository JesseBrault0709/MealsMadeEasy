import Check from './assets/Check.png'
import X from './assets/X.png'
import Funnel from './assets/Funnel.png'

import { Chip } from '../../../common/Chip/Chip'
import { RecipePreferences } from '../../../../types/RecipePreferences'
import { useState } from 'react'
import { ChangeCookingTime } from './ChangeCookingTime/ChangeCookingTime'
import { useAppDispatch, useAppSelector } from '../../../../index'
import {
    setCookingTime,
    setDiet,
    setIntolerances
} from '../../../../slices/recipePreferences'
import { ChangeDiet } from './ChangeDiet/ChangeDiet'
import { ChangeIntolerances } from './ChangeIntolerances/ChangeIntolerances'

export type TimeDietAllergiesProps = {
    onChange: () => void
}

export function TimeDietAllergies(props: TimeDietAllergiesProps) {
    const dispatch = useAppDispatch()

    const { cookingTime, diet, intolerances } = useAppSelector(
        state => state.recipePreferences.preferences
    )

    const [showChangeCookingTime, setShowChangeCookingTime] = useState<boolean>(
        false
    )

    const onChangeCookingTimeSubmit = (
        newCookingTime: RecipePreferences['cookingTime']
    ) => {
        dispatch(setCookingTime({ cookingTime: newCookingTime }))
        setShowChangeCookingTime(false)
        props.onChange()
    }

    const onChangeCookingTimeCancel = () => {
        setShowChangeCookingTime(false)
    }

    const [showChangeDiet, setShowChangeDiet] = useState(false)

    const onChangeDietSubmit = (newDiet: RecipePreferences['diet']) => {
        dispatch(setDiet({ diet: newDiet }))
        setShowChangeDiet(false)
        props.onChange()
    }

    const onChangeDietCancel = () => {
        setShowChangeDiet(false)
    }

    const [showChangeIntolerances, setShowChangeIntolerances] = useState(false)

    const onChangeIntolerancesSubmit = (
        newIntolerances: RecipePreferences['intolerances']
    ) => {
        dispatch(setIntolerances({ intolerances: newIntolerances }))
        setShowChangeIntolerances(false)
        props.onChange()
    }

    const onChangeIntolerancesCancel = () => {
        setShowChangeIntolerances(false)
    }

    const renderEmptyChip = (label: string, onClick: () => void) => (
        <Chip
            avatar={<img src={X} alt="" />}
            label={label}
            type="no-value"
            onClick={onClick}
        />
    )

    return (
        <div className="time-diet-allergies">
            <img className="funnel" src={Funnel} alt="" />
            {cookingTime !== null ? (
                <Chip
                    avatar={<img src={Check} alt="" />}
                    label={
                        cookingTime === 'No Limit'
                            ? cookingTime
                            : `${cookingTime} mins`
                    }
                    type="strong"
                    onClick={() => setShowChangeCookingTime(true)}
                />
            ) : (
                renderEmptyChip('Time', () => setShowChangeCookingTime(true))
            )}

            {diet !== null ? (
                <Chip
                    avatar={<img src={Check} alt="" />}
                    label={diet}
                    type="strong"
                    onClick={() => setShowChangeDiet(true)}
                />
            ) : (
                renderEmptyChip('Diet', () => setShowChangeDiet(true))
            )}

            {intolerances === null || intolerances.length === 0 ? (
                renderEmptyChip('Allergies', () =>
                    setShowChangeIntolerances(true)
                )
            ) : (
                <Chip
                    avatar={intolerances.length}
                    label="Allergies"
                    type="strong"
                    onClick={() => setShowChangeIntolerances(true)}
                />
            )}

            {showChangeCookingTime ? (
                <ChangeCookingTime
                    initialCookingTime={cookingTime}
                    onSubmit={onChangeCookingTimeSubmit}
                    onCancel={onChangeCookingTimeCancel}
                />
            ) : (
                ''
            )}

            {showChangeDiet ? (
                <ChangeDiet
                    initialDiet={diet}
                    onCancel={onChangeDietCancel}
                    onSubmit={onChangeDietSubmit}
                />
            ) : (
                ''
            )}

            {showChangeIntolerances ? (
                <ChangeIntolerances
                    initialIntolerances={intolerances}
                    onCancel={onChangeIntolerancesCancel}
                    onSubmit={onChangeIntolerancesSubmit}
                />
            ) : (
                ''
            )}
        </div>
    )
}
