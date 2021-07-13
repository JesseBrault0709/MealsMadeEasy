import { useEffect, useState } from 'react'
import { getRecipeInformation } from '../../../client/recipeInformation'
import { RecipeOverview } from '../../../client/RecipeOverview'
import './MealCard.css'

import { MealCardMenu, MealCardMenuProps } from './MealCardMenu/MealCardMenu'

export type MealCardProps = {
    variant: "accented" | "normal" | "empty",
    menuPlacement: MealCardMenuProps['variant'],

    recipeId?: RecipeOverview['id'],

    onViewRecipe?: MealCardMenuProps['onViewRecipe'],
    onReplaceRecipe?: MealCardMenuProps['onReplaceRecipe'],
    onRemoveRecipe?: MealCardMenuProps['onRemoveRecipe'],
}

export function MealCard(props: MealCardProps) {

    const [showMenu, setShowMenu] = useState(false)
    const [recipe, setRecipe] = useState<RecipeOverview>()

    useEffect(() => {
        if (props.recipeId !== undefined) {
            getRecipeInformation(props.recipeId)
            .then(recipe => {
                setRecipe(recipe)
            })
        }
    }, [props.recipeId])

    const onClick = () => {
        if (props.variant !== "empty") {
            setShowMenu(!showMenu)
        }
    }

    return <div className="meal-card-container">
        <div className={['meal-card', `meal-card-${props.variant}`].join(' ')} onClick={onClick}>
            {recipe?.title}
        </div>
        <MealCardMenu 
            show={showMenu}
            variant={props.menuPlacement}

            onViewRecipe={props.onViewRecipe}
            onReplaceRecipe={props.onReplaceRecipe}
            onRemoveRecipe={props.onRemoveRecipe}
        />
    </div>
}