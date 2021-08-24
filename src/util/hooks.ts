import { useHistory } from 'react-router-dom'

export type AppNavigators = {
    goToSplash: () => void
    goToOnboarding: () => void
    goToRecipeBook: () => void
    goToRecipeInfo: (recipeId: number) => void
    goToPlanner: () => void
}

export const useAppNavigators = (): AppNavigators => {
    const history = useHistory()

    const goTo = (path: string) => {
        history.push(path)
        history.goForward()
    }

    return {
        goToSplash: () => goTo('/'),
        goToOnboarding: () => goTo('/onboarding'),
        goToRecipeBook: () => goTo('/recipebook'),
        goToRecipeInfo: recipeId => goTo(`/recipebook/${recipeId}`),
        goToPlanner: () => goTo('/planner')
    }
}
