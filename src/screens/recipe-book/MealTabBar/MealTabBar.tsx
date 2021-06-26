import { SPType } from '../../../client/spoonacularTypes'
import './MealTabBar.css'

export type MealTabBarProps = {
    tabs: ReadonlyArray<{
        name: string,
        type: SPType,
        onClick?: () => void
    }>
}

export function MealTabBar(props: MealTabBarProps) {
    return <div className="meal-tab-bar">
        {
            props.tabs.map(({ name, onClick }) => <button type="button" onClick={onClick}>{name}</button>)
        }
    </div>
}