import { useContext, useEffect } from 'react'
import { Onboarding } from './screens/onboarding/Onboarding'
import { RecipePreferences } from './types/RecipePreferences'
import { Sweet } from './screens/Sweet/Sweet'
import { Splash } from './screens/Splash/Splash'
import { useAppDispatch, useAppSelector } from './index'
import {
    setCompletedOnboarding,
    setPreferences
} from './slices/recipePreferences'
import { fetchRecipes, setActiveList } from './slices/recipeLists'
import { setAppScreen } from './slices/appScreens'
import { Home } from './screens/home/Home'
import { AppConfigContext } from '.'

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

/** The possible screens */
export type AppScreen = 'Splash' | 'Onboarding' | 'Sweet' | 'Home'

function App() {
    const config = useContext(AppConfigContext)

    const dispatch = useAppDispatch()

    /** Various effects for transitioning between screens */

    const currentScreen = useAppSelector(state => state.screens.current)

    const completedOnboarding = useAppSelector(
        state => state.recipePreferences.completedOnboarding
    )

    useEffect(() => {
        if (currentScreen === 'Splash') {
            setTimeout(() => {
                if (!completedOnboarding) {
                    dispatch(setAppScreen({ screen: 'Onboarding' }))
                } else {
                    const firstListName = config.recipeLists[0].name
                    dispatch(setActiveList({ listName: firstListName }))
                    dispatch(fetchRecipes(firstListName))
                    dispatch(setAppScreen({ screen: 'Home' }))
                }
            }, 2000)
        }
    }, [currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentScreen === 'Sweet') {
            const firstListName = config.recipeLists[0].name
            dispatch(setActiveList({ listName: firstListName }))
            dispatch(fetchRecipes(firstListName))
        }
    }, [currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps

    /** Main getScreen function */

    const getScreen = () => {
        if (currentScreen === 'Splash') {
            return <Splash />
        } else if (currentScreen === 'Onboarding') {
            const onOnboardingSubmit = (preferences: RecipePreferences) => {
                dispatch(setPreferences({ preferences }))
                dispatch(setCompletedOnboarding({ completedOnboarding: true }))
                dispatch(setAppScreen({ screen: 'Sweet' }))
            }

            return <Onboarding onSubmit={onOnboardingSubmit} />
        } else if (currentScreen === 'Sweet') {
            return <Sweet />
        } else if (currentScreen === 'Home') {
            return <Home />
        }
    }

    return <div className="app">{getScreen()}</div>
}

export default App
