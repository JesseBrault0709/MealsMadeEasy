/**
 * TODO as of 6/28/21:
 *  * Figure out widths
 *  * Figure out a way for a child to control whether the title is showing or not,
 *      probably via some kind of prop or via a React Context
 */

import { ScreenTitle, ScreenTitleProps } from "../ScreenTitle/ScreenTitle"
import { NavBar, NavBarProps } from "../NavBar/NavBar"
import { Container, Row, Col } from "react-bootstrap"
import React from "react"

export type ScreenWithTitleAndNavProps = {
    children?: React.ReactNode,
} & ScreenTitleProps & NavBarProps

export function ScreenWithTitleAndNav(props: ScreenWithTitleAndNavProps) {
    return <Container fluid>
        <Row><Col><ScreenTitle title={props.title} onBackButtonClick={props.onBackButtonClick} /></Col></Row>
        <Row><Col>{props.children}</Col></Row>
        <Row><Col><NavBar activeButton={props.activeButton} onButtonClick={props.onButtonClick} /></Col></Row>
    </Container>
}