/**
 * TODO as of 6/28/21:
 *  * Do styling, esp of the filter button.
 */

import Check from './assets/Check.png'
import X from './assets/X.png'
import Funnel from './assets/Funnel.png'

import { Row, Col } from 'react-bootstrap'
import { Chip } from '../../../common/Chip/Chip'

export function TimeDietAllergies({ 
    onFilterClick,
    cookingTime,
    diet,
    intolerances
}) {
    return <Row>
        <Col xs={1} style={{ textAlign: 'center' }}>
            <img src={Funnel} />
        </Col>
        <Col>
            {
                cookingTime !== undefined ?
                <Chip avatar={<img src={Check} />} label={cookingTime} type="strong" /> :
                <Chip avatar={<img src={X} />} label="Time" type="no-value" />
            }
        </Col>
        <Col>
            {
                diet !== undefined ?
                <Chip avatar={<img src={Check} />} label={diet} type="strong" /> :
                <Chip avatar={<img src={X} />} label="Diet" type="no-value" />
            }
        </Col>
        <Col>
            {
                intolerances === undefined || intolerances.length === 0 ?
                <Chip avatar={<img src={X} />} label="Allergies" type="no-value" /> :
                <Chip avatar={intolerances.length} label="Allergies" type="strong" />
            }
        </Col>
    </Row>
}