import { RecipeCard } from '../RecipeCard/RecipeCard'
import { Container, Row, Col } from 'react-bootstrap'
import { RecipeOverview } from '../../../client/RecipeOverview'

export type RecipesGridProps = {
    recipes: ReadonlyArray<RecipeOverview>
}

export function RecipesGrid(props: RecipesGridProps) {
    return <Container>
        {
        props.recipes.map((recipe1, index) => {
            if (index % 2 === 0) {
                const recipe2 = props.recipes[index + 1]
                return <Row>
                    <Col>
                        <RecipeCard title={recipe1.title} imgSrc={recipe1.image} />
                    </Col>
                    <Col>
                        {recipe2 !== undefined && recipe2 !== null ? <RecipeCard title={recipe2.title} imgSrc={recipe2.image} /> : ''}
                    </Col>
                </Row>
            } else {
                return ''
            }
        })
    }
    </Container>
}