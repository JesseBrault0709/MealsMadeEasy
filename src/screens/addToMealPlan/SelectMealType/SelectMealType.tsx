import './SelectMealType.css'
import { JBButton } from "../../../inputs/Button/Button"
import { MealName } from '../../../types/MealName'

export type SelectMealTypeProps = {
    meals: ReadonlyArray<MealName>
    onMealSelect: (meal: MealName) => void,
    activeMeal?: MealName
}

export function SelectMealType(props: SelectMealTypeProps) {
    
    const getOnClick = (meal: MealName) => () => {
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