import 'react-calendar/dist/Calendar.css'
import './AddToMealPlan.css'

import { JBButton } from '../../inputs/Button/Button'
import Calendar from 'react-calendar'
import { useEffect, useState } from 'react'
import { SelectMealType } from './SelectMealType/SelectMealType'
import { MealName } from '../../types/MealName'
import ReactDOM from 'react-dom'
import { BottomModal } from '../common/BottomModal/BottomModal'
import { getModalEffect } from '../../util'

export type AddToMealPlanProps = {
    onSubmit: (meal: MealName, date: Date) => void
}

export function AddToMealPlan(props: AddToMealPlanProps) {

    const [selectedMeal, setSelectedMeal] = useState<MealName>()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const meals: MealName[] = ['Breakfast', 'Lunch', 'Dinner']

    useEffect(getModalEffect())
    
    return ReactDOM.createPortal(
        <BottomModal>
            <div className="add-to-meal-plan">

                <h2>Add to Meal Plan</h2>

                <SelectMealType meals={meals} onMealSelect={setSelectedMeal} activeMeal={selectedMeal} />

                <div className="select-date">
                    <h3>Select Date/Day</h3>

                    <Calendar 

                        value={selectedDate}

                        calendarType="US"

                        minDate={new Date(2021, 5, 29)}
                        maxDate={new Date(2021, 6, 6)}

                        nextLabel={null}
                        next2Label={null}

                        prevLabel={null}
                        prev2Label={null}

                        minDetail="month"

                        onChange={value => {
                            console.log(value)
                            setSelectedDate(value)
                        }}

                    />

                </div>

                <div className="add-to-meal-plan-buttons">
                    <JBButton variant="outline">Cancel</JBButton>

                    <JBButton variant="primary" onClick={() => {
                        if (selectedMeal !== undefined) {
                            props.onSubmit(selectedMeal, selectedDate) 
                        } else {
                            // TODO
                        }
                    }}>Confirm</JBButton>
                </div>
                
            </div>
        </BottomModal>, document.getElementById('modal-root') as Element)
}