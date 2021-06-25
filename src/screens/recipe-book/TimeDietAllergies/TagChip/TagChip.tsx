import { Tag } from "../Tag"

function TagChipBodyWithOneValue(props: {
    value: string
}) {
    return <>
        <span className="tag-chip-number">[check mark]</span>
        <span className="tag-chip-text">{props.value}</span>
    </>
}


function TagChipBodyWithZeroOrGreaterThanOneValues(props: {
    name: string,
    numberOfValues: number
}) {
    return <>
        <span className="tag-chip-number">{props.numberOfValues === 0 ? 'X' : props.numberOfValues}</span>
        <span className="tag-chip-text">{props.name}</span>
    </>
}


export type TagChipProps = {
    tag: Tag
}

export function TagChip(props: TagChipProps) {
    const { tag } = props
    return <div className="tag-chip">
        {
            tag.values.length === 1
            ? <TagChipBodyWithOneValue value={tag.values[0]} />
            : <TagChipBodyWithZeroOrGreaterThanOneValues name={tag.name} numberOfValues={tag.values.length} />
        }
    </div>
}