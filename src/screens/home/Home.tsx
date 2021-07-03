import { useState } from 'react'
import { Sweet } from '../transitions/Sweet'
import { RecipeBook, RecipeBookProps } from '../recipe-book/RecipeBook/RecipeBook'
import { Planner } from '../planner/Planner'
import { NavBarButton } from '../common/NavBar/NavBar'
import { RecipePreferences } from '../../types/RecipePreferences'
import { DayMealPlan, MealPlan } from '../../types/MealPlanTypes'
import { RecipeOverview } from '../../client/RecipeOverview'
import { MealName } from '../../types/MealName'

function getNewDayMealPlans(
    recipe: RecipeOverview,
    targetMealPlanName: MealName,
    targetDate: Date,
    oldDayMealPlans: ReadonlyArray<DayMealPlan>
) {
    const results: DayMealPlan[] = []

    const targetDayMealPlan = oldDayMealPlans.find(dayMealPlan => dayMealPlan.date.valueOf() === targetDate.valueOf())

    if (targetDayMealPlan === undefined) {
        results.push({
            date: targetDate,
            meals: [
                {
                    name: targetMealPlanName,
                    recipes: [recipe]
                }
            ]
        }, ...oldDayMealPlans)
    } else {
        const mealResults: MealPlan[] = []
        
        const targetMealPlan = targetDayMealPlan.meals.find(meal => meal.name === targetMealPlanName)
        
        if (targetMealPlan === undefined) {
            mealResults.push({
                name: targetMealPlanName,
                recipes: [recipe]
            }, ...targetDayMealPlan.meals)
        } else {
            mealResults.push({
                name: targetMealPlan.name,
                recipes: [...targetMealPlan.recipes, recipe]
            }, ...targetDayMealPlan.meals.filter(mealPlan => mealPlan !== targetMealPlan))
        }

        results.push({
            date: targetDayMealPlan.date,
            meals: mealResults
        }, ...oldDayMealPlans.filter(dayMealPlan => dayMealPlan !== targetDayMealPlan))
    }

    return results
}

type Screen = 
    "Loading" |
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

export type HomeProps = {
    showLoadingScreen: boolean
    initialRecipePreferences?: RecipePreferences
    initialDayMealPlans: ReadonlyArray<DayMealPlan>
}

export function Home(props: HomeProps) {
    
    const [currentScreen, setCurrentScreen] = useState<Screen>(props.showLoadingScreen ? "Loading" : "Recipe Book")

    const [recipePreferences, setRecipePreferences] = useState<RecipePreferences>(props.initialRecipePreferences ?? {
        cookingTime: "No Limit",
        intolerances: []
    })

    const [dayMealPlans, setDayMealPlans] = useState(props.initialDayMealPlans)

    const onNavAway = (button: NavBarButton) => {
        if (button === NavBarButton.RECIPE_BOOK) {
            setCurrentScreen("Recipe Book")
        } else if (button === NavBarButton.PLANNER) {
            setCurrentScreen("Planner")
        }
    }

    const onAddToMealPlan: RecipeBookProps['onAddToMealPlan'] = (meal, date, recipe) => {
        setCurrentScreen("Planner")
        setDayMealPlans(getNewDayMealPlans(recipe, meal, date, dayMealPlans))
    }

    const modalDiv = <div className="modal-div" />

    if (currentScreen === "Loading") {

        setTimeout(() => setCurrentScreen("Recipe Book"), 1000) // go to Recipe Book after one second

        return <Sweet />

    } else if (currentScreen === "Recipe Book") {

        return <div className="home">
            <div className="home-content">
                <RecipeBook 
                    recipePreferences={recipePreferences} 
                    onAddToMealPlan={onAddToMealPlan} 
                    onNavAway={onNavAway}
                />
            </div>
            {modalDiv}
        </div>

    } else if (currentScreen === "Planner") {

        return <div className="home">
            <Planner dayMealPlans={dayMealPlans} onNavAway={onNavAway} />
        </div>

    } else {
        throw new Error("Screen not implemented yet")
    }

}