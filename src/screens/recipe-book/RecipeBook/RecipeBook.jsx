import { useEffect, useState } from "react"
import { getByComplexSearch } from "../../../client/complexSearch"
import { RecipeInfo } from "../RecipeInfo/RecipeInfo"
import { getRecipeInformation } from "../../../client/recipeInformation"
import { RecipeList } from '../RecipeList/RecipeList'

const SubScreen = Object.freeze({
    RECIPE_LIST: "Recipe List",
    RECIPE_INFO: "Recipe Info"
})

/**
 * Props:
 *  cookingTime: string
 *  diet: SPDiet
 *  intolerances: readonly SPIntolerance[]
 */
export function RecipeBook(props) {

    const [subScreen, setSubScreen] = useState(SubScreen.RECIPE_LIST)

    const [currentRecipeId, setCurrentRecipeId] = useState()

    const onRecipeCardClick = recipe => {
        setCurrentRecipeId(recipe.id)
        setSubScreen(SubScreen.RECIPE_INFO)
    }

    const getRecipesGetter = type => () => getByComplexSearch({
            addRecipeInformation: true,
            diet: props.diet,
            intolerances: props.intolerances,
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
            cookingTime={props.cookingTime}
            diet={props.diet} 
            intolerances={props.intolerances}
            
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
        />

    } else {
        throw new Error("unknown value for listOrInfo")
    }
}