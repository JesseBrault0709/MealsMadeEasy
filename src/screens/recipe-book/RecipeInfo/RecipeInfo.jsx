/**
 * TODO as of 6/28/21:
 *  * Remove back button in favor of button up in
 *      ScreenTitle
 */

import './RecipeInfo.css'

import Back from './assets/back.png'

import { useEffect, useState } from 'react'
import { FullRecipe } from '../../../client/FullRecipe'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { TimeServingsRating } from './TimeServingsRating/TimeServingsRating'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { IngredientsTab } from './IngredientsTab/IngredientsTab'
import { InstructionsTab } from './InstructionsTab/InstructionsTab'

/**
 * @param {{
 *  getRecipe: () => Promise<FullRecipe>,
 *  onBackButtonClick?: () => void,
 *  onAddToMealPlan: (recipe: FullRecipe) => void
 * }} props
 */
export function RecipeInfo(props) {

    const [recipe, setRecipe] = useState({
        title: '',
        readyInMinutes: 0,
        servings: 0,
        image: '',
        spoonacularScore: 0,
        extendedIngredients: [],
        instructions: ''
    })

    useEffect(() => {
        props.getRecipe().then(setRecipe)
    }, [props])

    const {
        title,
        readyInMinutes,
        servings,
        image,
        spoonacularScore,
        extendedIngredients,
        instructions
    } = recipe

    const rating = spoonacularScore !== undefined && spoonacularScore !== null ? Math.floor(spoonacularScore / 20) : 0

    const [currentTab, setCurrentTab] = useState("Ingredients")

    const onAddToMealPlan = () => {
        props.onAddToMealPlan(recipe)
    }

    return <div className="recipe-info">
        {/* <Button onClick={props.onBackButtonClick}><img src={Back} alt="Back Button" /></Button> */}
        
        <h2 className="recipe-title">{title}</h2>

        <TimeServingsRating time={readyInMinutes} servings={servings} rating={rating} />

        <img className="recipe-image" src={image} alt="Recipe" />

        <Tabs>
            <Tab active={currentTab === "Ingredients"} onClick={() => setCurrentTab("Ingredients")}>Ingredients</Tab>
            <Tab active={currentTab === "Instructions"} onClick={() => setCurrentTab("Instructions")}>Instructions</Tab>
        </Tabs>

        {
            currentTab === "Ingredients" ? 
            <IngredientsTab ingredients={extendedIngredients} onAddToMealPlan={onAddToMealPlan} /> : 
                currentTab === "Instructions" ?
                <InstructionsTab instructions={instructions} onAddToMealPlan={onAddToMealPlan} /> :
                ''
        }
    </div>
}