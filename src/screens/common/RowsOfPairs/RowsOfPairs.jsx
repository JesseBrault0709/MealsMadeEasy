/**
 * TODO as of 6/28/21:
 *  * Move groupIntoPairs function into a util.js file
 *      to be created in the root src dir.
 */

import './RowsOfPairs.css'

function groupIntoPairs(arr) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            const e1 = arr[i]
            const e2 = arr[i + 1]
            result.push([e1, e2])
        }
    }
    return result
}

/**
 * @param {{
 *  children: React.ReactNodeArray
 * }} props
 */
export function RowsOfPairs(props) {
    
    if (props.children === undefined || props.children === null) {
        throw new Error("RowOfPairs must have at least one child element.")
    }

    return <>
        {
            groupIntoPairs(props.children).map((pair, index) => {
                const [c1, c2] = pair
                return <div key={`pair_${index}`} className="pair-row">
                    <div className="pair-row-item">{c1}</div>
                    <div className="pair-row-item">{c2}</div>
                </div>
            })
        }
    </>
}