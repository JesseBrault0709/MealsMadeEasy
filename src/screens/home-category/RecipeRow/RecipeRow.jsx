import { Container, Row } from "react-bootstrap";
import { RecipeCard } from '../RecipeCard/RecipeCard'

import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

/**
 * @param {{
 *  recipes?: {
 *     title: string 
 *  }[],
 *  rowTitle?: string
 * }} props 
 */
export function RecipeRow(props) {
    return <Container>
        <Row>
            <h2>{props.rowTitle}</h2>
        </Row>
        <Row>
            {props.recipes?.map(recipe =>
                <RecipeCard title={recipe.title} imgSrc={DevRecipePicture} />
            )}
        </Row>
    </Container>
}