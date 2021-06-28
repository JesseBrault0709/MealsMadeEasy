/**
 * TODO as of 6/28/21:
 *  * Make checkmark circle functional even though
 *      the add to grocery list functionality is
 *      not until MVP 2
 */

import CheckCircle from './assets/CheckCircle.png'
import { ExtendedIngredient } from "../../../../client/FullRecipe"
import { Row, Col, Button } from 'react-bootstrap'

/**
 * @param {{
 *  ingredients: ReadonlyArray<ExtendedIngredient>
 * }} props 
 */
export function IngredientsTab(props) {
    return <>
        <Row><Col><h3>What you need</h3></Col></Row>

        {
            props.ingredients.map(ingredient => 
                <Row key={ingredient.original}>
                    <Col>{ingredient.amount} {ingredient.unit} {ingredient.name}</Col>
                    <Col><img src={CheckCircle} alt="Empty Checkmark Circle"/></Col>
                </Row>    
            )
        }

        <Row>
            <Col>
                <Button>Add to Grocery List</Button>
            </Col>
            <Col>
                <Button>Add to Meal Plan</Button>
            </Col>
        </Row>

    </>
}