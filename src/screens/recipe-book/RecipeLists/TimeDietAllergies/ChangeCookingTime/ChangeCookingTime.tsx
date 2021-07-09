import './ChangeCookingTime.css'

import { useState } from "react";
import { appConfig } from "../../../../../appConfig";
import { ClockSlider } from "../../../../../inputs/ClockSlider/ClockSlider";
import { RecipePreferences } from "../../../../../types/RecipePreferences";
import { ChangeModal } from '../ChangeModal/ChangeModal';

export type ChangeCookingTimeProps = {
    onSubmit: (newCookingTime: RecipePreferences['cookingTime']) => void
    onCancel: () => void
}

export function ChangeCookingTime(props: ChangeCookingTimeProps) {

    const [cookingTime, setCookingTime] = useState<RecipePreferences['cookingTime']>()

    const options = appConfig.availableCookingTimes.map(cookingTime => {
        if (typeof(cookingTime) === 'number') {
            return `${cookingTime} mins`
        } else {
            return cookingTime
        }
    })

    const onChange = (newValue: string) => {
        if (newValue === "No Limit") {
            setCookingTime(newValue)
        } else {
            const numberString: string = newValue.slice(0, -5)
            const newNumberValue: number = parseInt(numberString)
            setCookingTime(newNumberValue)
        }
    }

    const onCancelClick = () => {
        props.onCancel()
    }

    const onDoneClick = () => {
        props.onSubmit(cookingTime)
    }

    return <ChangeModal 
        title="How much time do you have?"
        onDone={onDoneClick}
        onCancel={onCancelClick}
    >
        <ClockSlider 
            options={options}
            onChange={onChange}
        />
    </ChangeModal>
}