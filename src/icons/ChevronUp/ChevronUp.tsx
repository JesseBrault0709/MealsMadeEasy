import { IconProps } from '../IconProps'

export function ChevronUp(props: IconProps) {
    return (
        <svg
            className={props.className}
            onClick={props.onClick}
            width="24"
            height="6"
            viewBox="0 0 24 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23 5L12 1L1 5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
