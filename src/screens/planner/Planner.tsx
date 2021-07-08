import './Planner.css'

import { RecipeOverview } from '../../client/RecipeOverview'
import { DayMealPlan } from '../../types/DayMealPlan'
import { ScreenWithTitleAndNav } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { MealName } from '../../types/MealName'
import { MealCard } from './MealCard/MealCard'
import { MealCardMenuProps } from './MealCard/MealCardMenu/MealCardMenu'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { appConfig } from '../../appConfig'
import { fetchFullRecipe } from '../../slices/recipeInfo'
import { setRecipeBookScreen } from '../../slices/recipeBook'
import { setHomeScreen } from '../../slices/homeScreens'
import { removeRecipeFromMealPlan } from '../../slices/dayMealPlans'

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
    mealCardMenuPlacement: MealCardMenuProps['variant'],
    onRemoveRecipe?: (recipe: RecipeOverview) => void
}) {

    const dispatch = useAppDispatch()

    if (props.recipes !== undefined && props.recipes.length !== 0) {
        return <div className="meal-col">
            {
                props.recipes.map(recipe => <MealCard 
                    variant={props.accented ? "accented" : "normal"} 
                    title={recipe.title}
                    onRecipeSelect={() => {
                        dispatch(fetchFullRecipe(recipe))
                        dispatch(setRecipeBookScreen({ screen: 'Recipe Info' }))
                        dispatch(setHomeScreen({ screen: 'Recipe Book' }))
                    }}
                    onRemoveRecipe={() => {
                        if (props.onRemoveRecipe !== undefined) {
                            props.onRemoveRecipe(recipe)
                        }
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
}) {

    const dispatch = useAppDispatch()

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
                recipes={props.dayMealPlan.meals.find(mealPlan => mealPlan.name === meal)?.recipes} 
                accented={accented}
                mealCardMenuPlacement={index === props.meals.length - 1 ? "left" : "right"}
                onRemoveRecipe={(recipe: RecipeOverview) => {
                    dispatch(removeRecipeFromMealPlan({
                        date: props.dayMealPlan.date,
                        mealName: meal,
                        recipe
                    }))
                }}
            />)
        }
        
    </div>    
}

export function Planner() {

    const dayMealPlans = useAppSelector(state => state.dayMealPlans.plans)

    const sorted = [...dayMealPlans]
    sorted.sort((a, b) => a.date.valueOf() - b.date.valueOf())

    return <ScreenWithTitleAndNav title="Planner">
        <div className="planner">

            <div className="planner-heading">
                <span className="heading-date">Date</span>
                {
                    appConfig.meals.map(meal => <span key={meal} className="heading-meal">{meal}</span>)
                }
            </div>

            {
                sorted.map((day, index) => 
                    <DayRow 
                        key={formatDate(day.date)}
                        dayMealPlan={day}
                        meals={appConfig.meals}
                        variant={index % 2 === 0 ? "dark" : "light"}
                    />
                )
            }

        </div>
    </ScreenWithTitleAndNav>
}