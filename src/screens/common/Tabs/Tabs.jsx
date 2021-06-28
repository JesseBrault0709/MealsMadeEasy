/**
 * TODO as of 6/28/21:
 *  [none]
 */

import { Row, Col } from "react-bootstrap";

/**
 * @param {{
 *  onClick: () => void
 *  active: boolean
 *  children: React.ReactNode
 * }} props 
 */
export function Tab(props) {
    return <Col
        onClick={props.onClick}
        style={{
            borderBottom: props.active ? '2px solid #333333' : ''
        }}
    >
        {props.children}
    </Col>
}

/**
 * @param {{
 *  children: React.ReactNode
 * }} props 
 */
export function Tabs(props) {
    return <Row>
        {props.children}
    </Row>
}