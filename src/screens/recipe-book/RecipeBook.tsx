import { useAppSelector } from '../..'
import { RecipeInfo } from './RecipeInfo/RecipeInfo'
import { RecipeListsOrSearchFilterSort } from './RecipeListsOrSearchFilterSort/RecipeListsOrSearchFilterSort'

/**
 * The possible values for state.recipeBook.currentScreen
 */
export type RecipeBookScreen = 'RecipeListsOrSearchFilterSort' | 'RecipeInfo'

/**
 * The main RecipeBook component. Depending on the value
 * of state.recipeBook.currentScreen, returns either
 * RecipeListsOrSearchFilterSort or RecipeInfo.
 */
export function RecipeBook() {
    const {
        /** The current screen to show */
        currentScreen,

        /**
         * The id number of the recipe to show in
         * a RecipeInfo instance if the currentScreen
         * is 'RecipeInfo'.
         */
        recipeInfoId
    } = useAppSelector(state => state.recipeBook)

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
