import { useState } from "react";
import { SPDiet } from "../../../../../client/spoonacularTypes";
import { JBButton } from "../../../../../inputs/Button/JBButton";
import { RecipePreferences } from "../../../../../types/RecipePreferences";
import { DietInput } from "../../../../onboarding/Diet/Diet";
import { ChangeModal } from "../ChangeModal/ChangeModal";

export type ChangeDietProps = {
    onSubmit: (newDiet: RecipePreferences['diet']) => void,
    onCancel: () => void
}

export function ChangeDiet(props: ChangeDietProps) {

    const [selectedDiet, setSelectedDiet] = useState<RecipePreferences['diet']>()

    const getDietButton = (diet: SPDiet) => <JBButton
        variant="outline"
        active={selectedDiet === diet}
        onClick={() => setSelectedDiet(diet)}
        style={{ margin: '10px', width: '108px' }}
    >
        {diet}
    </JBButton>
    
    const onCancelClick = () => {
        props.onCancel()
    }

    const onDoneClick = () => {
        props.onSubmit(selectedDiet)
    }

    return <ChangeModal
        title="Which diet do you follow?"
        onCancel={onCancelClick}
        onDone={onDoneClick}
    >
        <DietInput
            renderButton={getDietButton}
        />
    </ChangeModal>
}