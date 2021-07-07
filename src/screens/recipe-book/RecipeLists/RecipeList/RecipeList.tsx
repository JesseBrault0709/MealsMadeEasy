import './RecipeList.css'

import { RowsOfPairs } from "../../../common/RowsOfPairs/RowsOfPairs"
import { RecipeCard } from "../RecipeCard/RecipeCard"
import { JBButton } from '../../../../inputs/Button/JBButton'
import { RecipeOverview } from '../../../../client/RecipeOverview'

export type RecipeListProps = {
    onRecipeCardClick: (recipe: RecipeOverview) => void,
    
    recipes: ReadonlyArray<RecipeOverview>,
    onLoadMoreClick: () => void
}

export function RecipeList(props: RecipeListProps) {

    const getOnRecipeCardClick = (recipe: RecipeOverview) => () => props.onRecipeCardClick(recipe)

    return <div className="recipe-list"> 
        <RowsOfPairs>
            {
                props.recipes.map(recipe => <RecipeCard key={recipe.title} recipe={recipe} onClick={getOnRecipeCardClick(recipe)} />)
            }
        </RowsOfPairs>
        <JBButton variant="primary" onClick={props.onLoadMoreClick}>Load More</JBButton>
    </div>

}