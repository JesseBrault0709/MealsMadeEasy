import './RowsOfPairs.css'

import { groupIntoPairs } from '../../../util'

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