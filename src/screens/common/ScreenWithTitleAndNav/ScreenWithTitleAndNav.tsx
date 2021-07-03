import './ScreenWithTitleAndNav.css'

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
    return <div className="screen-with-title-and-nav">
        <ScreenTitle title={props.title} onBackButtonClick={props.onBackButtonClick} />
        {props.children}
        <NavBar activeButton={props.activeButton} onNavButtonClick={props.onNavButtonClick} />
    </div>
}