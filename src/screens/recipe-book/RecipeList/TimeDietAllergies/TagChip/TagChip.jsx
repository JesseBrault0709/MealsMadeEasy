/**
 * TODO as of 6/28/21:
 *  * Style these like Material-UI chips.
 */

/**
 * @param {{
 *  value: string
 * }} props 
 */
function TagChipBodyWithOneValue(props) {
    return <>
        <span className="tag-chip-number">[check mark]</span>
        <span className="tag-chip-text">{props.value}</span>
    </>
}

/**
 * @param {{
 *  name: string,
 *  numberOfValues: number
 * }} props
 */
function TagChipBodyWithZeroOrGreaterThanOneValues(props) {
    return <>
        <span className="tag-chip-number">{props.numberOfValues === 0 ? 'X' : props.numberOfValues}</span>
        <span className="tag-chip-text">{props.name}</span>
    </>
}

/**
 * @param {{
 *  tag: {
 *     name: string,
 *     values: ReadonlyArray<string>
 *  }
 * }} props
 */
export function TagChip(props) {
    const { tag } = props
    return <div className="tag-chip">
        {
            tag.values.length === 1
            ? <TagChipBodyWithOneValue value={tag.values[0]} />
            : <TagChipBodyWithZeroOrGreaterThanOneValues name={tag.name} numberOfValues={tag.values.length} />
        }
    </div>
}