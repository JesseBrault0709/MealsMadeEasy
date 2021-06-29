import { useState } from 'react'
import { SPDiet, SPIntolerance } from './../../client/spoonacularTypes'
import { Sweet } from '../transitions/Sweet'
import { RecipeBook } from '../recipe-book/RecipeBook/RecipeBook'
import { ScreenWithTitleAndNav } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { Planner } from '../planner/Planner'
import { RecipeOverview } from '../../client/RecipeOverview'
import { NavBarButton } from '../common/NavBar/NavBar'

export type HomeProps = {
    showLoadingScreen: boolean

    initialCookingTime?: string
    initialDiet?: SPDiet
    initialIntolerances?: ReadonlyArray<SPIntolerance>
}

type Screen = 
    "Loading" |
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

export function Home(props: HomeProps) {
    
    const [currentScreen, setCurrentScreen] = useState<Screen>(props.showLoadingScreen ? "Loading" : "Recipe Book")

    const [cookingTime, setCookingTime] = useState(props.initialCookingTime)
    const [diet, setDiet] = useState(props.initialDiet)
    const [intolerances, setIntolerances] = useState(props.initialIntolerances ?? [])

    const days: ReadonlyArray<{
        date: Date,
        breakfast: ReadonlyArray<RecipeOverview>,
        lunch: ReadonlyArray<RecipeOverview>,
        dinner: ReadonlyArray<RecipeOverview>
    }> = [

    ]

    const onNavButtonClick = (button: NavBarButton) => {
        if (button === NavBarButton.RECIPE_BOOK) {
            setCurrentScreen("Recipe Book")
        } else if (button === NavBarButton.PLANNER) {
            setCurrentScreen("Planner")
        }
    }

    if (currentScreen === "Loading") {

        setTimeout(() => setCurrentScreen("Recipe Book"), 1000) // go to Recipe Book after one second

        return <Sweet />

    } else if (currentScreen === "Recipe Book") {

        return <ScreenWithTitleAndNav title="Recipe Book" activeButton={NavBarButton.RECIPE_BOOK} onButtonClick={onNavButtonClick}>
            <RecipeBook cookingTime={cookingTime} diet={diet} intolerances={intolerances} />
        </ScreenWithTitleAndNav>

    } else if (currentScreen === "Planner") {

        return <ScreenWithTitleAndNav title="Meal Planner" activeButton={NavBarButton.PLANNER} onButtonClick={onNavButtonClick}>
            <Planner days={days}/>
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("Screen not implemented yet")
    }

}