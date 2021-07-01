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
        new Array(props.value), props.getCompleted
    )

    const incomplete = fillWithFiller<React.ReactNode>(
        new Array(props.outOf - props.value), 
        props.getIncomplete
    )

    return <div className="sequence">
        {completed}
        {incomplete}
    </div>
}