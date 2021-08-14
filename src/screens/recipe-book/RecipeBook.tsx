import { useAppSelector } from '../..'
import { RecipeInfo } from './RecipeInfo/RecipeInfo'
import { RecipeListsOrSearchFilterSort } from './RecipeListsOrSearchFilterSort/RecipeListsOrSearchFilterSort'

export type RecipeBookScreen = 'RecipeListsOrSearchFilterSort' | 'RecipeInfo'

export function RecipeBook() {
    const { currentScreen, recipeInfoId } = useAppSelector(
        state => state.recipeBook
    )

    switch (currentScreen) {
        case 'RecipeListsOrSearchFilterSort':
            return <RecipeListsOrSearchFilterSort />
        case 'RecipeInfo':
            if (recipeInfoId === undefined) {
                throw new Error(
                    `Cannot show RecipeInfo when recipeInfoId is undefined`
                )
            }
            return <RecipeInfo recipeId={recipeInfoId} />
    }
}
