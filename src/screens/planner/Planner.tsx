import './Planner.css'

import { RecipeOverview } from '../../client/RecipeOverview'
import { DayMealPlan } from '../../types/DayMealPlan'
import { NavBarButton } from '../common/NavBar/NavBar'
import { ScreenWithTitleAndNav, ScreenWithTitleAndNavProps } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { MealName } from '../../types/MealName'
import { MealCard } from './MealCard/MealCard'
import { MealCardMenuProps } from './MealCard/MealCardMenu/MealCardMenu'

function getDayAbbrev(day: number) {
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

function formatDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}`
}

function MealCol(props: {
    recipes?: ReadonlyArray<RecipeOverview>,
    accented?: boolean,
    onRecipeSelect: (recipe: RecipeOverview) => void,
    mealCardMenuPlacement: MealCardMenuProps['variant']
}) {

    if (props.recipes !== undefined && props.recipes.length !== 0) {
        return <div className="meal-col">
            {
                props.recipes.map(recipe => <MealCard 
                    variant={props.accented ? "accented" : "normal"} 
                    title={recipe.title}
                    onRecipeSelect={() => {
                        props.onRecipeSelect(recipe)
                    }}
                    menuPlacement={props.mealCardMenuPlacement}
                />)
            }
        </div>
    } else {
        return <div className="meal-col">
            <MealCard variant="empty" menuPlacement={props.mealCardMenuPlacement} />
        </div>
    }

}

function DayRow(props: {
    dayMealPlan: DayMealPlan,
    meals: ReadonlyArray<MealName>,
    variant: "light" | "dark",
    onRecipeSelect: (recipe: RecipeOverview) => void
}) {

    const today = new Date()
    const accented = today.getFullYear() === props.dayMealPlan.date.getFullYear() &&
        today.getMonth() === props.dayMealPlan.date.getMonth() &&
        today.getDate() === props.dayMealPlan.date.getDate()

    return <div className={['day-row', `day-row-${props.variant}`].join(" ")}>
        
        <div className="day-row-date-and-day">
            <span className="day-row-date">{formatDate(props.dayMealPlan.date)}</span>
            <span className="day-row-day">{getDayAbbrev(props.dayMealPlan.date.getDay())}</span>
        </div>

        {
            props.meals.map((meal, index) => <MealCol 
                recipes={props.dayMealPlan.meals.get(meal)} 
                accented={accented} 
                onRecipeSelect={props.onRecipeSelect}
                mealCardMenuPlacement={index === props.meals.length - 1 ? "left" : "right"}
            />)
        }
        
    </div>    
}

export type PlannerProps = {
    meals: ReadonlyArray<MealName>,
    dayMealPlans: ReadonlyArray<DayMealPlan>,
    onNavAway: (button: NavBarButton) => void,
    onRecipeSelect: (recipe: RecipeOverview) => void
}

export function Planner(props: PlannerProps) {

    const sorted = [...props.dayMealPlans]
    sorted.sort((a, b) => a.date.valueOf() - b.date.valueOf())

    const onNavButtonClick: ScreenWithTitleAndNavProps['onNavButtonClick'] = button => {
        if (props.onNavAway !== undefined) {
            props.onNavAway(button)
        }
    }

    return <ScreenWithTitleAndNav title="Planner" activeButton={NavBarButton.PLANNER} onNavButtonClick={onNavButtonClick}>
        <div className="planner">

            <div className="planner-heading">
                <span className="heading-date">Date</span>
                {
                    props.meals.map(meal => <span key={meal} className="heading-meal">{meal}</span>)
                }
            </div>

            {
                sorted.map((day, index) => 
                    <DayRow 
                        key={formatDate(day.date)}
                        dayMealPlan={day}
                        meals={props.meals}
                        variant={index % 2 === 0 ? "dark" : "light"}
                        onRecipeSelect={props.onRecipeSelect}
                    />
                )
            }

        </div>
    </ScreenWithTitleAndNav>
}