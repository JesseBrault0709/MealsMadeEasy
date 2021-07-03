import 'react-calendar/dist/Calendar.css'
import './AddToMealPlan.css'

import { JBButton } from '../../inputs/Button/Button'
import Calendar from 'react-calendar'
import { useState } from 'react'
import { SelectMealType } from './SelectMealType/SelectMealType'

/**
 * @param {{
 *  onSubmit: (meal: string, order: number, date: Date) => void
 * }} props 
 * @returns 
 */
export function AddToMealPlan(props) {

    const [selectedMeal, setSelectedMeal] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const meals = ['Breakfast', 'Lunch', 'Dinner']

    return <div className="add-to-meal-plan">

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
                props.onSubmit(selectedMeal, meals.findIndex(meal => meal === selectedMeal), selectedDate)
            }}>Confirm</JBButton>
        </div>

    </div>
}