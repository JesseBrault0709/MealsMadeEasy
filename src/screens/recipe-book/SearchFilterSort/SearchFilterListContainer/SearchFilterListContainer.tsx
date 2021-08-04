import { ReactNode } from 'react'
import {
    SearchFilterList,
    SearchFilterListProps
} from '../SearchFilterList/SearchFilterList'

export type SearchFilterListContainerProps = {
    title: string
    renderTitleButton?: () => ReactNode
    children: SearchFilterListProps['children']
}

export function SearchFilterListContainer(
    props: SearchFilterListContainerProps
) {
    return (
        <div className="search-filter-list-container">
            <div className="search-filter-list-container-title-and-button">
                <h3>{props.title}</h3>
                {props.renderTitleButton !== undefined
                    ? props.renderTitleButton()
                    : null}
            </div>
            <SearchFilterList children={props.children} />
        </div>
    )
}
