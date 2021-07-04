import './MealCard.css'

export type MealCardProps = {
    variant: "accented" | "normal" | "empty"
    title?: string,
}

export function MealCard(props: MealCardProps) {
    return <div className={['meal-card', `meal-card-${props.variant}`].join(' ')}>
        {props.title}
    </div>
}