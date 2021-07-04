/**
 * TODO as of 6/28/21:
 *  [none]
 */
import './Tabs.css'

/**
 * @param {{
 *  onClick: () => void
 *  active: boolean
 *  children: React.ReactNode
 * }} props 
 */
export function Tab(props) {

    const classNames = ['tab']

    if (props.active) {
        classNames.push('active')
    }

    return <div className={classNames.join(" ")} onClick={props.onClick}>
        {props.children}
    </div>
}

/**
 * @param {{
 *  children: React.ReactNode
 * }} props 
 */
export function Tabs(props) {
    return <div className="tabs">
        {props.children}
    </div>
}