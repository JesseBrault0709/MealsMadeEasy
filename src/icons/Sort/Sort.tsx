import { IconProps } from '../IconProps'

export function Sort(props: IconProps) {
    return (
        <svg
            className={props.className}
            onClick={props.onClick}
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.5846 16L15.8125 11.0276M6.22794 1.04144V15.9586V1.04144ZM1 5.97238L6.22794 1L1 5.97238ZM10.5846 16V1.08287V16Z"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}
