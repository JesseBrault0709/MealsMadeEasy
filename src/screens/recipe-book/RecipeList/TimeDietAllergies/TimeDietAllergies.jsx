/**
 * TODO as of 6/28/21:
 *  * Do styling, esp of the filter button.
 */

import './TimeDietAllergies.css'

import Check from './assets/Check.png'
import X from './assets/X.png'
import Funnel from './assets/Funnel.png'

import { Chip } from '../../../common/Chip/Chip'

export function TimeDietAllergies({ 
    onFilterClick,
    cookingTime,
    diet,
    intolerances
}) {
    return <div className="time-diet-allergies">
        <img className="funnel" src={Funnel} alt=""/>
        {
            cookingTime !== undefined ?
            <Chip 
                avatar={<img src={Check} alt=""/>} 
                label={cookingTime === "No Limit" ? cookingTime : `${cookingTime} mins`} 
                type="strong" 
            /> :
            <Chip avatar={<img src={X} alt=""/>} label="Time" type="no-value" />
        }

        {
            diet !== undefined ?
            <Chip avatar={<img src={Check} alt=""/>} label={diet} type="strong" /> :
            <Chip avatar={<img src={X} alt=""/>} label="Diet" type="no-value" />
        }

        {
            intolerances === undefined || intolerances.length === 0 ?
            <Chip avatar={<img src={X} alt=""/>} label="Allergies" type="no-value" /> :
            <Chip avatar={intolerances.length} label="Allergies" type="strong" />
        }
    </div>
}