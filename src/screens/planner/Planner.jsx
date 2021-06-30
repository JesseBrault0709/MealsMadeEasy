import { Container, Row, Col } from 'react-bootstrap'
import { RecipeOverview } from '../../client/RecipeOverview'
import { DayMealPlan } from '../../types/MealPlanTypes'

/**
 * @param {number} day
 * @returns {string}
 */
function getDayAbbrev(day) {
    switch (day) {
        case 0:
            return 'SUN'
        case 1:
            return 'MON'
        case 2:
            return 'TUE'
        case 3:
            return 'WED'
        case 4:
            return 'THU'
        case 5:
            return 'FRI'
        case 6:
            return 'SAT'
        default:
            return ''
    }
}

/**
 * @param {Date} date 
 * @returns {string}
 */
function formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`
}

/**
 * @param {{
 *  recipes: ReadonlyArray<RecipeOverview>
 * }} props 
 */
function MealCol(props) {
    return <Col xs={3}>
        {
            props.recipes.map(recipe => <div key={recipe.title}>{recipe.title}</div>)
        }
    </Col>
}

/**
 * @param {{
 *  dayMealPlan: DayMealPlan
 * }} props
 */
function DayRow(props) {
    return <Row>
        <Col xs={3}>
            <Row>{formatDate(props.dayMealPlan.date)}</Row>
            <Row>{getDayAbbrev(props.dayMealPlan.date.getDay())}</Row>
        </Col>

        {
            props.dayMealPlan.meals.map(meal => <MealCol recipes={meal.recipes} />)
        }
    </Row>    
}


/**
 * @param {{
 *  dayMealPlans: ReadonlyArray<DayMealPlan>
 * }} props 
 * @returns 
 */
export function Planner(props) {

    const sorted = [...props.dayMealPlans]
    sorted.sort((a, b) => a.date.valueOf() - b.date.valueOf())

    return <Container>
        <Row>
            <Col>Date</Col>
            <Col>Breakfast</Col>
            <Col>Lunch</Col>
            <Col>Dinner</Col>
        </Row>

        {
            sorted.map(day => 
                <DayRow key={formatDate(day.date)} dayMealPlan={day} />
            )
        }
    </Container>
}