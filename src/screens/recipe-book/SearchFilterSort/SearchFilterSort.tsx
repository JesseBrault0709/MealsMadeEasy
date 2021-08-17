import { useState } from 'react'
import {
    RecentSearchesAndFilters,
    RecentSearchesAndFiltersProps
} from './RecentSearchesAndFilters/RecentSearchesAndFilters'
import { SortBy } from './SortBy/SortBy'
import { SortFilterDrawer } from './SortFilterDrawer/SortFilterDrawer'

type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export type SearchFilterSortProps = {
    onRecentSearchClick: RecentSearchesAndFiltersProps['onRecentSearchClick']
}

export function SearchFilterSort(props: SearchFilterSortProps) {
    // SubScreen state
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
