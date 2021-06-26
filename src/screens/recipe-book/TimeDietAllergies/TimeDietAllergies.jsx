import './TimeDietAllergies.css'
import { TagChip } from "./TagChip/TagChip"

/**
 * @param {{
 *  onFliterClick: () => void,
 *  tags: ReadonlyArray<{
 *     name: string,
 *     values: ReadonlyArray<string>
 *  }>
 * }} props
 */
export function TimeDietAllergies(props) {
    return <div className="time-diet-allergies">
        <button type="button" onClick={props.onFilterClick}>[filter icon]</button>
        {   
            props.tags?.map(tag => <TagChip tag={tag} />)
        }
    </div>
}