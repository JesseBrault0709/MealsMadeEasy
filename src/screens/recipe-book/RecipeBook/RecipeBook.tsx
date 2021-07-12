/**
 * TODO as of 6/28/21:
 *  * Pull up some of the magic variables
 *      (the getRecipeGetter func, the resultSetSize, etc)
 *      as props
 */

import { RecipeInfo } from "../RecipeInfo/RecipeInfo"
import { RecipeLists } from '../RecipeLists/RecipeLists'
import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { RecipeOverview } from "../../../client/RecipeOverview"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { setRecipeBookScreen } from "../../../slices/recipeBook"
import { fetchFullRecipe } from "../../../slices/recipeInfo"

export type RecipeBookScreen = "Recipe List" | "Recipe Info"

export function RecipeBook() {

    const dispatch = useAppDispatch()

    const currentScreen = useAppSelector(state => state.recipeBook.currentScreen)
    const onRecipeCardClick = (recipe: RecipeOverview) => {
        dispatch(fetchFullRecipe(recipe))
        dispatch(setRecipeBookScreen({ screen: "Recipe Info" }))
    }

    if (currentScreen === "Recipe List") {
        
        return <ScreenWithTitleAndNav title="Recipe Book">
            <RecipeLists
                onRecipeCardClick={onRecipeCardClick}
            />
        </ScreenWithTitleAndNav>


    } else if (currentScreen === "Recipe Info") {

        return <ScreenWithTitleAndNav 
                title=""
                onBackButtonClick={() => {
                    dispatch(setRecipeBookScreen({ screen: 'Recipe List' }))
                }}
            >
                <RecipeInfo />
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("unknown value for currentScreen")
    }
}