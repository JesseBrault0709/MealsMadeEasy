import './BottomModal.css'

export type BottomModalProps = {
    children: React.ReactNode
}

export function BottomModal(props: BottomModalProps) {
    return <div className="bottom-modal">
        {props.children}
    </div>
}
