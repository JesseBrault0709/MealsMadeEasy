import { TagChip } from "./TagChip/TagChip"
import { Row, Col } from 'react-bootstrap'

export function TimeDietAllergies({ 
    onFilterClick,
    cookingTime,
    diet,
    intolerances
}) {
    return <Row>
        <Col><button type="button" onClick={onFilterClick}>[filter icon]</button></Col>
        <Col><TagChip tag={{ name: "Cooking Time", values: [cookingTime] }} /></Col>
        <Col><TagChip tag={{ name: "Diet", values: [diet] }} /></Col>
        <Col><TagChip tag={{ name: "Allergies", values: intolerances }} /></Col>
    </Row>
}