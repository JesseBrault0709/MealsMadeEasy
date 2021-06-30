import './BottomOverlay.css'
import React from 'react'

export type BottomOverlayProps = {
    show: boolean
}

export function BottomOverlay(props: React.PropsWithChildren<BottomOverlayProps>) {
    if (props.show) {
        return <div className="bottom-overlay">
            {props.children}
        </div>
    } else {
        return null
    }
}