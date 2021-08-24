import { useEffect } from 'react'
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/Sweet/Sweet'
import { Splash } from './screens/Splash/Splash'
import { useAppDispatch, useAppSelector } from './index'
import {
    setCompletedOnboarding,
    setPreferences
} from './slices/onboardingPreferences'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Planner } from './screens/planner/Planner'
import { RecipeListsOrSearchFilterSort } from './screens/recipe-book/RecipeListsOrSearchFilterSort/RecipeListsOrSearchFilterSort'
import { RecipeInfo } from './screens/recipe-book/RecipeInfo/RecipeInfo'
import { useAppNavigators } from './util/hooks'

function App() {
    const dispatch = useAppDispatch()

    /** Various effects for transitioning between screens */

    const completedOnboarding = useAppSelector(
        state => state.onboardingPreferences.completedOnboarding
    )

    const location = useLocation()

    const { goToRecipeBook, goToOnboarding } = useAppNavigators()

    useEffect(() => {
        /** if we are on splash screen, go to recipebook or onboarding */
        if (location.pathname === '/') {
            setTimeout(() => {
                if (completedOnboarding) {
                    goToRecipeBook()
                } else {
                    goToOnboarding()
                }
            }, 2000)
        }
    }, [location.pathname, completedOnboarding, goToRecipeBook, goToOnboarding])

    return (
        <div className="app">
            <Switch>
                <Route path="/onboarding">
                    <Onboarding
                        onSubmit={preferences => {
                            dispatch(setPreferences({ preferences }))
                            dispatch(
                                setCompletedOnboarding({
                                    completedOnboarding: true
                                })
                            )
                            goToRecipeBook()
                        }}
                    />
                </Route>

                <Route path="/sweet">
                    <Sweet />
                </Route>

                <Route path={`recipebook/:recipeId`}>
                    {({ match }) => (
                        <RecipeInfo
                            recipeId={parseInt(match!.params.recipeId)}
                        />
                    )}
                </Route>

                <Route path="/recipebook">
                    <RecipeListsOrSearchFilterSort />
                </Route>

                <Route path="/planner">
                    <Planner />
                </Route>

                <Route path="/">
                    <Splash />
                </Route>
            </Switch>
        </div>
    )
}

export default App
