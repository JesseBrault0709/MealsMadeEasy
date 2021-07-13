import { useState } from 'react'
import { RecipeOverview } from '../../../client/RecipeOverview'
import { useFullRecipe } from '../../../slices/fullRecipes'
import './MealCard.css'

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
}

export function MealCard(props: MealCardProps) {

    const { recipe, fetchStatus, fetchError } = useFullRecipe(props.recipeId)

    const [showMenu, setShowMenu] = useState(false)

    // calc classname

    const className = ['meal-card', `meal-card-${props.variant}`].join(' ')

    // variations based on fetchStatus

    const getFetching = () => <div className={className}>
        Loading...
    </div>

    const getSuccess = () => {

        if (recipe === undefined) {
            throw new Error(`trying to getSuccess but recipe is undefined`)
        }

        return <>
            <div className={className} onClick={() => setShowMenu(!showMenu)}>
                {recipe.title}
            </div>
    
            <MealCardMenu
                show={showMenu}
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
            case 'idle': return null
            case 'fetching': return getFetching()
            case 'success': return getSuccess()
            case 'error': return getError()
        }
    }

    return <div className="meal-card-container">
        {getCard()}
    </div>
}