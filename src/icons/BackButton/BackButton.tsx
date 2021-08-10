export type BackButtonProps = {
    onClick?: () => void
}

export function BackButton(props: BackButtonProps) {
    return (
        <svg
            className="back-button"
            onClick={props.onClick}
            width="8"
            height="14"
            fill="none"
        >
            <path
                d="M7 1L1 7L7 13"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
