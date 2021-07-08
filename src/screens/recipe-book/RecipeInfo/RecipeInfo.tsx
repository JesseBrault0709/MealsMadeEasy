import './RecipeInfo.css'

import { useState } from 'react'
import { FullRecipe } from '../../../client/FullRecipe'
import { TimeServingsRating } from './TimeServingsRating/TimeServingsRating'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { IngredientsTab } from './IngredientsTab/IngredientsTab'
import { InstructionsTab } from './InstructionsTab/InstructionsTab'
import { JBButton } from '../../../inputs/Button/JBButton'
import { AddToMealPlan } from '../../addToMealPlan/AddToMealPlan'
import { MealName } from '../../../types/MealName'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { LoadingCircle } from '../../common/LoadingCircle/LoadingCircle'
import { addRecipeToMealPlan } from '../../../slices/dayMealPlans'
import { setHomeScreen } from '../../../slices/homeScreens'

export type RecipeInfoProps = {
    onAddToMealPlan?: (meal: MealName, date: Date, recipe: FullRecipe) => void
}

export function RecipeInfo(props: RecipeInfoProps) {

    const dispatch = useAppDispatch()

    const status = useAppSelector(state => state.recipeInfo.status)
    const recipe = useAppSelector(state => state.recipeInfo.recipe)
    const error = useAppSelector(state => state.recipeInfo.error)

    const [currentTab, setCurrentTab] = useState<'Ingredients' | 'Instructions'>('Ingredients')
    const [showModal, setShowModal] = useState<boolean>(false)

    const getScreen = () => {
        if (status === 'empty') {
            return null
        } else if (status === 'fetching') {
            return <LoadingCircle />
        } else if (status === 'success') {

            if (recipe === undefined) {
                throw new Error(`status is 'success' but recipe is undefined`)
            }

            const rating = recipe.spoonacularScore !== undefined && recipe.spoonacularScore !== null ? 
                Math.floor(recipe.spoonacularScore / 20) : 0

            const getAddToMealPlanButton = () => <JBButton
                variant="primary"
                onClick={() => {
                    setShowModal(true)
                }}
            >Add to Meal Plan</JBButton>

            return <>
                <h2 className="recipe-title">{recipe.title}</h2>

                <TimeServingsRating time={recipe.readyInMinutes} servings={recipe.servings} rating={rating} />

                <img className="recipe-image" src={recipe.image} alt="Recipe" />

                <Tabs>
                    <Tab active={currentTab === "Ingredients"} onClick={() => setCurrentTab("Ingredients")}>Ingredients</Tab>
                    <Tab active={currentTab === "Instructions"} onClick={() => setCurrentTab("Instructions")}>Instructions</Tab>
                </Tabs>

                {
                    currentTab === "Ingredients" ? 
                    <IngredientsTab ingredients={recipe.extendedIngredients} getAddToMealPlanButton={getAddToMealPlanButton} /> : 
                        currentTab === "Instructions" ?
                        <InstructionsTab instructions={recipe.instructions} getAddToMealPlanButton={getAddToMealPlanButton} /> :
                        ''
                }

                {showModal ? <AddToMealPlan onSubmit={(meal, date) => {
                    setShowModal(false)
                    dispatch(addRecipeToMealPlan({
                        date,
                        mealName: meal,
                        recipe
                    }))
                    dispatch(setHomeScreen({ screen: 'Planner' }))
                }}/> : ''}

            </>
        } else if (status === 'error') {
            return `error: ${error?.message}`
        }

    }

    return <div className="recipe-info">
        {getScreen()}
    </div>
}