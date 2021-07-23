// import './CenterModal.css'

export type CenterModalProps = {
    children: React.ReactNode,
    style?: React.CSSProperties
}

export function CenterModal(props: CenterModalProps) {
    return <div className="center-modal" style={props.style}>
        {props.children}
    </div>
}