export type SearchFilterListElementProps = {
    /** Whether this list element is active or not. */
    active?: boolean

    /** A callback to be run if this list element is clicked upon. */
    onClick?: () => void

    /** The text to be rendered within this list element. */
    title: string
}

/**
 * A component which renders a button-like list element, intended to be
 * used in SearchFilterList. If props.active is true, the element
 * is colored the main-cta color.
 */
export function SearchFilterListElement(props: SearchFilterListElementProps) {
    const classNames = ['search-filter-list-element']

    if (props.active) {
        classNames.push('search-filter-list-element-active')
    } else {
        classNames.push('search-filter-list-element-inactive')
    }

    return (
        <div className={classNames.join(' ')} onClick={props.onClick}>
            <span>{props.title}</span>
        </div>
    )
}
