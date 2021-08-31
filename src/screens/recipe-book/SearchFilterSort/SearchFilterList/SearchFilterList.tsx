import { ReactNode } from 'react'

export type SearchFilterListProps = {
    /**
     * The children to be rendered in the list,
     * intended to be instances of SearchFilterListElement.
     */
    children: ReactNode
}

/**
 * A component which renders a wrapper div around its children
 * (intended to be instances of SearchFilterListElement).
 */
export function SearchFilterList(props: SearchFilterListProps) {
    return <div className="search-filter-list">{props.children}</div>
}
