import './TimeDietAllergies.css'
import { TagChip } from "./TagChip/TagChip"
import { Tag } from './Tag'

export type TimeDietAllergiesProps = {
    onFilterClick?: () => void
    tags: ReadonlyArray<Tag>
}

export function TimeDietAllergies(props: TimeDietAllergiesProps) {
    return <div className="time-diet-allergies">
        <button type="button" onClick={props.onFilterClick}>[filter icon]</button>
        {   
            props.tags?.map(tag => <TagChip tag={tag} />)
        }
    </div>
}