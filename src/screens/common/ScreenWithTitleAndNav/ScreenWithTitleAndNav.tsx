import { ScreenTitle, ScreenTitleProps } from "../ScreenTitle/ScreenTitle"
import { NavBar } from "../NavBar/NavBar"
import { Container } from "react-bootstrap"
import React from "react"

export type ScreenWithTitleAndNavProps = {
    children?: React.ReactNode,
    activeNavButton: "RECIPES" | "PLANNER"
} & ScreenTitleProps

export function ScreenWithTitleAndNav(props: ScreenWithTitleAndNavProps) {
    return <>
        <ScreenTitle title={props.title} onBackButtonClick={props.onBackButtonClick} />
        <Container fluid>
            {props.children}
        </Container>
        <NavBar activeButton={props.activeNavButton} />
    </>
}