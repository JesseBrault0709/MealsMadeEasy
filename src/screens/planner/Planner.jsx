import { Container, Row, Col } from 'react-bootstrap'
import { RecipeOverview } from '../../client/RecipeOverview'

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
    return <Col>
        {
            props.recipes.map(recipe => <div key={recipe.title}>{recipe.title}</div>)
        }
    </Col>
}

/**
 * @param {{
 *  date: Date,
 *  breakfast: ReadonlyArray<RecipeOverview>
 *  lunch: ReadonlyArray<RecipeOverview>
 *  dinner: ReadonlyArray<RecipeOverview>
 * }} props
 */
function DayRow(props) {
    return <Row>
        <Col>
            <Row>{formatDate(props.date)}</Row>
            <Row>{getDayAbbrev(props.date.getDay())}</Row>
        </Col>

        <MealCol recipes={props.breakfast} />
        <MealCol recipes={props.lunch} />
        <MealCol recipes={props.dinner} />
    </Row>    
}


/**
 * @param {{
 *  days: ReadonlyArray<{
 *      date: Date,
 *      breakfast: ReadonlyArray<RecipeOverview>
 *      lunch: ReadonlyArray<RecipeOverview>
 *      dinner: ReadonlyArray<RecipeOverview>
 *  }>
 * }} props 
 * @returns 
 */
export function Planner(props) {
    return <Container>
        <Row>
            <Col>Date</Col>
            <Col>Breakfast</Col>
            <Col>Lunch</Col>
            <Col>Dinner</Col>
        </Row>

        {
            props.days.map(day => 
                <DayRow key={formatDate(day.date)} {...day} />
            )
        }
    </Container>
}