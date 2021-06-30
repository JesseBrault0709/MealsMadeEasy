import './Chip.css'
import React from 'react'

export type AvatarProps = { }

export function Avatar(props: React.PropsWithChildren<AvatarProps>) {
    return <div className="avatar">
        {props.children}
    </div>
}


export type ChipProps = {
    avatar: React.ReactElement<AvatarProps, typeof Avatar>,
    label: string,

    onClick: () => void

    type: "no-value" | "weak" | "strong"
}

export function Chip(props: React.PropsWithoutRef<ChipProps>) {
    const classNames = ["chip", props.type]

    return <div className={classNames.join(" ")}>
        {props.avatar}
        <span className="chip-label">
            {props.label}
        </span>
    </div>
}