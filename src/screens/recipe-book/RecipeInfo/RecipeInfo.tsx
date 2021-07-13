import './RecipeInfo.css'

import { useEffect, useState } from 'react'
import { TimeServingsRating } from './TimeServingsRating/TimeServingsRating'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { IngredientsTab } from './IngredientsTab/IngredientsTab'
import { InstructionsTab } from './InstructionsTab/InstructionsTab'
import { JBButton } from '../../../inputs/Button/JBButton'
import { AddToMealPlan } from '../../addToMealPlan/AddToMealPlan'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { LoadingCircle } from '../../common/LoadingCircle/LoadingCircle'
import { addRecipeToMealPlan, replaceSelectionInMealPlan } from '../../../slices/dayMealPlans'
import { setToAddMode } from '../../../slices/selectionMode'
import { ReplaceRecipeModal } from './ReplaceModal/ReplaceModal'
import { AddedModal } from './AddedModal/AddedModal'
import { useFullRecipe } from '../../../slices/fullRecipes'

export type RecipeInfoProps = {
    recipeId: number
}

export function RecipeInfo(props: RecipeInfoProps) {

    const dispatch = useAppDispatch()

    const { recipe, fetchStatus, fetchError } = useFullRecipe(props.recipeId)

    const selectionMode = useAppSelector(state => state.selectionMode.mode)
    const selectionTarget = useAppSelector(state => state.selectionMode.target)

    // const status = useAppSelector(state => state.recipeInfo.status)
    // const recipe = useAppSelector(state => state.recipeInfo.recipe)
    // const error = useAppSelector(state => state.recipeInfo.error)

    const [currentTab, setCurrentTab] = useState<'Ingredients' | 'Instructions'>('Ingredients')
    
    const [showAddModal, setShowAddModal] = useState(false)
    const [showReplaceModal, setShowReplaceModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    useEffect(() => {
        if (showSuccessModal) {
            setTimeout(() => {
                setShowSuccessModal(false)
            }, 1500)
        }
    }, [showSuccessModal])



    // Modals

    const getAddModal = () => {

        if (recipe === undefined) {
            throw new Error('trying to getAddModal but recipe is undefined')
        }

        return showAddModal ? 
            <AddToMealPlan 
                onSubmit={(meal, date) => {
                    setShowAddModal(false)
                    dispatch(addRecipeToMealPlan({
                        targetDate: date,
                        targetMeal: meal,
                        recipe
                    }))
                    // dispatch(setHomeScreen({ screen: 'Planner' }))
                    setShowSuccessModal(true)
                }}
                onCancel={() => setShowAddModal(false)}
            /> : null
    }

    const getReplaceModal = () => {

        if (recipe === undefined) {
            throw new Error(`trying to getReplaceModal but recipe is undefined`)
        }

        return showReplaceModal ?
            <ReplaceRecipeModal
                targetDate={selectionTarget!.date}
                targetMeal={selectionTarget!.meal}

                oldRecipeId={selectionTarget!.selection.recipeId}
                newRecipeTitle={recipe.title}

                onCancel={() => setShowReplaceModal(false)}
                onSubmit={() => {
                    if (selectionTarget !== undefined) {
                        dispatch(replaceSelectionInMealPlan({
                            targetDate: selectionTarget.date,
                            targetMealName: selectionTarget.meal,
                            targetSelection: selectionTarget.selection,
                            newRecipe: recipe
                        }))
                        dispatch(setToAddMode({ mode: 'add' }))
                        setShowReplaceModal(false)
                    } else {
                        throw new Error(`we are in replace mode but selectionTarget is undefined`)
                    }
                }}
            /> : null

    }

    const getSuccessModal = () => showSuccessModal ? <AddedModal /> : null



    // Screens

    const getFetchingScreen = () => {
        return <div className="recipe-info-loading-circle">
            <LoadingCircle />
        </div>
    }

    const getSuccessScreen = () => {
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

            {getAddModal()}
            {getReplaceModal()}
            {getSuccessModal()}

        </>
    }

    const getErrorScreen = () => {

        if (fetchError === undefined) {
            throw new Error('trying to getErrorScreen but fetchError is undefined')
        }

        return `error: ${fetchError.message}`
    }


    // main getScreen function

    const getScreen = () => {
        
        switch (fetchStatus) {
            case 'idle': return null
            case 'fetching': return getFetchingScreen()
            case 'success': return getSuccessScreen()
            case 'error': return getErrorScreen()
        }

    }

    return <div className="recipe-info">
        {getScreen()}
    </div>
}