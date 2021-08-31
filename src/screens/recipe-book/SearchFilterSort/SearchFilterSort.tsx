import { useState } from 'react'
import {
    RecentSearchesAndFilters,
    RecentSearchesAndFiltersProps
} from './RecentSearchesAndFilters/RecentSearchesAndFilters'
import { SortBy } from './SortBy/SortBy'
import { SortFilterDrawer } from './SortFilterDrawer/SortFilterDrawer'

/** The possible sub screens of SearchFilterSort */
type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export type SearchFilterSortProps = {
    /** Forwarded to RecentSearchesAndFilters */
    onRecentSearchClick: RecentSearchesAndFiltersProps['onRecentSearchClick']
}

/**
 * A component which can be in one of two states: 'RecentSearchesAndFilters' (default)
 * or 'Sort'. Both render an instance of SortFilterDrawer, beneath which
 * is rendered either an instance of RecentSearchesAndFilters (if the subScreen
 * is 'RecentSearchesAndFilters) or SortBy (if the subscreen is 'Sort').
 */
export function SearchFilterSort(props: SearchFilterSortProps) {
    const [subScreen, setSubScreen] = useState<SubScreen>(
        'RecentSearchesAndFilters'
    )

    const getSubScreen = () => {
        switch (subScreen) {
            case 'RecentSearchesAndFilters':
                return (
                    <RecentSearchesAndFilters
                        onRecentSearchClick={props.onRecentSearchClick}
                    />
                )
            case 'Sort':
                return <SortBy />
        }
    }

    return (
        <div className="search-filter-sort">
            <SortFilterDrawer
                onFilter={() => setSubScreen('RecentSearchesAndFilters')}
                onSort={() => setSubScreen('Sort')}
            />
            {getSubScreen()}
        </div>
    )
}
