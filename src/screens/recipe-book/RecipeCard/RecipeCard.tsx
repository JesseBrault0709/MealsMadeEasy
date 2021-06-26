import DevRecipePicture from './assets/DevRecipePicture.png'

import { Card } from "react-bootstrap"
import { RecipeRating } from "../RecipeRating/RecipeRating"
import { RecipeOverview } from '../../../client/RecipeOverview'

export function RecipeCard(props: { recipe: RecipeOverview }) {
    const { recipe } = props

    // spoonacular score is 0-100; divide by 20 to get 0-5
    const rating = recipe.spoonacularScore ? Math.floor(recipe.spoonacularScore / 20) : undefined

    return <Card>
        <Card.Img src={recipe.image ?? DevRecipePicture} />
        <Card.Title>{recipe.title}</Card.Title>
        {rating !== undefined ? <RecipeRating rating={rating} /> : ''}
    </Card>
}