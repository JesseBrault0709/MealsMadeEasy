import './SelectMealType.css'
import { JBButton } from "../../../inputs/Button/Button"

/**
 * @param {{
 *  meals: ReadonlyArray<string>,
 *  onMealSelect: (meal: string) => void,
 *  activeMeal?: string
 * }} props 
 */
export function SelectMealType(props) {
    
    const getOnClick = meal => () => {
        props.onMealSelect(meal)
    }

    return <div className="select-meal-type">

        <h3>Select Meal Type</h3>

        <div className="select-meal-type-buttons">
            {
                props.meals.map((meal, index) => 
                    <JBButton 
                        key={`${meal}_${index}`} 
                        onClick={getOnClick(meal)} 
                        active={meal === props.activeMeal}
                        variant="outline"
                    >{meal}</JBButton>
                )
            }
        </div>
    </div> 
}