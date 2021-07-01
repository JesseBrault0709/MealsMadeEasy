/**
 * TODO as of 6/28/21:
 *  * Write logic for switching between buttons,
 *      probably as callback props for each button.
 */

import './NavBar.css'

import RecipesInactive from './assets/Recipes_inactive.png'
import RecipesActive from './assets/Recipes_active.png'
import PlannerInactive from './assets/Planner_inactive.png'
import PlannerActive from './assets/Planner_active.png'

import GroceriesInactive from './assets/Groceries_inactive.png'
import SettingsInactive from './assets/Settings_inactive.png'

import { Container, Row, Col } from 'react-bootstrap'

export enum NavBarButton {
    RECIPE_BOOK = "Recipe Book",
    PLANNER = "Planner"
}

export type NavBarProps = {
    activeButton: NavBarButton,
    onButtonClick: (button: NavBarButton) => void
}

export function NavBar(props: NavBarProps) {

    const getOnClick = (button: NavBarButton) => () => {
        props.onButtonClick(button)
    }

    return <div className="nav-bar-container">

        <div className="nav-button" onClick={getOnClick(NavBarButton.RECIPE_BOOK)}>
            <img src={props.activeButton === NavBarButton.RECIPE_BOOK ? RecipesActive : RecipesInactive} alt="Recipes" />
            <p>Recipes</p>
        </div>

        <div className="nav-button" onClick={getOnClick(NavBarButton.PLANNER)}>
            <img src={props.activeButton === NavBarButton.PLANNER ? PlannerActive : PlannerInactive} alt="Planner" />
            <p>Planner</p>
        </div>

        <div className="nav-button">
            <img src={GroceriesInactive} alt="Groceries" />
            <p>Groceries</p>
        </div>

        <div className="nav-button">
            <img src={SettingsInactive} alt="Settings" />
            <p>Settings</p>
        </div>

    </div>
}