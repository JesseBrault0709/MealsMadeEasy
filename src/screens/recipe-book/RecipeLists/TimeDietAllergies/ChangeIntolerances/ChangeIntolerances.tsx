import { useReducer } from "react"
import { SPIntolerance } from "../../../../../client/spoonacularTypes"
import { JBButton } from "../../../../../inputs/Button/JBButton"
import { RecipePreferences } from "../../../../../types/RecipePreferences"
import { IntolerancesInput, intolerancesReducer } from "../../../../onboarding/Intolerances/Intolerances"
import { ChangeModal } from "../ChangeModal/ChangeModal"

export type ChangeIntolerancesProps = {
    initialIntolerances: RecipePreferences['intolerances'],
    onSubmit: (newIntolerances: ReadonlyArray<SPIntolerance>) => void,
    onCancel: () => void
}

export function ChangeIntolerances(props: ChangeIntolerancesProps) {

    const [activeIntolerances, dispatch] = useReducer(intolerancesReducer, props.initialIntolerances ?? [])
    
    const onDoneClick = () => {
        props.onSubmit(activeIntolerances)
    }

    const onCancelClick = () => {
        props.onCancel()
    }

    return <ChangeModal
        title="Which allergies do you have?"
        onDone={onDoneClick}
        onCancel={onCancelClick}
    >
        <IntolerancesInput 
            renderButton={intolerance => 
                <JBButton
                    variant="outline"
                    active={activeIntolerances.includes(intolerance)}
                    onClick={() => {
                        if (activeIntolerances.includes(intolerance)) {
                            dispatch({ type: 'remove', intolerance })
                        } else {
                            dispatch({ type: 'add', intolerance })
                        }
                    }}
                    style={{ width: '80px', margin: '10px' }}
                >
                    {intolerance}
                </JBButton>
            }
        />
    </ChangeModal>
}