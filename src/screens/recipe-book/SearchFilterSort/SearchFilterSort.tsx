import { useState } from 'react'
import { useAppDispatch } from '../../..'
import { setSearchQuery } from '../../../slices/searchPreferences'
import { RecentSearchesAndFilters } from './RecentSearchesAndFilters/RecentSearchesAndFilters'
import { SortBy } from './SortBy/SortBy'
import { SortFilterDrawer } from './SortFilterDrawer/SortFilterDrawer'

type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export function SearchFilterSort() {
    const appDispatch = useAppDispatch()

    // SubScreen state
    const [subScreen, setSubScreen] = useState<SubScreen>(
        'RecentSearchesAndFilters'
    )

    const getSubScreen = () => {
        switch (subScreen) {
            case 'RecentSearchesAndFilters':
                return (
                    <RecentSearchesAndFilters
                        onRecentSearchClick={recentSearch => {
                            appDispatch(setSearchQuery({ query: recentSearch }))
                        }}
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
