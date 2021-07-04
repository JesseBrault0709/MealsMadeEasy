import './Sequence.css'

import React from 'react'
import { fillWithFiller } from '../../../util'

export type SequenceProps = {
    value: number
    outOf: number
    getCompleted: () => React.ReactNode
    getIncomplete: () => React.ReactNode
}

export function Sequence(props: SequenceProps) {
    
    const completed = fillWithFiller<React.ReactNode>(
        new Array(props.value),
        index => <div key={`completed_${index}`}>{props.getCompleted()}</div>
    )

    const incomplete = fillWithFiller<React.ReactNode>(
        new Array(props.outOf - props.value), 
        index => <div key={`incompleted_${index}`}>{props.getIncomplete()}</div>
    )

    return <div className="sequence">
        {completed}
        {incomplete}
    </div>
}