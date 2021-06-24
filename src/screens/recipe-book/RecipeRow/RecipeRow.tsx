import { Container, Row } from "react-bootstrap";
import { RecipeCard } from '../RecipeCard/RecipeCard'

import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'
import { Recipe } from "../../../recipes/Recipe";

export type RecipeRowProps = {
    title: string,
    recipes: ReadonlyArray<Recipe>
}

export function RecipeRow(props: RecipeRowProps) {
    return <Container>
        <Row>
            <h2>{props.title}</h2>
        </Row>
        <Row>
            {props.recipes?.map(recipe =>
                <RecipeCard title={recipe.title} imgSrc={DevRecipePicture} />
            )}
        </Row>
    </Container>
}