/**
 * TODO as of 6/28/21:
 *  * Make checkmark circle functional even though
 *      the add to grocery list functionality is
 *      not until MVP 2
 */

// import CheckCircle from './assets/CheckCircle.png'
import { ExtendedIngredient } from '../../../../client/FullRecipe'
import { JBButton } from '../../../../inputs/Button/JBButton'

/**
 * @param {{
 *  ingredients: ReadonlyArray<ExtendedIngredient>,
 *  onAddToMealPlan: () => void
 * }} props
 */

export type IngredientsTabProps = {
    ingredients: ReadonlyArray<ExtendedIngredient>
    getAddToMealPlanButton: () => React.ReactNode
}

export function IngredientsTab(props: IngredientsTabProps) {
    return (
        <div className="ingredients-tab">
            <h3 className="what-you-need">What you need</h3>

            {props.ingredients.map(ingredient => (
                <div className="ingredient" key={ingredient.original}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                    {/* <img src={CheckCircle} alt="Empty Checkmark Circle"/> */}
                </div>
            ))}

            <div className="ingredients-tab-buttons">
                <JBButton variant="disabled">Add to Grocery List</JBButton>
                {props.getAddToMealPlanButton()}
            </div>
        </div>
    )
}
