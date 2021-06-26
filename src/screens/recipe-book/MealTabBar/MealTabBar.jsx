import './MealTabBar.css'

/**
 * @param {{
 *  tabs: ReadonlyArray<{ // the tabs in this bar
 *      name: string, // the name of the tab
 *      type: SPType, // the Spoonacular type this tab represents
 *      onClick?: () => void // a callback for when the tab is clicked
 *  }>
 * }} props
 */
export function MealTabBar(props) {
    return <div className="meal-tab-bar">
        {
            props.tabs.map(({ name, onClick }) => <button type="button" onClick={onClick}>{name}</button>)
        }
    </div>
}