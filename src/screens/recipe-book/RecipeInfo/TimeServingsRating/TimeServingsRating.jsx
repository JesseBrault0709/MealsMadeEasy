// import './TimeServingsRating.css'

import Clock from './assets/Clock.png'
import Servings from './assets/Servings.png'

import { RecipeRating } from '../../RecipeRating/RecipeRating'

/**
 * @param {{
 *  time: number,
 *  servings: number,
 *  rating: number
 * }} props
 */
export function TimeServingsRating(props) {
    return <div className="time-servings-rating">
        <div className="time">
            <img src={Clock} alt="Time" />
            <span>{props.time} minutes</span>
        </div>
        <div className="servings">
            <img src={Servings} alt="Servings" />
            <span>{props.servings} servings</span>
        </div>
        <RecipeRating rating={props.rating} outOf={5} />
    </div>
}