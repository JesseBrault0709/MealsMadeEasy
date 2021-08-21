import { IconProps } from '../IconProps'

export function ChevronDown(props: IconProps) {
    return (
        <svg
            className={props.className ?? 'chevron-down'}
            onClick={props.onClick}
            width="24"
            height="6"
            viewBox="0 0 24 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 1L12 5L23 1"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}
