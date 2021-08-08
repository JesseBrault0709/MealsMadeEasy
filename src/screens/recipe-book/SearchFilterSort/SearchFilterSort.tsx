import { useState } from 'react'
import { RecentSearchesAndFilters } from './RecentSearchesAndFilters/RecentSearchesAndFilters'

type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export function SearchFilterSort() {
    // SubScreen state
    const [subScreen, setSubScreen] = useState<SubScreen>(
        'RecentSearchesAndFilters'
    )

    const getSort = () => <div className="sort"></div>

    const getSubScreen = () => {
        switch (subScreen) {
            case 'RecentSearchesAndFilters':
                return <RecentSearchesAndFilters />
            case 'Sort':
                return getSort()
        }
    }

    return <div className="search-filter-sort">{getSubScreen()}</div>
}
