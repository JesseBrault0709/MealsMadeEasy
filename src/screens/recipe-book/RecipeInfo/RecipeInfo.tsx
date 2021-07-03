import './RecipeInfo.css'

import { useEffect, useState } from 'react'
import { FullRecipe } from '../../../client/FullRecipe'
import { TimeServingsRating } from './TimeServingsRating/TimeServingsRating'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { IngredientsTab } from './IngredientsTab/IngredientsTab'
import { InstructionsTab } from './InstructionsTab/InstructionsTab'
import { JBButton } from '../../../inputs/Button/Button'
import { AddToMealPlan } from '../../addToMealPlan/AddToMealPlan'
import { MealName } from '../../../types/MealName'

export type RecipeInfoProps = {
    getRecipe: () => Promise<FullRecipe>,
    onAddToMealPlan?: (meal: MealName, date: Date, recipe: FullRecipe) => void
}

export function RecipeInfo(props: RecipeInfoProps) {

    const [recipe, setRecipe] = useState<FullRecipe>({
        analyzedInstructions: [],
        extendedIngredients: [],
        id: 0,
        image: "",
        imageType: "",
        instructions: "",
        readyInMinutes: 0,
        servings: 0,
        spoonacularScore: 0,
        summary: "",
        title: ""
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
    const [showModal, setShowModal] = useState(false)

    const getAddToMealPlanButton = () => <JBButton
            variant="primary"
            onClick={() => {
                setShowModal(true)
            }}
        >Add to Meal Plan</JBButton>

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
            <IngredientsTab ingredients={extendedIngredients} getAddToMealPlanButton={getAddToMealPlanButton} /> : 
                currentTab === "Instructions" ?
                <InstructionsTab instructions={instructions} getAddToMealPlanButton={getAddToMealPlanButton} /> :
                ''
        }

        {showModal ? <AddToMealPlan onSubmit={(meal, date) => {
            if (props.onAddToMealPlan !== undefined) {
                props.onAddToMealPlan(meal, date, recipe)
            }
        }}/> : ''}
    </div>
}