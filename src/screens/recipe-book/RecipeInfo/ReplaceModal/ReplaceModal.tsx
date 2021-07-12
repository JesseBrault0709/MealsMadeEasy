import './ReplaceModal.css'

import { useEffect } from "react"
import { getModalEffect } from "../../../../util"
import { CenterModal } from "../../../common/CenterModal/CenterModal"
import ReactDOM from 'react-dom'
import { JBButton } from '../../../../inputs/Button/JBButton'
import { MealName } from '../../../../types/MealName'
import { RecipeOverview } from '../../../../client/RecipeOverview'

export type ReplaceRecipeModalProps = {
    targetDate: Date,
    targetMeal: MealName,

    oldRecipeTitle: string
    newRecipeTitle: string

    onSubmit: () => void,
    onCancel: () => void
}

export function ReplaceRecipeModal(props: ReplaceRecipeModalProps) {

    const modalEffect = getModalEffect()

    useEffect(() => modalEffect(), [modalEffect])

    const buttonStyle: React.CSSProperties = {
        marginLeft: '5px',
        marginRight: '5px'
    }

    return ReactDOM.createPortal(
        <CenterModal>
            <div className="replace-recipe-modal">

                <h3>Replace</h3>

                <p>
                    Do you wish to replace '{props.oldRecipeTitle}' on{' '}
                    {props.targetDate.getMonth()}/{props.targetDate.getDate()}{' '}
                    — {props.targetMeal} with '{props.newRecipeTitle}'?
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
            </div>
        </CenterModal>,
        document.getElementById('modal-root') as Element
    )

}