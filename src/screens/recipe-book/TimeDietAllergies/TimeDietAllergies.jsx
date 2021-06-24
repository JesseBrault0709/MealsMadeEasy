import { Button, Container, Row } from "react-bootstrap"

/**
 * @param {{
 *  onTimeClick?: () => void,
 *  onDietClick?: () => void,
 *  onAllergiesClick?: () => void
 * }} props
 */
export function TimeDietAllergies(props) {
    return <Container fluid>
        <Row>
            <Button>Time</Button>
            <Button>Diets</Button>
            <Button>Allergies</Button>
        </Row>
    </Container>
}