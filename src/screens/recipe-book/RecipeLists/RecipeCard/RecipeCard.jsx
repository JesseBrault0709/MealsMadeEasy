import { RecipeRating } from '../../RecipeRating/RecipeRating'

/**
 * @param {{
 *  recipe: RecipeOverview,
 *  onClick?: () => void
 * }} props
 */
export function RecipeCard(props) {
    const { recipe } = props

    // spoonacular score is 0-100; divide by 20 to get 0-5
    const rating = recipe.spoonacularScore
        ? Math.floor(recipe.spoonacularScore / 20)
        : undefined

    return (
        <div className="recipe-card" onClick={props.onClick}>
            <img className="recipe-img" src={recipe.image} alt="" />
            <div className="recipe-title-rating">
                <h3>{recipe.title}</h3>
                {rating !== undefined ? (
                    <RecipeRating rating={rating} outOf={5} />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
