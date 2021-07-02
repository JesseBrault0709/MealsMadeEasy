/**
 * TODO as of 6/28/21:
 *  * Make checkmark circle functional even though
 *      the add to grocery list functionality is
 *      not until MVP 2
 */

import './IngredientsTab.css'

// import CheckCircle from './assets/CheckCircle.png'
import { ExtendedIngredient } from "../../../../client/FullRecipe"
import { JBButton } from '../../../../inputs/Button/Button'

/**
 * @param {{
 *  ingredients: ReadonlyArray<ExtendedIngredient>,
 *  onAddToMealPlan: () => void
 * }} props 
 */
export function IngredientsTab(props) {
    return <div className="ingredients-tab">
        <h3 className="what-you-need">What you need</h3>

        {
            props.ingredients.map(ingredient => 
                <div className="ingredient" key={ingredient.original}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                    {/* <img src={CheckCircle} alt="Empty Checkmark Circle"/> */}
                </div>    
            )
        }

        <JBButton variant="disabled">Add to Grocery List</JBButton>

        <JBButton variant="primary" onClick={props.onAddToMealPlan}>Add to Meal Plan</JBButton>


    </div>
}