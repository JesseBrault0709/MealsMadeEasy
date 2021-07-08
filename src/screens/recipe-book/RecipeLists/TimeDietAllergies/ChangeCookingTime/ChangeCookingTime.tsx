import './ChangeCookingTime.css'

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { appConfig } from "../../../../../appConfig";
import { JBButton } from "../../../../../inputs/Button/JBButton";
import { ClockSlider } from "../../../../../inputs/ClockSlider/ClockSlider";
import { RecipePreferences } from "../../../../../types/RecipePreferences";
import { getModalEffect } from "../../../../../util";
import { BottomModal } from "../../../../common/BottomModal/BottomModal";

export type ChangeCookingTimeProps = {
    onSubmit: (newCookingTime: RecipePreferences['cookingTime']) => void
    onCancel: () => void
}

export function ChangeCookingTime(props: ChangeCookingTimeProps) {

    useEffect(getModalEffect()) // eslint-disable-line react-hooks/exhaustive-deps

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

    return ReactDOM.createPortal(<BottomModal>
        <div className="change-cooking-time">
            <h3>How much time do you have?</h3>
            <ClockSlider 
                options={options}
                onChange={onChange}
            />
            <div className="change-cooking-time-buttons">
                <JBButton variant="outline" style={{ width: '25%', margin: '20px 5px' }} onClick={onCancelClick}>
                    Cancel
                </JBButton>
                <JBButton variant="primary" style={{ width: '25%', margin: '20px 5px' }} onClick={onDoneClick}>
                    Done
                </JBButton>
            </div>
        </div>
    </BottomModal>, document.getElementById('modal-root') as Element)
}