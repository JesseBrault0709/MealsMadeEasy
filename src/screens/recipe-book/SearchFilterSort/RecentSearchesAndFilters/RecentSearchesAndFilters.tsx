import { useContext } from 'react'
import { useAppDispatch, useAppSelector, AppConfigContext } from '../../../..'
import { clearAllRecentSearches } from '../../../../slices/recentSearches'
import {
    setCookingTime,
    setDiet,
    setIntolerances,
    setCuisines
} from '../../../../slices/recipePreferences'
import { convertCookingTimeValueToString } from '../../../../util/cookingTime'
import { LinksSearchFilterList } from '../LinksSearchFilterList/LinksSearchFilterList'
import { SearchFilterListContainer } from '../SearchFilterListContainer/SearchFilterListContainer'
import { SearchFilterListElement } from '../SearchFilterListElement/SearchFilterListElement'

export type RecentSearchesAndFiltersProps = {}

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
        intolerances: currentIntolerances,
        cuisines: currentCuisines
    } = useAppSelector(state => state.recipePreferences.preferences)

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

            {/* Cuisines */}
            <SearchFilterListContainer
                title="Cuisines"
                renderTitleButton={() => (
                    <span
                        className="clear-or-select-all"
                        onClick={() =>
                            appDispatch(
                                setCuisines({
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
                                    setCuisines({
                                        cuisines: [cuisine]
                                    })
                                )
                            } else if (currentCuisines.includes(cuisine)) {
                                // this one is already selected, so
                                // unselect it by filtering it out of the
                                // currentCuisines
                                appDispatch(
                                    setCuisines({
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
                                    setCuisines({
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
