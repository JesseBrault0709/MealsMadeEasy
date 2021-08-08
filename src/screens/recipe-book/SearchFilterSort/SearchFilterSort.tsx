import { useContext } from 'react'
import { useState } from 'react'
import { AppConfigContext, useAppDispatch, useAppSelector } from '../../..'
import { clearAllRecentSearches } from '../../../slices/recentSearches'
import {
    setCookingTime,
    setDiet,
    setIntolerances
} from '../../../slices/recipePreferences'
import { convertCookingTimeValueToString } from '../../../util/cookingTime'
import { LinksSearchFilterList } from './LinksSearchFilterList/LinksSearchFilterList'
import { SearchFilterListContainer } from './SearchFilterListContainer/SearchFilterListContainer'
import { SearchFilterListElement } from './SearchFilterListElement/SearchFilterListElement'

type SubScreen = 'RecentSearchesAndFilters' | 'Sort'

export function SearchFilterSort() {
    // SubScreen state
    const [subScreen, setSubScreen] = useState<SubScreen>(
        'RecentSearchesAndFilters'
    )

    // Get app dispatch
    const appDispatch = useAppDispatch()

    // Get current global state
    const recentSearches = useAppSelector(
        state => state.recentSearches.searches
    )

    const currentCookingTime = useAppSelector(
        state => state.recipePreferences.preferences.cookingTime
    )

    const currentDiet = useAppSelector(
        state => state.recipePreferences.preferences.diet
    )

    const currentIntolerances = useAppSelector(
        state => state.recipePreferences.preferences.intolerances
    )

    // Get available options for cookingtime, diet, allergies
    // from app config
    const appConfig = useContext(AppConfigContext)

    /**
     * Returns the subscreen for RecentSearchesAndFilters
     */
    const getRecentSearchesAndFilters = () => (
        <div className="recent-searches-and-filters">
            {/* Recent Searches */}
            <LinksSearchFilterList
                title="Recent Searches"
                renderTitleButton={() => (
                    <span
                        className="clear-or-select-all"
                        onClick={() => appDispatch(clearAllRecentSearches())}
                    >
                        Clear All
                    </span>
                )}
                links={recentSearches.map(recentSearch => [
                    recentSearch,
                    () => console.log(recentSearch)
                ])}
            />

            {/* Time */}
            <SearchFilterListContainer title="Time">
                {appConfig.availableCookingTimes.map(cookingTime => (
                    <SearchFilterListElement
                        title={convertCookingTimeValueToString(cookingTime)}
                        active={cookingTime === currentCookingTime}
                        onClick={() =>
                            appDispatch(setCookingTime({ cookingTime }))
                        }
                    />
                ))}
            </SearchFilterListContainer>

            {/* Diet */}
            <SearchFilterListContainer title="Diet">
                {appConfig.availableDiets.map(diet => (
                    <SearchFilterListElement
                        title={diet}
                        active={diet === currentDiet}
                        onClick={() => {
                            if (diet === currentDiet) {
                                // if already selected, unselect it
                                appDispatch(setDiet({ diet: null }))
                            } else {
                                appDispatch(setDiet({ diet }))
                            }
                        }}
                    />
                ))}
            </SearchFilterListContainer>

            {/* Allergies */}
            <SearchFilterListContainer
                title="Allergies"
                renderTitleButton={() => (
                    <span
                        className="clear-or-select-all"
                        onClick={() => {
                            appDispatch(
                                setIntolerances({
                                    intolerances: [
                                        ...appConfig.availableIntolerances
                                    ]
                                })
                            )
                        }}
                    >
                        Select All
                    </span>
                )}
            >
                {appConfig.availableIntolerances.map(intolerance => (
                    <SearchFilterListElement
                        title={intolerance}
                        active={
                            currentIntolerances === null
                                ? false
                                : currentIntolerances.includes(intolerance)
                        }
                        onClick={() => {
                            if (currentIntolerances === null) {
                                // there are no current intolerances,
                                // so create an array with it
                                appDispatch(
                                    setIntolerances({
                                        intolerances: [intolerance]
                                    })
                                )
                            } else if (
                                currentIntolerances.includes(intolerance)
                            ) {
                                // there are current intolerances, including the
                                // selected, so filter it out
                                appDispatch(
                                    setIntolerances({
                                        intolerances: currentIntolerances.filter(
                                            currentIntolerance =>
                                                currentIntolerance !==
                                                intolerance
                                        )
                                    })
                                )
                            } else {
                                // there are current intolerances, but not
                                // including the selected, so add it
                                appDispatch(
                                    setIntolerances({
                                        intolerances: [
                                            ...currentIntolerances,
                                            intolerance
                                        ]
                                    })
                                )
                            }
                        }}
                    />
                ))}
            </SearchFilterListContainer>
        </div>
    )

    const getSort = () => <div className="sort"></div>

    const getSubScreen = () => {
        switch (subScreen) {
            case 'RecentSearchesAndFilters':
                return getRecentSearchesAndFilters()
            case 'Sort':
                return getSort()
        }
    }

    return <div className="search-filter-sort">{getSubScreen()}</div>
}
