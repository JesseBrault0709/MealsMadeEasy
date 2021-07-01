import { RowsOfPairs } from "../../../common/RowsOfPairs/RowsOfPairs"
import { RecipeCard } from "../RecipeCard/RecipeCard"
import { useState, useEffect } from "react"
import { Row, Col, Button } from 'react-bootstrap'

/**
 * @param {{
 *  active: boolean
 *  recipeResultSetSize: number
 *  onRecipeCardClick: (recipe: RecipeOverview) => void,
 *  getRecipes: (
 *      offset?: number,
 *      limit?: number
 *  ) => Promise<ReadonlyArray<RecipeOverview>>
 * }} props 
 */
export function RecipeListTab(props) {

    const [recipes, setRecipes] = useState([])
    const [recipeOffset, setRecipeOffset] = useState(0)

    useEffect(() => {
        props.getRecipes(recipeOffset, props.recipeResultSetSize)
            .then(results => setRecipes([...recipes, ...results]))
    }, [recipeOffset])

    const getOnRecipeCardClick = recipe => () => props.onRecipeCardClick(recipe)

    const onLoadMoreClick = () => {
        setRecipeOffset(recipeOffset + props.recipeResultSetSize)
    }

    if (props.active) {
        return <> 
            <RowsOfPairs>
                {
                    recipes.map(recipe => <RecipeCard key={recipe.title} recipe={recipe} onClick={getOnRecipeCardClick(recipe)} />)
                }
            </RowsOfPairs>
            <Button onClick={onLoadMoreClick}>Load More</Button>
        </>
    } else {
        return ''
    }
}