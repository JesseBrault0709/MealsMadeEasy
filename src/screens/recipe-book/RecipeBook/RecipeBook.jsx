/**
 * TODO as of 6/28/21:
 *  * Pull up some of the magic variables
 *      (the getRecipeGetter func, the resultSetSize, etc)
 *      as props
 *  * Incorporate cooking time into the complexSearch
 */

import { useState } from "react"
import { getByComplexSearch } from "../../../client/complexSearch"
import { RecipeInfo } from "../RecipeInfo/RecipeInfo"
import { getRecipeInformation } from "../../../client/recipeInformation"
import { RecipeList } from '../RecipeList/RecipeLists'

const SubScreen = Object.freeze({
    RECIPE_LIST: "Recipe List",
    RECIPE_INFO: "Recipe Info"
})

/**
 * @param {{
 *  recipePreferences: RecipePreferences,
 *  onAddToMealPlan: (recipe: FullRecipe) => void
 * }} props 
 * @returns 
 */
export function RecipeBook(props) {

    const [subScreen, setSubScreen] = useState(SubScreen.RECIPE_LIST)

    const [currentRecipeId, setCurrentRecipeId] = useState()

    const onRecipeCardClick = recipe => {
        setCurrentRecipeId(recipe.id)
        setSubScreen(SubScreen.RECIPE_INFO)
    }

    const getRecipesGetter = type => (offset, limit) => getByComplexSearch({
            addRecipeInformation: true,
            diet: props.diet,
            intolerances: props.intolerances,
            offset,
            number: limit,
            type
        })


    const tabs = [
        {
            name: 'Breakfast',
            getRecipes: getRecipesGetter('breakfast')
        },
        {
            name: 'Lunch',
            getRecipes: getRecipesGetter('main course')
        },
        {
            name: 'Dinner',
            getRecipes: getRecipesGetter('main course')
        }
    ]

    if (subScreen === SubScreen.RECIPE_LIST) {
        
        return <RecipeList 
            cookingTime={props.recipePreferences.cookingTime}
            diet={props.recipePreferences.diet} 
            intolerances={props.recipePreferences.intolerances}
            
            recipeResultSetSize={6}
            onRecipeCardClick={onRecipeCardClick}

            tabs={tabs}
        />

    } else if (subScreen === SubScreen.RECIPE_INFO) {

        return <RecipeInfo 
                    getRecipe={() => {
                        return getRecipeInformation(currentRecipeId)
                    }}
                    onBackButtonClick={() => {
                        console.log('hello world')
                        setSubScreen(SubScreen.RECIPE_LIST)
                    }}
                    onAddToMealPlan={props.onAddToMealPlan}
        />

    } else {
        throw new Error("unknown value for listOrInfo")
    }
}