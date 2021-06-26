import StarImg from './assets/Star.png'

/**
 * @param {any[]} arr 
 * @param {(index: number) => any} filler
 * @param {number} startIndex
 * @param {number} endIndex
 * 
 * @returns {any[]}
 */
function fillUsingFiller(arr, filler, startIndex, endIndex) {
    if (endIndex !== null && endIndex !== undefined && endIndex > arr.length) {
        throw new Error(`endIndex cannot be greater than arr.length`)
    }

    if (startIndex < 0) {
        throw new Error(`startIndex cannot be less than 0`)
    }

    const result = arr.slice()

    for (let i = startIndex; i < (endIndex ?? arr.length); i++) {
        result[i] = filler(i)
    }

    return result
}

/**
 * @param {{
 *  index: number
 * }} props 
 */
function Star(props) {
    return <img key={`star${props.index}`} src={StarImg} alt="star" />
}

/**
 * @param {{
 *  rating: 0 | 1 | 2 | 3 | 4 | 5 | number
 * }} props 
 */
export function RecipeRating(props) {
    return <div>
        {fillUsingFiller(new Array(5), index => <Star index={index} />, 0, props.rating)}
    </div>
}