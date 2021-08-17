import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../..'
import { BackButton } from '../../../icons/BackButton/BackButton'
import { SearchBar } from '../../../inputs/SearchBar/SearchBar'
import { addRecentSearch } from '../../../slices/recentSearches'
import {
    setRecipeBookScreen,
    setRecipeInfoId
} from '../../../slices/recipeBook'
import { fetchRecipes, resetAllRecipes } from '../../../slices/recipeLists'
import { setSearchQuery } from '../../../slices/searchPreferences'
import { ScreenWithTitleAndNav } from '../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { RecipeLists } from '../RecipeLists/RecipeLists'
import { SearchFilterSort } from '../SearchFilterSort/SearchFilterSort'

type SubScreen = 'RecipeLists' | 'SearchFilterSort'

export function RecipeListsOrSearchFilterSort() {
    const appDispatch = useAppDispatch()

    const [subScreen, setSubScreen] = useState<SubScreen>('RecipeLists')

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
                return <SearchFilterSort />
        }
    }

    const currentQuery = useAppSelector(state => state.searchPreferences.query)

    const activeRecipeList = useAppSelector(
        state => state.recipeLists.activeList
    )

    return (
        <ScreenWithTitleAndNav title="Recipe Book">
            <div className="search-bar-container">
                {subScreen === 'SearchFilterSort' ? (
                    <BackButton onClick={() => setSubScreen('RecipeLists')} />
                ) : null}

                <SearchBar
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
                    <span
                        className="search-bar-container-apply"
                        onClick={() => {
                            appDispatch(resetAllRecipes())
                            if (currentQuery !== null) {
                                appDispatch(
                                    addRecentSearch({ search: currentQuery })
                                )
                            }
                            if (activeRecipeList === undefined) {
                                throw new Error(
                                    `cannot fetch recipes when activeRecipeList is undefined`
                                )
                            }
                            appDispatch(fetchRecipes(activeRecipeList))
                            setSubScreen('RecipeLists')
                        }}
                    >
                        Apply
                    </span>
                ) : null}
            </div>
            {getSubScreen()}
        </ScreenWithTitleAndNav>
    )
}
