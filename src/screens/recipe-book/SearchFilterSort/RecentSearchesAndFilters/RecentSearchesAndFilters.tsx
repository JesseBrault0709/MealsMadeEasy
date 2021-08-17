import { useContext } from 'react'
import { useAppDispatch, useAppSelector, AppConfigContext } from '../../../..'
import { clearAllRecentSearches } from '../../../../slices/recentSearches'
import {
    setCookingTime,
    setDiet,
    setIntolerances
} from '../../../../slices/onboardingPreferences'
import { convertCookingTimeValueToString } from '../../../../util/cookingTime'
import { LinksSearchFilterList } from '../LinksSearchFilterList/LinksSearchFilterList'
import { SearchFilterListContainer } from '../SearchFilterListContainer/SearchFilterListContainer'
import { SearchFilterListElement } from '../SearchFilterListElement/SearchFilterListElement'
import { setSearchCuisines } from '../../../../slices/searchPreferences'
import { reverseArray } from '../../../../util/util'

export type RecentSearchesAndFiltersProps = {
    onRecentSearchClick: (recentSearch: string) => void
}

export function RecentSearchesAndFilters(props: RecentSearchesAndFiltersProps) {
    // Get app dispatch
    const appDispatch = useAppDispatch()

    // Get current global state
    const recentSearches = useAppSelector(
        state => state.recentSearches.searches
    )

    const {
        cookingTime: currentCookingTime,
        diet: currentDiet,
        intolerances: currentIntolerances
    } = useAppSelector(state => state.onboardingPreferences.preferences)

    const { cuisines: currentCuisines } = useAppSelector(
        state => state.searchPreferences
    )

    // Get available options for cookingtime, diet, allergies
    // and cuisines from app config
    const appConfig = useContext(AppConfigContext)

    return (
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
                /** reverse the array so that the most recent search appears first */
                links={reverseArray(recentSearches).map(recentSearch => [
                    recentSearch,
                    () => props.onRecentSearchClick(recentSearch)
                ])}
            />

            {/* Time */}
            <SearchFilterListContainer title="Time">
                {appConfig.availableCookingTimes.map(cookingTime => (
                    <SearchFilterListElement
                        title={convertCookingTimeValueToString(cookingTime)}
                        key={convertCookingTimeValueToString(cookingTime)}
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
                        key={diet}
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
                        key={intolerance}
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

            {/* Cuisines */}
            <SearchFilterListContainer
                title="Cuisines"
                renderTitleButton={() => (
                    <span
                        className="clear-or-select-all"
                        onClick={() =>
                            appDispatch(
                                setSearchCuisines({
                                    cuisines: [...appConfig.availableCuisines]
                                })
                            )
                        }
                    >
                        Select All
                    </span>
                )}
            >
                {appConfig.availableCuisines.map(cuisine => (
                    <SearchFilterListElement
                        title={cuisine}
                        key={cuisine}
                        active={
                            currentCuisines === null
                                ? false
                                : currentCuisines.includes(cuisine)
                        }
                        onClick={() => {
                            if (currentCuisines === null) {
                                // no currentCuisines, so create an
                                // array with this one in it
                                appDispatch(
                                    setSearchCuisines({
                                        cuisines: [cuisine]
                                    })
                                )
                            } else if (currentCuisines.includes(cuisine)) {
                                // this one is already selected, so
                                // unselect it by filtering it out of the
                                // currentCuisines
                                appDispatch(
                                    setSearchCuisines({
                                        cuisines: currentCuisines.filter(
                                            currentCuisine =>
                                                currentCuisine !== cuisine
                                        )
                                    })
                                )
                            } else {
                                // this one is not yet selected, so
                                // select it by dispatching it with the
                                // current cuisines
                                appDispatch(
                                    setSearchCuisines({
                                        cuisines: [...currentCuisines, cuisine]
                                    })
                                )
                            }
                        }}
                    />
                ))}
            </SearchFilterListContainer>
        </div>
    )
}
