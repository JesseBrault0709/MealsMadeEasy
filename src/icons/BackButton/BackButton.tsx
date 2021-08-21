import { IconProps } from '../IconProps'

export function BackButton(props: IconProps) {
    return (
        <svg
            className={props.className ?? 'back-button'}
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
