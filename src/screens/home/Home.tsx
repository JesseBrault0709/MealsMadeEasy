import React, { useState } from 'react'
import { RecipeBook } from '../recipe-book/RecipeBook/RecipeBook'
import { Planner } from '../planner/Planner'
import { DayMealPlan, isPlanForDate } from '../../types/DayMealPlan'
import { MealName } from '../../types/MealName'
import { useAppDispatch, useAppSelector } from '../../hooks'

export type HomeScreen = 
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

export const DayMealPlansContext = React.createContext<ReadonlyArray<DayMealPlan>>([])

export const MealsContext = React.createContext<ReadonlyArray<MealName>>([])

export type HomeProps = {
    initialDayMealPlans: ReadonlyArray<DayMealPlan>,
    meals: ReadonlyArray<MealName>
}

export function Home(props: HomeProps) {
    
    const dispatch = useAppDispatch()
    
    const currentScreen: HomeScreen = useAppSelector(state => state.homeScreens.current)

    const [dayMealPlans, setDayMealPlans] = useState(props.initialDayMealPlans)

    if (currentScreen === "Recipe Book") {

        return <div className="home">
            <DayMealPlansContext.Provider value={dayMealPlans}>
                <MealsContext.Provider value={props.meals}>

                    <RecipeBook />

                </MealsContext.Provider>
            </DayMealPlansContext.Provider>
        </div>

    } else if (currentScreen === "Planner") {

        return <div className="home">

        </div>

    } else {
        throw new Error("Screen not implemented yet")
    }

}