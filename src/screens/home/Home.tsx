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

}

export function Home(props: HomeProps) {
    
    const dispatch = useAppDispatch()
    
    const currentScreen: HomeScreen = useAppSelector(state => state.homeScreens.current)


    if (currentScreen === "Recipe Book") {

        return <div className="home">
            <RecipeBook />
        </div>

    } else if (currentScreen === "Planner") {

        return <div className="home">
            <Planner />
        </div>

    } else {
        throw new Error("Screen not implemented yet")
    }

}