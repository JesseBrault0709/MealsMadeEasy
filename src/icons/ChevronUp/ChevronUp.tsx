import { IconProps } from '../IconProps'

export function ChevronUp(props: IconProps) {
    return (
        <svg
            className={props.className ?? 'chevron-up'}
            onClick={props.onClick}
            width="24"
            height="6"
            viewBox="0 0 24 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23 5L12 1L1 5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}
