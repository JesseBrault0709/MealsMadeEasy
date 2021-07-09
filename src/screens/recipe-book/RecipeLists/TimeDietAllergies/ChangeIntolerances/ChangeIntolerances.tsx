import { Reducer, useReducer } from "react"
import { SPIntolerance } from "../../../../../client/spoonacularTypes"
import { JBButton } from "../../../../../inputs/Button/JBButton"
import { IntolerancesInput } from "../../../../onboarding/Restrictions/Restrictions"
import { ChangeModal } from "../ChangeModal/ChangeModal"

export type ChangeIntolerancesProps = {
    onSubmit: (newIntolerances: ReadonlyArray<SPIntolerance>) => void,
    onCancel: () => void
}

export function ChangeIntolerances(props: ChangeIntolerancesProps) {

    const intolerancesReducer: Reducer<
        ReadonlyArray<SPIntolerance>,
        {
            type: 'add' | 'remove'
            intolerance: SPIntolerance
        }
    > = (state, action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.intolerance]
            case 'remove':
                return state.filter(intolerance => intolerance !== action.intolerance)
            default:
                throw new Error('unknown action type')
        }
    }

    const [activeIntolerances, dispatch] = useReducer(intolerancesReducer, [])

    const renderButton = (intolerance: SPIntolerance) => 
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
            renderButton={renderButton}
        />
    </ChangeModal>
}