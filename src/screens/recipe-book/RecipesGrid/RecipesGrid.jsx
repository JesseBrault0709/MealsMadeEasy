import { RecipeCard } from '../RecipeCard/RecipeCard'
import { Container, Row, Col } from 'react-bootstrap'
import { RecipeOverview } from '../../../client/RecipeOverview'

/**
 * @param {{
 *  recipes: ReadonlyArray<RecipeOverview>
 * }} props
 */
export function RecipesGrid(props) {
    return <Container>
        {
        props.recipes.map((recipe1, index) => {
            if (index % 2 === 0) {
                const recipe2 = props.recipes[index + 1]
                return <Row>
                    <Col>
                        <RecipeCard recipe={recipe1} />
                    </Col>
                    <Col>
                        {recipe2 !== undefined && recipe2 !== null ? <RecipeCard recipe={recipe2} /> : ''}
                    </Col>
                </Row>
            } else {
                return ''
            }
        })
    }
    </Container>
}