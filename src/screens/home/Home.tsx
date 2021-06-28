import { useState } from 'react'
import { SPDiet, SPIntolerance } from './../../client/spoonacularTypes'
import { Sweet } from '../transitions/Sweet'
import { RecipeBook } from '../recipe-book/RecipeBook/RecipeBook'
import { ScreenWithTitleAndNav } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'

export type HomeProps = {
    showLoadingScreen: boolean

    initialCookingTime?: string
    initialDiet?: SPDiet
    initialIntolerances?: ReadonlyArray<SPIntolerance>
}

type HomeScreen = 
    "Loading" |
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

export function Home(props: HomeProps) {
    
    const [currentScreen, setCurrentScreen] = useState<HomeScreen>(props.showLoadingScreen ? "Loading" : "Recipe Book")

    const [cookingTime, setCookingTime] = useState(props.initialCookingTime)
    const [diet, setDiet] = useState(props.initialDiet)
    const [intolerances, setIntolerances] = useState(props.initialIntolerances ?? [])

    if (currentScreen === "Loading") {

        setTimeout(() => setCurrentScreen("Recipe Book"), 1000) // go to Recipe Book after one second

        return <Sweet />

    } else if (currentScreen === "Recipe Book") {

        return <ScreenWithTitleAndNav title="Recipe Book" activeNavButton="RECIPES">
            <RecipeBook cookingTime={cookingTime} diet={diet} intolerances={intolerances} />
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("Screen not implemented yet")
    }

}