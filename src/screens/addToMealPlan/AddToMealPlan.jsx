import 'react-calendar/dist/Calendar.css'

import { Container, Row, Col, Button } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { useState } from 'react'
import { SelectMealType } from './SelectMealType/SelectMealType'

/**
 * @param {{
 *  onSubmit: (meal: string, date: Date) => void
 * }} props 
 * @returns 
 */
export function AddToMealPlan(props) {

    const [selectedMeal, setSelectedMeal] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const meals = ['Breakfast', 'Lunch', 'Dinner']

    return <Container>
        <Row>
            <Col>
                <h2>Add to Meal Plan</h2>
            </Col>
        </Row>

        <SelectMealType meals={meals} onMealSelect={setSelectedMeal} activeMeal={selectedMeal} />

        <Row>
            <Col>
                <h3>Select Date/Day</h3>
            </Col>
        </Row>

        <Row>
            <Col>
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
            </Col>
        </Row>

        <Row>
            <Col>
                <Button>Cancel</Button>
            </Col>
            <Col>
                <Button onClick={() => {
                    props.onSubmit(selectedMeal, selectedDate)
                }}>Confirm</Button>
            </Col>
        </Row>

    </Container>
}