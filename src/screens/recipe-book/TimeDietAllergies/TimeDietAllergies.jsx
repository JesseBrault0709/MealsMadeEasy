import './TimeDietAllergies.css'
import { TagChip } from "./TagChip/TagChip"

export function TimeDietAllergies({ 
    onFilterClick,
    cookingTime,
    diet,
    intolerances
}) {
    return <div className="time-diet-allergies">
        <button type="button" onClick={onFilterClick}>[filter icon]</button>
        <TagChip tag={{ name: "Cooking Time", values: [cookingTime] }} />
        <TagChip tag={{ name: "Diet", values: [diet] }} />
        <TagChip tag={{ name: "Allergies", values: intolerances }} />
    </div>
}