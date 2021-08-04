import { ReactNode } from 'react'

export type SearchFilterListProps = {
    children: ReactNode
}

export function SearchFilterList(props: SearchFilterListProps) {
    return <div className="search-filter-list">{props.children}</div>
}
