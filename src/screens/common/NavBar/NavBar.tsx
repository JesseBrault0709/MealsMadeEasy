import RecipesInactive from './assets/Recipes_inactive.png'
import RecipesActive from './assets/Recipes_active.png'
import PlannerInactive from './assets/Planner_inactive.png'
import PlannerActive from './assets/Planner_active.png'

import GroceriesInactive from './assets/Groceries_inactive.png'
import SettingsInactive from './assets/Settings_inactive.png'
import { useLocation } from 'react-router-dom'
import { useAppNavigators } from '../../../util/hooks'

export function NavBar() {
    const location = useLocation()

    const { goToRecipeBook, goToPlanner } = useAppNavigators()

    return (
        <div className="nav-bar-container">
            <div className="nav-button" onClick={() => goToRecipeBook()}>
                <img
                    src={
                        location.pathname.startsWith('/recipebook')
                            ? RecipesActive
                            : RecipesInactive
                    }
                    alt="Recipes"
                />
                <p>Recipes</p>
            </div>

            <div className="nav-button" onClick={() => goToPlanner()}>
                <img
                    src={
                        location.pathname === '/planner'
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
