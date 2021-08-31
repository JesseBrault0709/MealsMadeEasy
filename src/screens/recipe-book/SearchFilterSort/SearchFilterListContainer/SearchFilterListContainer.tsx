import { ReactNode } from 'react'
import {
    SearchFilterList,
    SearchFilterListProps
} from '../SearchFilterList/SearchFilterList'

export type SearchFilterListContainerProps = {
    /** The title of this list */
    title: string

    /**
     * A supplier of a button to be rendered to the right
     * of the title.
     */
    renderTitleButton?: () => ReactNode

    /**
     * Forwarded to the SearchFilterList instance.
     */
    children: SearchFilterListProps['children']
}

/**
 * A container component which renders a div containing
 * a title-and-button div, and beneath it, an instance of
 * SearchFilterList.
 */
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
