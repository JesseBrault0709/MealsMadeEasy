import { Row, Col } from 'react-bootstrap'

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
                return <Row key={`pair_${index}`}>
                    <Col>{c1}</Col>
                    <Col>{c2}</Col>
                </Row>
            })
        }
    </>
}