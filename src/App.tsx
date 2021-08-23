import { useEffect } from 'react'
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/Sweet/Sweet'
import { Splash } from './screens/Splash/Splash'
import { useAppDispatch, useAppSelector } from './index'
import {
    setCompletedOnboarding,
    setPreferences
} from './slices/onboardingPreferences'
import { fetchRecipes } from './slices/recipeLists'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { RecipeBook } from './screens/recipe-book/RecipeBook'
import { Planner } from './screens/planner/Planner'

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

function App() {
    const dispatch = useAppDispatch()

    /** Various effects for transitioning between screens */

    const completedOnboarding = useAppSelector(
        state => state.onboardingPreferences.completedOnboarding
    )

    const fetchStatus = useAppSelector(state => state.recipeLists.fetchStatus)

    const history = useHistory()
    const location = useLocation()

    const activeRecipeList = useAppSelector(
        state => state.recipeLists.activeList
    )

    useEffect(() => {
        if (location.pathname === '/') {
            // i.e., splash screen
            setTimeout(() => {
                if (!completedOnboarding) {
                    history.push('/onboarding')
                    history.goForward()
                } else {
                    if (activeRecipeList === undefined) {
                        throw new Error('activeRecipeList is undefined')
                    }
                    dispatch(fetchRecipes(activeRecipeList))
                    history.push('/recipebook')
                    history.goForward()
                }
            }, 2000)
        } else if (location.pathname === '/sweet') {
            if (fetchStatus === 'idle') {
                if (activeRecipeList === undefined) {
                    throw new Error('activeRecipeList is undefined')
                }
                dispatch(fetchRecipes(activeRecipeList))
            } else if (fetchStatus === 'success') {
                history.push('/recipebook')
                history.goForward()
            }
        }
    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

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
                            history.push('/sweet')
                            history.goForward()
                        }}
                    />
                </Route>

                <Route path="/sweet">
                    <Sweet />
                </Route>

                <Route path="/recipebook">
                    <RecipeBook />
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
