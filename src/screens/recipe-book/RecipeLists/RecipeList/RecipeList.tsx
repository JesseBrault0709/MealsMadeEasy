import './RecipeList.css'

import { RowsOfPairs } from "../../../common/RowsOfPairs/RowsOfPairs"
import { RecipeCard } from "../RecipeCard/RecipeCard"
import { JBButton } from '../../../../inputs/Button/JBButton'
import { RecipeOverview } from '../../../../client/RecipeOverview'
import { fetchRecipes, incrementOffset } from '../../../../slices/recipeLists'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

export type RecipeListProps = {
    name: string,
    onRecipeCardClick: (recipe: RecipeOverview) => void,
}

export function RecipeList(props: RecipeListProps) {

    const dispatch = useAppDispatch()

    const state = useAppSelector(state => {
        const listState = state.recipeLists.lists.find(list => list.name === props.name)
        if (listState === undefined) {
            throw new Error(`there is no list state for ${props.name}`)
        }
        return listState
    })

    const recipes = useAppSelector(state => {
        const listState = state.recipeLists.lists.find(list => list.name === props.name)
        if (listState === undefined) {
            throw new Error(`there is no listState for ${props.name}`)
        }
        const sortedByOffset = listState.recipesByOffset.slice().sort((a, b) => a.offset - b.offset)
        return sortedByOffset.flatMap(recipesByOffset => recipesByOffset.recipes)
    })

    const getOnRecipeCardClick = (recipe: RecipeOverview) => () => props.onRecipeCardClick(recipe)

    const onReduxClick = () => {
        dispatch(incrementOffset({ listName: props.name }))
        dispatch(fetchRecipes(props.name))
    }

    return <div className="recipe-list"> 
        <RowsOfPairs>
            {
                recipes.map(recipe => <RecipeCard key={recipe.title} recipe={recipe} onClick={getOnRecipeCardClick(recipe)} />)
            }
        </RowsOfPairs>
        <JBButton variant="primary" onClick={onReduxClick}>Load more</JBButton>
    </div>

}