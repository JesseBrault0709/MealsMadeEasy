import { useEffect } from 'react'
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/Sweet/Sweet'
import { Splash } from './screens/Splash/Splash'
import { useAppDispatch, useAppSelector } from './index'
import {
    setCompletedOnboarding,
    setPreferences
} from './slices/onboardingPreferences'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { RecipeBook } from './screens/recipe-book/RecipeBook'
import { Planner } from './screens/planner/Planner'

function App() {
    const dispatch = useAppDispatch()

    /** Various effects for transitioning between screens */

    const completedOnboarding = useAppSelector(
        state => state.onboardingPreferences.completedOnboarding
    )

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        /** if we are on splash screen, go to recipebook or onboarding */
        if (location.pathname === '/') {
            setTimeout(() => {
                if (completedOnboarding) {
                    history.push('/recipebook')
                    history.goForward()
                } else {
                    history.push('/onboarding')
                    history.goForward()
                }
            }, 2000)
        }
    }, [location.pathname, completedOnboarding, history])

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
                            history.push('/recipebook')
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
