import './LoadingCircle.css'
import Circle from './assets/LoadingCircle.png'
import React from 'react'

export type LoadingCircleProps = {
    style?: React.CSSProperties
}

export function LoadingCircle(props: LoadingCircleProps) {
    return <div className="loading-circle" style={props.style}>
        <img src={Circle} alt=""/>
    </div>
}