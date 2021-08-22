import { useContext, useEffect } from 'react'
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/Sweet/Sweet'
import { Splash } from './screens/Splash/Splash'
import { useAppDispatch, useAppSelector } from './index'
import {
    setCompletedOnboarding,
    setPreferences
} from './slices/onboardingPreferences'
import {
    clearFetchStatus,
    fetchRecipes,
    setActiveList
} from './slices/recipeLists'
import { Home } from './screens/home/Home'
import { AppConfigContext } from '.'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

function App() {
    const config = useContext(AppConfigContext)

    const dispatch = useAppDispatch()

    /** Various effects for transitioning between screens */

    const completedOnboarding = useAppSelector(
        state => state.onboardingPreferences.completedOnboarding
    )

    const fetchStatus = useAppSelector(state => state.recipeLists.fetchStatus)

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            // i.e., splash screen
            setTimeout(() => {
                if (!completedOnboarding) {
                    history.push('/onboarding')
                    history.goForward()
                } else {
                    const firstListName = config.recipeLists[0].name
                    dispatch(setActiveList({ listName: firstListName }))
                    dispatch(fetchRecipes(firstListName))
                    history.push('/home')
                    history.goForward()
                }
            }, 2000)
        } else if (location.pathname === '/sweet') {
            if (fetchStatus === 'idle') {
                const firstListName = config.recipeLists[0].name
                dispatch(setActiveList({ listName: firstListName }))
                dispatch(fetchRecipes(firstListName))
            } else if (fetchStatus === 'success') {
                dispatch(clearFetchStatus())
                history.push('/home')
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

                <Route path="/home">
                    <Home />
                </Route>

                <Route path="/">
                    <Splash />
                </Route>
            </Switch>
        </div>
    )
}

export default App
