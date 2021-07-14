import { RecipeBook } from '../recipe-book/RecipeBook/RecipeBook'
import { Planner } from '../planner/Planner'
import { useAppSelector } from '../../index'

export type HomeScreen = 
    "Recipe Book" |
    "Planner" |
    "Grocery List" |
    "Settings"

export function Home() {
    
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