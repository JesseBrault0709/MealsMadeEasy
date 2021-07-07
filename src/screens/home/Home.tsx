import React, { useState } from 'react'
import { RecipeBook, RecipeBookProps, SubScreen } from '../recipe-book/RecipeBook/RecipeBook'
import { Planner } from '../planner/Planner'
import { NavBarButton } from '../common/NavBar/NavBar'
import { RecipePreferences } from '../../types/RecipePreferences'
import { addToMeal, DayMealPlan, isPlanForDate } from '../../types/DayMealPlan'
import { MealName } from '../../types/MealName'
import { RecipeOverview } from '../../client/RecipeOverview'
import { RecipeListsProps } from '../recipe-book/RecipeLists/RecipeLists'

type Screen = 
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

export const DayMealPlansContext = React.createContext<ReadonlyArray<DayMealPlan>>([])

export const MealsContext = React.createContext<ReadonlyArray<MealName>>([])

export type HomeProps = {
    initialRecipePreferences?: RecipePreferences,
    initialDayMealPlans: ReadonlyArray<DayMealPlan>,
    meals: ReadonlyArray<MealName>,
    
    listSpecs: RecipeListsProps['lists']
}

export function Home(props: HomeProps) {
    
    const [currentScreen, setCurrentScreen] = useState<Screen>("Recipe Book")

    const [recipePreferences, setRecipePreferences] = useState<RecipePreferences>(props.initialRecipePreferences ?? {
        cookingTime: "No Limit",
        intolerances: []
    })

    const [dayMealPlans, setDayMealPlans] = useState(props.initialDayMealPlans)

    const [initialRecipeBookSubScreen, setInitialRecipeBookSubScreen] = useState<SubScreen>("Recipe List")
    const [initialRecipeBookRecipeId, setInitialRecipeBookRecipeId] = useState<RecipeOverview['id']>()

    const onNavAway = (button: NavBarButton) => {
        if (button === NavBarButton.RECIPE_BOOK) {
            setCurrentScreen("Recipe Book")
        } else if (button === NavBarButton.PLANNER) {
            setCurrentScreen("Planner")
        }
    }

    const onAddToMealPlan: RecipeBookProps['onAddToMealPlan'] = (meal, date, recipe) => {
        setCurrentScreen("Planner")

        const newDayMealPlans = dayMealPlans.reduce((arr: DayMealPlan[], cur: DayMealPlan) => {
            if (isPlanForDate(date)(cur)) {
                arr.push(addToMeal(cur, meal, recipe))
            } else {
                arr.push(cur)
            }
            return arr
        }, [])

        setDayMealPlans(newDayMealPlans)
    }

    if (currentScreen === "Recipe Book") {

        return <div className="home">
            <DayMealPlansContext.Provider value={dayMealPlans}>
                <MealsContext.Provider value={props.meals}>

                    <RecipeBook 
                        recipePreferences={recipePreferences} 

                        onAddToMealPlan={onAddToMealPlan} 
                        onNavAway={onNavAway}

                        initialRecipeId={initialRecipeBookRecipeId}
                        initialSubScreen={initialRecipeBookSubScreen}
                        
                        listSpecs={props.listSpecs}
                    />

                </MealsContext.Provider>
            </DayMealPlansContext.Provider>
        </div>

    } else if (currentScreen === "Planner") {

        return <div className="home">

            <Planner 
                dayMealPlans={dayMealPlans}
                meals={props.meals}
                onNavAway={onNavAway} 
                onRecipeSelect={recipe => {
                    setInitialRecipeBookRecipeId(recipe.id)
                    setInitialRecipeBookSubScreen("Recipe Info")
                    setCurrentScreen("Recipe Book")
                }}
            />

        </div>

    } else {
        throw new Error("Screen not implemented yet")
    }

}