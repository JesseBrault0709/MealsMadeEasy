import { useRef } from 'react'
import { useState } from 'react'
import { RecentSearchesAndFilters } from './RecentSearchesAndFilters/RecentSearchesAndFilters'
import { SearchBarContainer } from './SearchBarContainer/SearchBarContainer'
import { SortBy } from './SortBy/SortBy'
import { SortFilterDrawer } from './SortFilterDrawer/SortFilterDrawer'

type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export function SearchFilterSort() {
    // SubScreen state
    const [subScreen, setSubScreen] = useState<SubScreen>(
        'RecentSearchesAndFilters'
    )

    const searchBarRef = useRef<HTMLInputElement>(null)

    const [currentSearch, setCurrentSearch] = useState<string>('')

    const onSearchBarChange = () => {
        if (searchBarRef.current !== null) {
            setCurrentSearch(searchBarRef.current.value)
        }
    }

    const onSearchBarClear = () => {
        if (searchBarRef.current !== null) {
            searchBarRef.current.value = ''
            setCurrentSearch(searchBarRef.current.value)
        }
    }

    const getSubScreen = () => {
        switch (subScreen) {
            case 'RecentSearchesAndFilters':
                return (
                    <RecentSearchesAndFilters
                        onRecentSearchClick={recentSearch => {
                            if (searchBarRef.current !== null) {
                                searchBarRef.current.value = recentSearch
                                setCurrentSearch(searchBarRef.current.value)
                            }
                        }}
                    />
                )
            case 'Sort':
                return <SortBy />
        }
    }

    return (
        <div className="search-filter-sort">
            <SearchBarContainer
                ref={searchBarRef}
                onChange={onSearchBarChange}
                onClearSearchClick={onSearchBarClear}
            />
            <SortFilterDrawer
                onFilter={() => setSubScreen('RecentSearchesAndFilters')}
                onSort={() => setSubScreen('Sort')}
            />
            {getSubScreen()}
        </div>
    )
}
