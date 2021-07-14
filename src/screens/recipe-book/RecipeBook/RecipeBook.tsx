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
import { useAppDispatch, useAppSelector } from "../../../index"
import { setRecipeBookScreen, setRecipeInfoId } from "../../../slices/recipeBook"

export type RecipeBookScreen = "Recipe List" | "Recipe Info"

export function RecipeBook() {

    const dispatch = useAppDispatch()

    const currentScreen = useAppSelector(state => state.recipeBook.currentScreen)
    const recipeInfoId = useAppSelector(state => state.recipeBook.recipeInfoId)
    
    const onRecipeCardClick = (recipe: RecipeOverview) => {
        dispatch(setRecipeInfoId({ id: recipe.id }))
        dispatch(setRecipeBookScreen({ screen: "Recipe Info" }))
    }

    if (currentScreen === "Recipe List") {
        
        return <ScreenWithTitleAndNav title="Recipe Book">
            <RecipeLists
                onRecipeCardClick={onRecipeCardClick}
            />
        </ScreenWithTitleAndNav>


    } else if (currentScreen === "Recipe Info") {

        if (recipeInfoId === undefined) {
            throw new Error(`current screen is 'Recipe Info' but recipeInfoId is undefined`)
        }

        return <ScreenWithTitleAndNav 
                title=""
                onBackButtonClick={() => {
                    dispatch(setRecipeBookScreen({ screen: 'Recipe List' }))
                }}
            >
                <RecipeInfo recipeId={recipeInfoId} />
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("unknown value for currentScreen")
    }
}