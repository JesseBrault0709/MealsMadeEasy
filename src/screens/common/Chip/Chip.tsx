// import './Chip.css'
import React from 'react'

type AvatarProps = { }

function Avatar(props: React.PropsWithChildren<AvatarProps>) {
    return <div className="avatar">
        {props.children}
    </div>
}


export type ChipProps = {
    label: string,
    type: "no-value" | "weak" | "strong",

    onClick?: () => void,
    avatar?: React.ReactNode
}

export function Chip(props: React.PropsWithoutRef<ChipProps>) {
    const classNames = ["chip", props.type]

    return <div className={classNames.join(" ")} onClick={props.onClick}>
        {
            props.avatar !== undefined ?
            <Avatar>{props.avatar}</Avatar> :
            null
        }
        <span className="chip-label">
            {props.label}
        </span>
    </div>
}