import React from 'react'

export type JBButtonProps = {
    variant:
        | 'primary'
        | 'outline'
        | 'disabled'
        | 'circle-large'
        | 'circle-medium'
    children?: React.ReactNode
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    active?: boolean
}

export function JBButton(props: JBButtonProps) {
    const classNames = ['jb-button', props.variant]

    if (props.active) {
        classNames.push(`${props.variant}-active`)
    }

    return (
        <button
            className={classNames.join(' ')}
            type="button"
            style={props.style}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
