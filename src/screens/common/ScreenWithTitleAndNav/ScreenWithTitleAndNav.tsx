import { ScreenTitle, ScreenTitleProps } from "../ScreenTitle/ScreenTitle"
import { NavBar } from "../NavBar/NavBar"
import { Container, Row, Col } from "react-bootstrap"
import React from "react"

export type ScreenWithTitleAndNavProps = {
    children?: React.ReactNode,
    activeNavButton: "RECIPES" | "PLANNER"
} & ScreenTitleProps

export function ScreenWithTitleAndNav(props: ScreenWithTitleAndNavProps) {
    return <Container fluid>
        <Row><Col><ScreenTitle title={props.title} onBackButtonClick={props.onBackButtonClick} /></Col></Row>
        <Row><Col>{props.children}</Col></Row>
        <Row><Col><NavBar activeButton={props.activeNavButton} /></Col></Row>
    </Container>
}