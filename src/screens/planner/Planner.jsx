import './Planner.css'

import { RecipeOverview } from '../../client/RecipeOverview'
import { DayMealPlan } from '../../types/MealPlanTypes'
import { NavBarButton } from '../common/NavBar/NavBar'
import { ScreenWithTitleAndNav } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'

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
    return <div className="meal-col">
        {
            props.recipes.map(recipe => <div className="meal-card" key={recipe.title}>{recipe.title}</div>)
        }
    </div>
}

/**
 * @param {{
 *  dayMealPlan: DayMealPlan
 *  variant: "light" | "dark"
 * }} props
 */
function DayRow(props) {

    const sorted = [...props.dayMealPlan.meals]
    sorted.sort((a, b) => a.order - b.order)

    return <div className={['day-row', `day-row-${props.variant}`].join(" ")}>
        
        <div className="day-row-date-and-day">
            <span className="day-row-date">{formatDate(props.dayMealPlan.date)}</span>
            <span className="day-row-day">{getDayAbbrev(props.dayMealPlan.date.getDay())}</span>
        </div>

        {
            sorted.map(meal => <MealCol recipes={meal.recipes} />)
        }
        
    </div>    
}


/**
 * @param {{
 *  dayMealPlans: ReadonlyArray<DayMealPlan>
 *  onNavAway?: (button: NavBarButton) => void
 * }} props 
 * @returns 
 */
export function Planner(props) {

    const sorted = [...props.dayMealPlans]
    sorted.sort((a, b) => a.date.valueOf() - b.date.valueOf())

    const onNavButtonClick = button => {
        if (props.onNavAway !== undefined) {
            props.onNavAway(button)
        }
    }

    return <ScreenWithTitleAndNav title="Planner" activeButton={NavBarButton.PLANNER} onNavButtonClick={onNavButtonClick}>
        <div className="planner">

            <div className="planner-heading">
                <span className="heading-date">Date</span>
                <span className="heading-meal">Breakfast</span>
                <span className="heading-meal">Lunch</span>
                <span className="heading-meal">Dinner</span>
            </div>

            {
                sorted.map((day, index) => 
                    <DayRow key={formatDate(day.date)} dayMealPlan={day} variant={index % 2 === 0 ? "dark" : "light"}/>
                )
            }

        </div>
    </ScreenWithTitleAndNav>
}