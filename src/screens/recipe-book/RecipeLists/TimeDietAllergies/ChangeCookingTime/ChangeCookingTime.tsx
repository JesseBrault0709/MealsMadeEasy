import { useState } from "react";
import { RecipePreferences } from "../../../../../types/RecipePreferences";
import { ChangeModal } from '../ChangeModal/ChangeModal';
import { CookingTimeInput } from '../../../../onboarding/CookingTime/CookingTime';

export type ChangeCookingTimeProps = {
    initialCookingTime: RecipePreferences['cookingTime'],
    onSubmit: (newCookingTime: RecipePreferences['cookingTime']) => void,
    onCancel: () => void
}

export function ChangeCookingTime(props: ChangeCookingTimeProps) {

    const [cookingTime, setCookingTime] = useState<RecipePreferences['cookingTime']>(props.initialCookingTime)

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
        <CookingTimeInput
            value={cookingTime}
            onChange={newCookingTime => setCookingTime(newCookingTime)}
        />
    </ChangeModal>
}