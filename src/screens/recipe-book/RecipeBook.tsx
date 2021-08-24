import { Route, Switch, useRouteMatch } from 'react-router-dom'
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
    const match = useRouteMatch()

    return (
        <Switch>
            <Route path={`${match.path}/:recipeId`}>
                {({ match }) => (
                    <RecipeInfo recipeId={parseInt(match!.params.recipeId)} />
                )}
            </Route>

            <Route path={match.path}>
                <RecipeListsOrSearchFilterSort />
            </Route>
        </Switch>
    )
}
