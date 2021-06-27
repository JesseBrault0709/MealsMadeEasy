import './MealTabBar.css'
import { Button } from 'react-bootstrap'

/**
 * Props:
 *  tabs: string[]
 *  activeTab: number
 *  onClick: (tabIndex: number) => void
 */
export function MealTabBar({ tabs, activeTab, onClick }) {
    return <div className="meal-tab-bar">
        {
            tabs.map((tab, index) => {
                if (activeTab === index) {
                    return <Button active onClick={() => onClick(index)}>{tab}</Button>
                } else {
                    return <Button onClick={() => onClick(index)}>{tab}</Button>
                }
            })
        }
    </div>
}