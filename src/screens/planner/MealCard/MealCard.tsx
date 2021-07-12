import { useState } from 'react'
import './MealCard.css'

import { MealCardMenu, MealCardMenuProps } from './MealCardMenu/MealCardMenu'

export type MealCardProps = {
    variant: "accented" | "normal" | "empty",
    menuPlacement: MealCardMenuProps['variant'],
    title?: string,
    onViewRecipe?: MealCardMenuProps['onViewRecipe'],
    onReplaceRecipe?: MealCardMenuProps['onReplaceRecipe'],
    onRemoveRecipe?: MealCardMenuProps['onRemoveRecipe'],
}

export function MealCard(props: MealCardProps) {
    const [showMenu, setShowMenu] = useState(false)

    const onClick = () => {
        if (props.variant !== "empty") {
            setShowMenu(!showMenu)
        }
    }

    return <div className="meal-card-container">
        <div className={['meal-card', `meal-card-${props.variant}`].join(' ')} onClick={onClick}>
            {props.title}
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