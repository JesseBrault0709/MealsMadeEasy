/**
 * TODO as of 6/28/21:
 *  * Instructions can either be a single string
 *      or an array of strings; in the latter case,
 *      render with bullet points.
 */
import './InstructionsTab.css'

import { JBButton } from "../../../../inputs/Button/Button"

/**
 * @param {{
 *  instructions: string,
 *  onAddToMealPlan: () => void
 * }} props 
 */
export function InstructionsTab(props) {
    return <div className="instructions-tab">

        <h3>Method</h3>
  
        <p>{props.instructions}</p>

        <div className="add-to-planner-button">
            <JBButton variant="primary" onClick={props.onAddToMealPlan}>Add to Meal Plan</JBButton>
        </div>

    </div>
}