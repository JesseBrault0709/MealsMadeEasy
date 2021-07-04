import { RecipeOverview } from '../../../client/RecipeOverview'
import './MealCard.css'

export type MealCardProps = {
    variant: "accented" | "normal" | "empty"
    title?: string,
    onRecipeSelect?: () => void
}

export function MealCard(props: MealCardProps) {
    return <div className={['meal-card', `meal-card-${props.variant}`].join(' ')} onClick={props.onRecipeSelect}>
        {props.title}
    </div>
}