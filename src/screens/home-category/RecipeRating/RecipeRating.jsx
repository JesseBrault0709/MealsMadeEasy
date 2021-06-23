import Star from './assets/Star.png'

/**
 * @param {{
 *  rating: 0 | 1 | 2 | 3 | 4 | 5
 * }} props 
 */
export function RecipeRating(props) {
    return <div>
        {new Array(5).fill(<img src={Star} alt="star" />, 0, props.rating)}
    </div>
}