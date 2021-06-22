import './NavBar.css'

import RecipesInactive from './assets/Recipes_inactive.png'
import RecipesActive from './assets/Recipes_active.png'
import PlannerInactive from './assets/Planner_inactive.png'
import PlannerActive from './assets/Planner_active.png'

import GroceriesInactive from './assets/Groceries_inactive.png'
import SettingsInactive from './assets/Settings_inactive.png'

import { Container, Row, Col } from 'react-bootstrap'

export const ActiveNavBarButton = Object.freeze({
    RECIPES: "RECIPES",
    PLANNER: "PLANNER"
})

/**
 * Props:
 *  * activeButton: a member of the exported ActiveNavBarButton 'enum'
 * 
 * @param {{
 *  activeButton: "RECIPES" | "PLANNER"
 * }} props
 */
export function NavBar(props) {
    return <Container>
        <Row>
            <Col>
                <div className="nav-button">
                    <img src={props.activeButton === "RECIPES" ? RecipesActive : RecipesInactive} alt="Recipes" />
                    <p>Recipes</p>
                </div>
            </Col>
            <Col>
                <div className="nav-button">
                    <img src={props.activeButton === "PLANNER" ? PlannerActive : PlannerInactive} alt="Planner" />
                    <p>Planner</p>
                </div>
            </Col>
            <Col>
                <div className="nav-button">
                    <img src={GroceriesInactive} alt="Groceries" />
                    <p>Groceries</p>
                </div>
            </Col>
            <Col>
                <div className="nav-button">
                    <img src={SettingsInactive} alt="Settings" />
                    <p>Settings</p>
                </div>
            </Col>
        </Row>
    </Container>
}