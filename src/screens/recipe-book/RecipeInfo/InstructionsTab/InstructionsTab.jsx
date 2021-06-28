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