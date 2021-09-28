import { RowsOfPairs } from '../../../common/RowsOfPairs/RowsOfPairs'
import { RecipeCard } from '../RecipeCard/RecipeCard'
import { JBButton } from '../../../../inputs/Button/JBButton'
import { RecipeOverview } from '../../../../client/RecipeOverview'
import { fetchRecipes, incrementOffset } from '../../../../slices/recipeLists'
import { useAppDispatch, useAppSelector } from '../../../../index'
import { LoadingCircle } from '../../../common/LoadingCircle/LoadingCircle'
import { useEffect } from 'react'

export type RecipeListProps = {
    name: string
    onRecipeCardClick: (recipe: RecipeOverview) => void
}

export function RecipeList(props: RecipeListProps) {
    /** fetch recipes on render or when props.name changes */
    useEffect(() => {
        dispatch(fetchRecipes(props.name))
    }, [props.name]) // eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useAppDispatch()

    const { fetchStatus, fetchError } = useAppSelector(
        state => state.recipeLists
    )
    const { recipesByOffset } = useAppSelector(state => {
        const listState = state.recipeLists.lists.find(
            list => list.name === props.name
        )
        if (listState === undefined) {
            throw new Error(`there is no listState for ${props.name}`)
        }
        return listState
    })

    const recipes = recipesByOffset
        .slice()
        .sort((a, b) => a.offset - b.offset)
        .flatMap(sortedList => sortedList.recipes)

    const getOnRecipeCardClick = (recipe: RecipeOverview) => () =>
        props.onRecipeCardClick(recipe)

    const onReduxClick = () => {
        dispatch(incrementOffset({ listName: props.name }))
        dispatch(fetchRecipes(props.name))
    }

    const rowsInPairs = (
        <RowsOfPairs>
            {recipes.map(recipe => (
                <RecipeCard
                    key={recipe.title}
                    recipe={recipe}
                    onClick={getOnRecipeCardClick(recipe)}
                />
            ))}
        </RowsOfPairs>
    )

    const loadMore = (
        <JBButton variant="primary" onClick={onReduxClick}>
            Load more
        </JBButton>
    )

    const getContent = () => {
        if (fetchStatus === 'success') {
            return (
                <>
                    {rowsInPairs}
                    {loadMore}
                </>
            )
        } else if (fetchStatus === 'fetching') {
            return (
                <>
                    {rowsInPairs}
                    <LoadingCircle
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {loadMore}
                </>
            )
        } else if (fetchStatus === 'error') {
            return (
                <>
                    {rowsInPairs}
                    Error: {fetchError?.message}
                    {loadMore}
                </>
            )
        }
    }

    return <div className="recipe-list">{getContent()}</div>
}
