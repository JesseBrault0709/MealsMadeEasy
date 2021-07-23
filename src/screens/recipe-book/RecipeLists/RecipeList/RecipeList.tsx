// import './RecipeList.css'

import { RowsOfPairs } from '../../../common/RowsOfPairs/RowsOfPairs'
import { RecipeCard } from '../RecipeCard/RecipeCard'
import { JBButton } from '../../../../inputs/Button/JBButton'
import { RecipeOverview } from '../../../../client/RecipeOverview'
import { fetchRecipes, incrementOffset } from '../../../../slices/recipeLists'
import { useAppDispatch, useAppSelector } from '../../../../index'
import { LoadingCircle } from '../../../common/LoadingCircle/LoadingCircle'

export type RecipeListProps = {
    name: string
    onRecipeCardClick: (recipe: RecipeOverview) => void
}

export function RecipeList(props: RecipeListProps) {
    const dispatch = useAppDispatch()

    const status = useAppSelector(state => state.recipeLists.fetchStatus)
    const error = useAppSelector(state => state.recipeLists.fetchError)

    const recipes = useAppSelector(state => {
        const listState = state.recipeLists.lists.find(
            list => list.name === props.name
        )
        if (listState === undefined) {
            throw new Error(`there is no listState for ${props.name}`)
        }
        const sortedByOffset = listState.recipesByOffset
            .slice()
            .sort((a, b) => a.offset - b.offset)
        return sortedByOffset.flatMap(
            recipesByOffset => recipesByOffset.recipes
        )
    })

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
        if (status === 'idle') {
            return (
                <>
                    {rowsInPairs}
                    {loadMore}
                </>
            )
        } else if (status === 'fetching') {
            return (
                <>
                    {rowsInPairs}
                    <LoadingCircle
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {loadMore}
                </>
            )
        } else if (status === 'error') {
            return (
                <>
                    {rowsInPairs}
                    Error: {error?.message}
                    {loadMore}
                </>
            )
        }
    }

    return <div className="recipe-list">{getContent()}</div>
}
