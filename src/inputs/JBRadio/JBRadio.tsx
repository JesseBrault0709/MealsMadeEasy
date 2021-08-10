type IndicatorProps = {
    selected?: boolean
}

function Indicator(props: IndicatorProps) {
    return (
        <svg className="jb-radio-indicator">
            <circle className="jb-radio-indicator-outline" />
            {props.selected ? (
                <circle className="jb-radio-indicator-selected" />
            ) : null}
        </svg>
    )
}

export type JBRadioProps = {
    onClick?: () => void
    selected?: boolean
    label: string
}

export function JBRadio(props: JBRadioProps) {
    return (
        <div className="jb-radio" onClick={props.onClick}>
            <Indicator selected={props.selected} />
            <span className="jb-radio-label">{props.label}</span>
        </div>
    )
}
