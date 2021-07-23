/**
 * TODO as of 6/28/21:
 *  * Write logic for switching between buttons,
 *      probably as callback props for each button.
 */

// import './NavBar.css'

import RecipesInactive from './assets/Recipes_inactive.png'
import RecipesActive from './assets/Recipes_active.png'
import PlannerInactive from './assets/Planner_inactive.png'
import PlannerActive from './assets/Planner_active.png'

import GroceriesInactive from './assets/Groceries_inactive.png'
import SettingsInactive from './assets/Settings_inactive.png'
import { useAppDispatch, useAppSelector } from '../../../index'
import { setHomeScreen } from '../../../slices/homeScreens'
import { setRecipeBookScreen } from '../../../slices/recipeBook'

export function NavBar() {
    const dispatch = useAppDispatch()
    const currentHomeScreen = useAppSelector(state => state.homeScreens.current)

    const onRecipeBookClick = () => {
        dispatch(setRecipeBookScreen({ screen: 'Recipe List' }))
        dispatch(setHomeScreen({ screen: 'Recipe Book' }))
    }

    const onPlannerClick = () => {
        dispatch(setHomeScreen({ screen: 'Planner' }))
    }

    return (
        <div className="nav-bar-container">
            <div className="nav-button" onClick={onRecipeBookClick}>
                <img
                    src={
                        currentHomeScreen === 'Recipe Book'
                            ? RecipesActive
                            : RecipesInactive
                    }
                    alt="Recipes"
                />
                <p>Recipes</p>
            </div>

            <div className="nav-button" onClick={onPlannerClick}>
                <img
                    src={
                        currentHomeScreen === 'Planner'
                            ? PlannerActive
                            : PlannerInactive
                    }
                    alt="Planner"
                />
                <p>Planner</p>
            </div>

            <div className="nav-button nav-button-disabled">
                <img src={GroceriesInactive} alt="Groceries" />
                <p>Groceries</p>
            </div>

            <div className="nav-button nav-button-disabled">
                <img src={SettingsInactive} alt="Settings" />
                <p>Settings</p>
            </div>
        </div>
    )
}
