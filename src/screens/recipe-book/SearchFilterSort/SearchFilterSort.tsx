import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../..'
import { setRecipeBookScreen } from '../../../slices/recipeBook'
import { fetchRecipes, resetAllRecipes } from '../../../slices/recipeLists'
import { setQuery } from '../../../slices/recipePreferences'
import { RecentSearchesAndFilters } from './RecentSearchesAndFilters/RecentSearchesAndFilters'
import { SearchBarContainer } from './SearchBarContainer/SearchBarContainer'
import { SortBy } from './SortBy/SortBy'
import { SortFilterDrawer } from './SortFilterDrawer/SortFilterDrawer'

type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export function SearchFilterSort() {
    const appDispatch = useAppDispatch()

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

    // focus the search bar input when the page first renders
    useEffect(() => {
        if (searchBarRef.current !== null) {
            searchBarRef.current.focus()
        }
    }, [])

    // get the active recipe list

    const activeList = useAppSelector(state => state.recipeLists.activeList)

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
                onBackButtonClick={() =>
                    appDispatch(setRecipeBookScreen({ screen: 'Recipe List' }))
                }
                onApply={() => {
                    appDispatch(resetAllRecipes())
                    appDispatch(setRecipeBookScreen({ screen: 'Recipe List' }))
                    appDispatch(setQuery({ query: currentSearch }))
                    if (activeList !== undefined) {
                        appDispatch(fetchRecipes(activeList))
                    }
                }}
            />
            <SortFilterDrawer
                onFilter={() => setSubScreen('RecentSearchesAndFilters')}
                onSort={() => setSubScreen('Sort')}
            />
            {getSubScreen()}
        </div>
    )
}
