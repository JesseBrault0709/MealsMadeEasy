import { ScreenTitle } from "../ScreenTitle/ScreenTitle"
import { NavBar } from "../NavBar/NavBar"
import { Container } from "react-bootstrap"

/**
 * @param {{
 *  title: string,
 *  activeNavButton: "RECIPES" | "PLANNER"
 * }} props 
 */
export function ScreenWithTitleAndNav(props) {
    return <>
        <ScreenTitle title={props.title} />
        <Container fluid>
            {props.children}
        </Container>
        <NavBar activeButton={props.activeNavButton} />
    </>
}