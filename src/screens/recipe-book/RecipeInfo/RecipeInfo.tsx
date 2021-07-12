import './RecipeInfo.css'

import { useState } from 'react'
import { TimeServingsRating } from './TimeServingsRating/TimeServingsRating'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { IngredientsTab } from './IngredientsTab/IngredientsTab'
import { InstructionsTab } from './InstructionsTab/InstructionsTab'
import { JBButton } from '../../../inputs/Button/JBButton'
import { AddToMealPlan } from '../../addToMealPlan/AddToMealPlan'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { LoadingCircle } from '../../common/LoadingCircle/LoadingCircle'
import { addRecipeToMealPlan, replaceRecipeInMealPlan } from '../../../slices/dayMealPlans'
import { setHomeScreen } from '../../../slices/homeScreens'
import { setToAddMode } from '../../../slices/selectionMode'
import { ReplaceRecipeModal } from './ReplaceModal/ReplaceModal'

export function RecipeInfo() {

    const dispatch = useAppDispatch()

    const selectionMode = useAppSelector(state => state.selectionMode.mode)
    const selectionTarget = useAppSelector(state => state.selectionMode.target)

    const status = useAppSelector(state => state.recipeInfo.status)
    const recipe = useAppSelector(state => state.recipeInfo.recipe)
    const error = useAppSelector(state => state.recipeInfo.error)

    const [currentTab, setCurrentTab] = useState<'Ingredients' | 'Instructions'>('Ingredients')
    const [showAddModal, setShowAddModal] = useState(false)
    const [showReplaceModal, setShowReplaceModal] = useState(false)

    const getScreen = () => {
        if (status === 'empty') {
            return null
        } else if (status === 'fetching') {
            return <div className="recipe-info-loading-circle">
                <LoadingCircle />
            </div>
        } else if (status === 'success') {

            if (recipe === undefined) {
                throw new Error(`status is 'success' but recipe is undefined`)
            }

            const rating = recipe.spoonacularScore !== undefined && recipe.spoonacularScore !== null ? 
                Math.floor(recipe.spoonacularScore / 20) : 0

            const getAddToMealPlanButton = () => <JBButton
                variant="primary"
                onClick={() => {
                    if (selectionMode === 'add') {
                        setShowAddModal(true)
                    } else {
                        setShowReplaceModal(true)
                    }
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
                        <InstructionsTab recipe={recipe} getAddToMealPlanButton={getAddToMealPlanButton} /> :
                        ''
                }

                {
                    showAddModal ? 
                        <AddToMealPlan 
                            onSubmit={(meal, date) => {
                                setShowAddModal(false)
                                dispatch(addRecipeToMealPlan({
                                    date,
                                    mealName: meal,
                                    recipe
                                }))
                                dispatch(setHomeScreen({ screen: 'Planner' }))
                            }}
                            onCancel={() => setShowAddModal(false)}
                        /> : ''
                }

                {
                    showReplaceModal ?
                        <ReplaceRecipeModal
                            targetDate={selectionTarget!.date}
                            targetMeal={selectionTarget!.meal}

                            oldRecipeTitle={selectionTarget!.recipe.title}
                            newRecipeTitle={recipe.title}

                            onCancel={() => setShowReplaceModal(false)}
                            onSubmit={() => {
                                if (selectionTarget !== undefined) {
                                    dispatch(replaceRecipeInMealPlan({
                                        forDate: selectionTarget.date,
                                        forMealName: selectionTarget.meal,
                                        oldRecipe: selectionTarget.recipe,
                                        newRecipe: recipe
                                    }))
                                    dispatch(setToAddMode({ mode: 'add' }))
                                    setShowReplaceModal(false)
                                } else {
                                    throw new Error(`we are in replace mode but selectionTarget is undefined`)
                                }
                            }}
                        /> : ''
                }

            </>
        } else if (status === 'error') {
            return `error: ${error?.message}`
        }

    }

    return <div className="recipe-info">
        {getScreen()}
    </div>
}