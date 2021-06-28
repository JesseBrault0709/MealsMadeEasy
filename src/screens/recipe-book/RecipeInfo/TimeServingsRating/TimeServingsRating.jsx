import Clock from './assets/Clock.png'
import Servings from './assets/Servings.png'

import { RecipeRating } from '../../RecipeRating/RecipeRating'
import { Container, Row, Col } from 'react-bootstrap'

/**
 * @param {{
 *  time: number,
 *  servings: number,
 *  rating: number
 * }} props
 */
export function TimeServingsRating(props) {
    return <Row>
        <Col>
            <Container>
                <Row>
                    <img src={Clock} alt="Time" />
                    <span>{props.time} minutes</span>
                </Row>
            </Container>
        </Col>
        <Col>
            <Container>
                <Row>
                    <img src={Servings} alt="Servings" />
                    <span>{props.servings} servings</span>
                </Row>
            </Container>
        </Col>
        <Col>
            <RecipeRating rating={props.rating} />
        </Col>
    </Row>
}