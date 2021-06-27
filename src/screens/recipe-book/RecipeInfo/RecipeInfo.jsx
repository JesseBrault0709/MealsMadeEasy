import { useState } from 'react'
import { FullRecipe } from '../../../client/FullRecipe'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { TimeServingsRating } from './TimeServingsRating/TimeServingsRating'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { IngredientsTab } from './IngredientsTab/IngredientsTab'
import { InstructionsTab } from './InstructionsTab/InstructionsTab'

/**
 * @param {{
 *  recipe: FullRecipe
 * }} props
 */
export function RecipeInfo(props) {

    const { spoonacularScore } = props.recipe

    const rating = spoonacularScore !== undefined && spoonacularScore !== null ? Math.floor(spoonacularScore / 20) : 0

    const [currentTab, setCurrentTab] = useState("Ingredients")

    return <Container>
        <Row><Col><h2>{props.recipe.title}</h2></Col></Row>

        <TimeServingsRating time={props.recipe.readyInMinutes} servings={props.recipe.servings} rating={rating} />

        <Row><Col><img src={props.recipe.image} alt="Recipe Picture" /></Col></Row>

        <Tabs>
            <Tab active={currentTab === "Ingredients"} onClick={() => setCurrentTab("Ingredients")}>Ingredients</Tab>
            <Tab active={currentTab === "Instructions"} onClick={() => setCurrentTab("Instructions")}>Instructions</Tab>
        </Tabs>

        {
            currentTab === "Ingredients" ? 
            <IngredientsTab ingredients={props.recipe.extendedIngredients} /> : 
                currentTab === "Instructions" ?
                <InstructionsTab instructions={props.recipe.instructions} /> :
                ''
        }
    </Container>
}