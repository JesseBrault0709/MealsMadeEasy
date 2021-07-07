import './MealCardMenu.css'

import Replace from './assets/Replace.png'
import Remove from './assets/Remove.png'
import Move from './assets/Move.png'
import Share from './assets/Share.png'

export type MealCardMenuProps = {
    show?: boolean
    variant: "left" | "right",
    onViewRecipe: () => void
}

export function MealCardMenu(props: MealCardMenuProps) {
    if (props.show) {
        return <div className={`meal-card-menu meal-card-menu-${props.variant}`}>
            <div className="menu-item" onClick={props.onViewRecipe}>
                View
            </div>
            <div className="menu-item">
                <span>Replace</span>
                <img src={Replace} alt="" />
            </div>
            <div className="menu-item">
                <span>Remove</span>
                <img src={Remove} alt="" />
            </div>
            <div className="menu-item menu-item-disabled">
                <span>Move</span>
                <img src={Move} />
            </div>
            <div className="menu-item menu-item-disabled">
                <span>Share</span>
                <img src={Share} />
            </div>
        </div>
    } else {
        return null
    }
}