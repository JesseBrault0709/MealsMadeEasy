/**
 * TODO as of 6/28/21:
 *  * Instructions can either be a single string
 *      or an array of strings; in the latter case,
 *      render with bullet points.
 */

import { Row, Col, Button } from "react-bootstrap"

/**
 * @param {{
 *  instructions: string
 * }} props 
 */
export function InstructionsTab(props) {
    return <>
        <Row>
            <Col><h3>Method</h3></Col>
        </Row>
        <Row>
            <Col>{props.instructions}</Col>
        </Row>

        <Row>
            <Col>
                <Button>Back</Button>
            </Col>
            <Col>
                <Button>Add to Meal Plan</Button>
            </Col>
        </Row>

    </>
}