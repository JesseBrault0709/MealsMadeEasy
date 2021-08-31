import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../..'
import { BackButton } from '../../../icons/BackButton/BackButton'
import { SearchBar } from '../../../inputs/SearchBar/SearchBar'
import { addRecentSearchIfNotPresent } from '../../../slices/recentSearches'
import {
    setRecipeBookScreen,
    setRecipeInfoId
} from '../../../slices/recipeBook'
import { fetchRecipes, resetAllRecipes } from '../../../slices/recipeLists'
import { setSearchQuery } from '../../../slices/searchPreferences'
import { ScreenWithTitleAndNav } from '../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { RecipeLists } from '../RecipeLists/RecipeLists'
import { SearchFilterSort } from '../SearchFilterSort/SearchFilterSort'

/** The possible values for the subScreen state of RecentListsOrSearchFilterSort */
type SubScreen = 'RecipeLists' | 'SearchFilterSort'

/**
 * A component which is in one of two primary states: 'RecipeLists' (default)
 * or 'SearchFilterSort', stored in the subScreen const.
 *
 * Both states return a ScreenWithTitleAndNav entitled
 * 'RecipeBook' whose first child is a div containing a SearchBar.
 *
 * If the subScreen is 'RecipeLists', it renders beneath the SearchBar
 * a RecipeLists instance.
 *
 * If the subScreen is 'SearchFilterSort', it renders beneath the SearchBar
 * a SearchFilterSort instance, as well as a back button to the left of the
 * SearchBar and an 'Apply' button to the right of the SearchBar.
 */
export function RecipeListsOrSearchFilterSort() {
    const appDispatch = useAppDispatch()

    const [subScreen, setSubScreen] = useState<SubScreen>('RecipeLists')

    /** The current search query. This value is displayed in the search bar */
    const currentQuery = useAppSelector(state => state.searchPreferences.query)

    /** The current active recipe list (eg. 'main course', 'side dish') */
    const activeRecipeList = useAppSelector(
        state => state.recipeLists.activeList
    )

    /**
     * A function to be run when the user begins a search. This
     * is done via either clicking the 'Apply' button to the right
     * of the search bar or via clicking on a recentSearch under 'Recent
     * Searches' (located within SearchFilterSort).
     */
    const onApply = () => {
        appDispatch(resetAllRecipes())
        if (currentQuery !== null) {
            appDispatch(
                addRecentSearchIfNotPresent({
                    search: currentQuery
                })
            )
        }
        if (activeRecipeList === undefined) {
            throw new Error(
                `cannot fetch recipes when activeRecipeList is undefined`
            )
        }
        appDispatch(fetchRecipes(activeRecipeList))
        setSubScreen('RecipeLists')
    }

    const getSubScreen = () => {
        switch (subScreen) {
            case 'RecipeLists':
                return (
                    <RecipeLists
                        onRecipeCardClick={recipeOverview => {
                            appDispatch(
                                setRecipeInfoId({ id: recipeOverview.id })
                            )
                            appDispatch(
                                setRecipeBookScreen({ screen: 'RecipeInfo' })
                            )
                        }}
                    />
                )
            case 'SearchFilterSort':
                return (
                    <SearchFilterSort
                        onRecentSearchClick={recentSearch => {
                            appDispatch(setSearchQuery({ query: recentSearch }))
                            onApply()
                        }}
                    />
                )
        }
    }

    const searchBarInputRef = useRef<HTMLInputElement>(null)

    return (
        <ScreenWithTitleAndNav title="Recipe Book">
            <div className="search-bar-container">
                {subScreen === 'SearchFilterSort' ? (
                    <BackButton
                        className="search-bar-container-back-button"
                        onClick={() => setSubScreen('RecipeLists')}
                    />
                ) : null}

                <form
                    className="search-bar-container-form"
                    onSubmit={event => {
                        event.preventDefault()
                        if (searchBarInputRef.current !== null) {
                            searchBarInputRef.current.blur()
                        }
                        onApply()
                    }}
                >
                    <SearchBar
                        ref={searchBarInputRef}
                        value={currentQuery ?? ''}
                        onFocus={() => {
                            if (subScreen === 'RecipeLists') {
                                setSubScreen('SearchFilterSort')
                            }
                        }}
                        onChange={event => {
                            const { value } = event.currentTarget
                            if (value.length === 0) {
                                appDispatch(setSearchQuery({ query: null }))
                            } else {
                                appDispatch(setSearchQuery({ query: value }))
                            }
                        }}
                        onClearSearchClick={() =>
                            appDispatch(setSearchQuery({ query: null }))
                        }
                    />

                    {subScreen === 'SearchFilterSort' ? (
                        <button
                            type="submit"
                            className="search-bar-container-apply"
                        >
                            Apply
                        </button>
                    ) : null}
                </form>
            </div>
            {getSubScreen()}
        </ScreenWithTitleAndNav>
    )
}
