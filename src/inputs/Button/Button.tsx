import './Button.css'

import React from 'react'

export type ButtonProps = {
    variant: "primary" | "disabled"
    children?: React.ReactNode
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function JBButton(props: ButtonProps) {
    return <button 
        className={['jb-button', props.variant].join(" ")} 
        type="button"
        style={props.style}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}