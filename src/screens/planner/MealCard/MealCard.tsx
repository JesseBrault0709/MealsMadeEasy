import { RecipeOverview } from '../../../client/RecipeOverview'
import { useFullRecipe } from '../../../slices/fullRecipes'
// import './MealCard.css'

import { MealCardMenu, MealCardMenuProps } from './MealCardMenu/MealCardMenu'

export function EmptyMealCard() {
    return <div className="meal-card-container">
        <div className="meal-card meal-card-empty" />
    </div>
}

export type MealCardProps = {
    variant: "accented" | "normal",
    menuPlacement: MealCardMenuProps['variant'],

    recipeId: RecipeOverview['id'],

    onViewRecipe: MealCardMenuProps['onViewRecipe'],
    onReplaceRecipe: MealCardMenuProps['onReplaceRecipe'],
    onRemoveRecipe: MealCardMenuProps['onRemoveRecipe'],

    showMenu: boolean

    onClick: () => void
}

export function MealCard(props: MealCardProps) {

    const { recipe, fetchStatus, fetchError } = useFullRecipe(props.recipeId)

    // calc classname

    const className = ['meal-card', `meal-card-${props.variant}`].join(' ')

    // variations based on fetchStatus

    const getFetching = () => <div className={className}>
        Loading...
    </div>

    const getIdle = () => {

        if (recipe === undefined) {
            return null
        }

        return <>
            <div className={className} onClick={() => props.onClick()}>
                {recipe.title}
            </div>
    
            <MealCardMenu
                show={props.showMenu}
                variant={props.menuPlacement}
    
                onViewRecipe={props.onViewRecipe}
                onReplaceRecipe={props.onReplaceRecipe}
                onRemoveRecipe={props.onRemoveRecipe}
            />
        </>
    } 

    const getError = () => <div className={className}>
        Error: {fetchError?.message}
    </div>

    const getCard = () => {
        switch (fetchStatus) {
            case 'idle': return getIdle()
            case 'fetching': return getFetching()
            case 'error': return getError()
        }
    }

    return <div className="meal-card-container">
        {getCard()}
    </div>
}