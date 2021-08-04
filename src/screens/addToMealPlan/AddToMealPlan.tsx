import { JBButton } from '../../inputs/Button/JBButton'
import Calendar from 'react-calendar'
import { useContext, useEffect, useState } from 'react'
import { SelectMealType } from './SelectMealType/SelectMealType'
import { MealName } from '../../types/MealName'
import ReactDOM from 'react-dom'
import { BottomModal } from '../common/BottomModal/BottomModal'
import { getModalEffect } from '../../util/util'
import { useAppSelector } from '../../index'
import { AppConfigContext } from '../../index'

export type AddToMealPlanProps = {
    onSubmit: (meal: MealName, date: Date) => void
    onCancel: () => void
}

export function AddToMealPlan(props: AddToMealPlanProps) {
    const appConfig = useContext(AppConfigContext)

    const meals = appConfig.meals

    const dayMealPlans = useAppSelector(state => state.dayMealPlans.plans)
    const sorted = dayMealPlans.slice().sort((a, b) => a.date - b.date)

    if (sorted.length === 0) {
        throw new Error('the dayMealPlans from the context has zero items')
    }

    const minDate = new Date(sorted[0].date)
    const maxDate = new Date(sorted[sorted.length - 1].date)

    const [selectedMeal, setSelectedMeal] = useState<MealName>()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const modalEffect = getModalEffect()

    useEffect(() => modalEffect(), [modalEffect])

    return ReactDOM.createPortal(
        <BottomModal>
            <div className="add-to-meal-plan">
                <h2>Add to Meal Plan</h2>

                <SelectMealType
                    meals={meals}
                    onMealSelect={setSelectedMeal}
                    activeMeal={selectedMeal}
                />

                <div className="select-date">
                    <h3>Select Date/Day</h3>

                    <Calendar
                        value={selectedDate}
                        calendarType="US"
                        minDate={minDate}
                        maxDate={maxDate}
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
                    <JBButton
                        variant="outline"
                        style={{ width: '40%' }}
                        onClick={props.onCancel}
                    >
                        Cancel
                    </JBButton>

                    <JBButton
                        variant="primary"
                        style={{ width: '40%' }}
                        onClick={() => {
                            if (selectedMeal !== undefined) {
                                props.onSubmit(selectedMeal, selectedDate)
                            } else {
                                // TODO
                            }
                        }}
                    >
                        Confirm
                    </JBButton>
                </div>
            </div>
        </BottomModal>,
        document.getElementById('modal-root') as Element
    )
}
