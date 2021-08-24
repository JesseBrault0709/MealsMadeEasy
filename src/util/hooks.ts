import { useHistory } from 'react-router-dom'

export type AppNavigators = {
    goTo: (path: string) => void
    goToSplash: () => void
    goToOnboarding: () => void
    goToRecipeBook: () => void
    goToRecipeInfo: (recipeId: number) => void
    goToPlanner: () => void
}

export const useAppNavigators = (): AppNavigators => {
    const history = useHistory()

    const goTo: AppNavigators['goTo'] = path => {
        history.push(path)
        history.goForward()
    }

    return {
        goTo,
        goToSplash: () => goTo('/'),
        goToOnboarding: () => goTo('/onboarding'),
        goToRecipeBook: () => goTo('/recipebook'),
        goToRecipeInfo: recipeId => goTo(`/recipebook/${recipeId}`),
        goToPlanner: () => goTo('/planner')
    }
}
