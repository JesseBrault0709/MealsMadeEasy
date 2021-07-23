// import './ReplaceModal.css'

import { useEffect } from 'react'
import { getModalEffect } from '../../../../util'
import { CenterModal } from '../../../common/CenterModal/CenterModal'
import ReactDOM from 'react-dom'
import { JBButton } from '../../../../inputs/Button/JBButton'
import { MealName } from '../../../../types/MealName'
import { useFullRecipe } from '../../../../slices/fullRecipes'
import { LoadingCircle } from '../../../common/LoadingCircle/LoadingCircle'

export type ReplaceRecipeModalProps = {
    targetDate: Date
    targetMeal: MealName

    oldRecipeId: number
    newRecipeTitle: string

    onSubmit: () => void
    onCancel: () => void
}

export function ReplaceRecipeModal(props: ReplaceRecipeModalProps) {
    const { recipe: oldRecipe, fetchStatus, fetchError } = useFullRecipe(
        props.oldRecipeId
    )

    const modalEffect = getModalEffect()

    useEffect(() => modalEffect(), [modalEffect])

    // Different content based on fetchStatus

    const getFetching = () => <LoadingCircle />

    const getIdle = () => {
        if (oldRecipe === undefined) {
            return null
        }

        const buttonStyle: React.CSSProperties = {
            marginLeft: '5px',
            marginRight: '5px'
        }

        return (
            <>
                <h3>Replace</h3>

                <p>
                    Do you wish to replace '{oldRecipe.title}' on{' '}
                    {props.targetDate.getMonth()}/{props.targetDate.getDate()} —{' '}
                    {props.targetMeal} with '{props.newRecipeTitle}'?
                </p>

                <div className="replace-recipe-modal-buttons">
                    <JBButton
                        variant="disabled"
                        onClick={props.onCancel}
                        style={buttonStyle}
                    >
                        Cancel
                    </JBButton>
                    <JBButton
                        variant="primary"
                        onClick={props.onSubmit}
                        style={buttonStyle}
                    >
                        Proceed
                    </JBButton>
                </div>
            </>
        )
    }

    const getError = () => {
        if (fetchError === undefined) {
            throw new Error('trying to getError but fetchError is undefined')
        }

        return `Error: ${fetchError.message}`
    }

    // Main getModalContent function

    const getModalContent = () => {
        switch (fetchStatus) {
            case 'idle':
                return getIdle()
            case 'fetching':
                return getFetching()
            case 'error':
                return getError()
        }
    }

    return ReactDOM.createPortal(
        <CenterModal>
            <div className="replace-recipe-modal">{getModalContent()}</div>
        </CenterModal>,
        document.getElementById('modal-root') as Element
    )
}
