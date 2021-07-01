import Star from './assets/Star.png'
import DarkStar from './assets/DarkStar.png'

import { Sequence } from '../../common/Sequence/Sequence'

export type RecipeRatingProps = {
    rating: number
    outOf: number
}

export function RecipeRating(props: RecipeRatingProps) {
    return <Sequence 
        value={props.rating}
        outOf={props.outOf}
        getCompleted={() => <img src={Star} />}
        getIncomplete={() => <img src={DarkStar} />}
    />
}