/**
 * TODO as of 6/28/21:
 *  * Pull up some of the magic variables
 *      (the getRecipeGetter func, the resultSetSize, etc)
 *      as props
 */

import { RecipeInfo } from "../RecipeInfo/RecipeInfo"
import { RecipeLists } from '../RecipeLists/RecipeLists'
import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { NavBarButton } from "../../common/NavBar/NavBar"
import { RecipeOverview } from "../../../client/RecipeOverview"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { setRecipeBookScreen } from "../../../slices/recipeBook"
import { fetchFullRecipe } from "../../../slices/recipeInfo"

export type RecipeBookScreen = "Recipe List" | "Recipe Info"

export type RecipeBookProps = {

}

export function RecipeBook(props: RecipeBookProps) {

    const dispatch = useAppDispatch()

    const currentScreen = useAppSelector(state => state.recipeBook.currentScreen)
    const onRecipeCardClick = (recipe: RecipeOverview) => {
        dispatch(fetchFullRecipe(recipe))
        dispatch(setRecipeBookScreen({ screen: "Recipe Info" }))
    }

    const onNavButtonClick = () => { }

    if (currentScreen === "Recipe List") {
        
        return <ScreenWithTitleAndNav title="Recipe Book" activeButton={NavBarButton.RECIPE_BOOK} onNavButtonClick={onNavButtonClick}>
            <RecipeLists
                onRecipeCardClick={onRecipeCardClick}
            />
        </ScreenWithTitleAndNav>


    } else if (currentScreen === "Recipe Info") {

        return <ScreenWithTitleAndNav title="" activeButton={NavBarButton.RECIPE_BOOK} onNavButtonClick={onNavButtonClick}>
            <RecipeInfo 
                onAddToMealPlan={() => { }}
            />
        </ScreenWithTitleAndNav>

    } else {
        throw new Error("unknown value for currentScreen")
    }
}