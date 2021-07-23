// import './ChangeModal.css'

import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { JBButton } from "../../../../../inputs/Button/JBButton"
import { getModalEffect } from "../../../../../util"
import { BottomModal } from '../../../../common/BottomModal/BottomModal'

export type ChangeModalProps = {
    title: string
    onDone: () => void
    onCancel: () => void
    children: React.ReactNode
    style?: React.CSSProperties
}

export function ChangeModal(props: ChangeModalProps) {
    
    useEffect(getModalEffect()) // eslint-disable-line react-hooks/exhaustive-deps
    
    const buttonStyle: React.CSSProperties = {
        width: '22%',
        margin: '20px 5px'
    }

    return ReactDOM.createPortal(<BottomModal>
        <div className="change-modal" style={props.style}>
        
            <h3>{props.title}</h3>
            
            {props.children}

            <div className="change-modal-buttons">
                <JBButton variant="outline" style={buttonStyle} onClick={props.onCancel}>
                    Cancel
                </JBButton>
                <JBButton variant="primary" style={buttonStyle} onClick={props.onDone}>
                    Done
                </JBButton>
            </div>

        </div>
    </BottomModal>, document.getElementById('modal-root') as Element)
}