import { Row, Col, Button } from 'react-bootstrap'

/**
 * @param {{
 *  meals: ReadonlyArray<string>,
 *  onMealSelect: (meal: string) => void,
 *  activeMeal?: string
 * }} props 
 */
export function SelectMealType(props) {
    
    const getOnClick = meal => () => {
        props.onMealSelect(meal)
    }

    return <>

        <Row>
            <Col>
                <h3>Select Meal Type</h3>
            </Col>
        </Row>

        <Row>
            {
                props.meals.map((meal, index) => 
                    <Col>
                        <Button 
                            key={`${meal}_${index}`} 
                            onClick={getOnClick(meal)} 
                            active={meal === props.activeMeal}
                        >{meal}</Button>
                    </Col>
                )
            }
        </Row>
    </> 
}