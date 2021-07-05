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
import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { NavBarButton } from "../../common/NavBar/NavBar"
import { RecipePreferences } from "../../../types/RecipePreferences"
import { RecipeOverview } from "../../../client/RecipeOverview"
import { SPType } from "../../../client/spoonacularTypes"
import { FullRecipe } from "../../../client/FullRecipe"
import { MealName } from "../../../types/MealName"

export type SubScreen = "Recipe List" | "Recipe Info"

export type RecipeBookProps = {
    recipePreferences: RecipePreferences,
    onNavAway?: (button: NavBarButton) => void,
    onAddToMealPlan?: (meal: MealName, date: Date, recipe: FullRecipe) => void,

    initialSubScreen?: SubScreen,
    initialRecipeId?: RecipeOverview['id']
}

export function RecipeBook(props: RecipeBookProps) {

    const [subScreen, setSubScreen] = useState<SubScreen>(props.initialSubScreen ?? "Recipe List")

    const [currentRecipeId, setCurrentRecipeId] = useState<RecipeOverview['id']>(props.initialRecipeId ?? 0) // TODO

    const onRecipeCardClick = (recipe: RecipeOverview) => {
        setCurrentRecipeId(recipe.id)
        setSubScreen("Recipe Info")
    }

    const getRecipesGetter = (type: SPType) => (offset: number, limit: number) => getByComplexSearch({
            addRecipeInformation: true,
            maxReadyTime: props.recipePreferences.cookingTime === "No Limit" ? undefined : props.recipePreferences.cookingTime,
            diet: props.recipePreferences.diet,
            intolerances: props.recipePreferences.intolerances,
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

    const onNavButtonClick = (button: NavBarButton) => {
        if (button === NavBarButton.RECIPE_BOOK) {
            if (subScreen === "Recipe Info") {
                setSubScreen("Recipe List")
            }
        } else if (props.onNavAway !== undefined) {
            props.onNavAway(button)
        }
    }

    if (subScreen === "Recipe List") {
        
        return <ScreenWithTitleAndNav title="Recipe Book" activeButton={NavBarButton.RECIPE_BOOK} onNavButtonClick={onNavButtonClick}>
            <RecipeList 
                cookingTime={props.recipePreferences.cookingTime}
                diet={props.recipePreferences.diet} 
                intolerances={props.recipePreferences.intolerances}
            
                recipeResultSetSize={6}
                onRecipeCardClick={onRecipeCardClick}

                tabs={tabs}
            />
        </ScreenWithTitleAndNav>


    } else if (subScreen === "Recipe Info") {

        return <ScreenWithTitleAndNav title="" activeButton={NavBarButton.RECIPE_BOOK} onNavButtonClick={onNavButtonClick}>
            <RecipeInfo 
                getRecipe={() => {
                    return getRecipeInformation(currentRecipeId as number)
                }}
                onAddToMealPlan={props.onAddToMealPlan}
            />
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("unknown value for listOrInfo")
    }
}