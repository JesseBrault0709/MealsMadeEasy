import React, { useState } from 'react'
import { Sweet } from '../transitions/Sweet'
import { RecipeBook } from '../recipe-book/RecipeBook/RecipeBook'
import { ScreenWithTitleAndNav } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { Planner } from '../planner/Planner'
import { NavBarButton } from '../common/NavBar/NavBar'
import { RecipePreferences } from '../../types/RecipePreferences'
import { DayMealPlan, MealPlan } from '../../types/MealPlanTypes'
import { FullRecipe } from '../../client/FullRecipe'
import { BottomOverlay } from '../common/BottomOverlay/BottomOverlay'
import { AddToMealPlan } from '../addToMealPlan/AddToMealPlan'
import { RecipeOverview } from '../../client/RecipeOverview'

export type HomeProps = {
    showLoadingScreen: boolean
    initialRecipePreferences?: RecipePreferences
    initialDayMealPlans: ReadonlyArray<DayMealPlan>
}

type Screen = 
    "Loading" |
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

function getNewDayMealPlans(
    recipe: RecipeOverview,
    targetMealPlanName: string,
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

export function Home(props: HomeProps) {
    
    const [currentScreen, setCurrentScreen] = useState<Screen>(props.showLoadingScreen ? "Loading" : "Recipe Book")

    const [recipePreferences, setRecipePreferences] = useState(props.initialRecipePreferences)

    const [showOverlay, setShowOverlay] = useState(false)
    const [overlay, setOverlay] = useState<React.ReactNode>()

    const [dayMealPlans, setDayMealPlans] = useState(props.initialDayMealPlans)

    const onNavButtonClick = (button: NavBarButton) => {
        if (button === NavBarButton.RECIPE_BOOK) {
            setCurrentScreen("Recipe Book")
        } else if (button === NavBarButton.PLANNER) {
            setCurrentScreen("Planner")
        }
    }

    const onAddToMealPlan = (recipe: FullRecipe) => {
        
        const onSubmit = (targetMeal: string, targetDate: Date) => {
            console.log({
                recipe, mealName: targetMeal, date: targetDate
            })
            setShowOverlay(false)
            setCurrentScreen("Planner")
            setDayMealPlans(getNewDayMealPlans(recipe, targetMeal, targetDate, dayMealPlans))
        }

        setOverlay(<AddToMealPlan onSubmit={onSubmit} />)
        setShowOverlay(true)
    }

    if (currentScreen === "Loading") {

        setTimeout(() => setCurrentScreen("Recipe Book"), 1000) // go to Recipe Book after one second

        return <Sweet />

    } else if (currentScreen === "Recipe Book") {

        return <ScreenWithTitleAndNav title="Recipe Book" activeButton={NavBarButton.RECIPE_BOOK} onButtonClick={onNavButtonClick}>
            <RecipeBook recipePreferences={recipePreferences} onAddToMealPlan={onAddToMealPlan}/>
            {showOverlay ? <BottomOverlay show>
                {overlay}
            </BottomOverlay> : ''}
        </ScreenWithTitleAndNav>

    } else if (currentScreen === "Planner") {

        return <ScreenWithTitleAndNav title="Meal Planner" activeButton={NavBarButton.PLANNER} onButtonClick={onNavButtonClick}>
            <Planner dayMealPlans={dayMealPlans}/>
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("Screen not implemented yet")
    }

}