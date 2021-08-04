export type SearchFilterListElementProps = {
    active?: boolean
    onClick?: () => void
    title: string
}

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
