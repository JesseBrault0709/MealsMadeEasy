/**
 * TODO as of 6/28/21:
 *  * Instructions can either be a single string
 *      or an array of strings; in the latter case,
 *      render with bullet points.
 */
import { FullRecipe } from '../../../../client/FullRecipe'
import './InstructionsTab.css'

export type InstructionsTabProps = {
    recipe: FullRecipe,
    getAddToMealPlanButton: () => React.ReactNode
}

export function InstructionsTab(props: InstructionsTabProps) {
    return <div className="instructions-tab">

        <h3>Method</h3>
  
        <div className="instructions-steps">
            {
                props.recipe.analyzedInstructions[0].steps.map((step, index) => <p key={index} className="instructions-step">{step.step}</p>)
            }
        </div>

        <div className="add-to-planner-button">
            {props.getAddToMealPlanButton()}
        </div>

    </div>
}