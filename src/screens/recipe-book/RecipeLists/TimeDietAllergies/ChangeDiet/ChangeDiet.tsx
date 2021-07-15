import { useState } from "react";
import { JBButton } from "../../../../../inputs/Button/JBButton";
import { RecipePreferences } from "../../../../../types/RecipePreferences";
import { DietInput } from "../../../../onboarding/Diet/Diet";
import { ChangeModal } from "../ChangeModal/ChangeModal";

export type ChangeDietProps = {
    initialDiet: RecipePreferences['diet']
    onSubmit: (newDiet: RecipePreferences['diet']) => void,
    onCancel: () => void
}

export function ChangeDiet(props: ChangeDietProps) {

    const [selectedDiet, setSelectedDiet] = useState<RecipePreferences['diet']>(props.initialDiet)
    
    const onCancelClick = () => {
        props.onCancel()
    }

    const onDoneClick = () => {
        props.onSubmit(selectedDiet)
    }

    const buttonStyle: React.CSSProperties = {
        margin: '10px',
        width: '133px'
    }

    return <ChangeModal
        title="Which diet do you follow?"
        onCancel={onCancelClick}
        onDone={onDoneClick}
    >
        <DietInput
            renderButton={diet => 
                <JBButton
                    variant="outline"
                    active={selectedDiet === diet}
                    onClick={() => setSelectedDiet(diet)}
                    style={buttonStyle}
                >
                    {diet}
                </JBButton>
            }
            renderNoPreference={() =>
                <JBButton
                    variant="outline"
                    active={selectedDiet === null}
                    onClick={() => setSelectedDiet(null)}
                    style={buttonStyle}
                    key="No Preference"
                >
                    No Preference
                </JBButton>
            }
        />
    </ChangeModal>
}