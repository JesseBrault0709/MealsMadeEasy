import './Intolerances.css'

import { groupIntoPairs } from "../../../util"
import React, { Reducer, useContext } from 'react'
import { SPIntolerance } from '../../../client/spoonacularTypes'
import { AppConfigContext } from '../../../App'

export const intolerancesReducer: Reducer<
    ReadonlyArray<SPIntolerance>,
    {
        type: 'add' | 'remove'
        intolerance: SPIntolerance
    }
> = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.intolerance]
        case 'remove':
            return state.filter(intolerance => intolerance !== action.intolerance)
        default:
            throw new Error('unknown action type')
    }
}

export type IntolerancesInputProps = {
    renderButton: (intolerance: SPIntolerance) => React.ReactNode
}

export function IntolerancesInput(props: IntolerancesInputProps) {

    const appConfig = useContext(AppConfigContext)
    
    const buttons = appConfig.availableIntolerances.map(props.renderButton)

    return <div className="restrictions-buttons">
        {
            groupIntoPairs(buttons).map((pair, index) => {
                return <div key={index} className="restriction-button-pair">
                    {pair}
                </div>
            })
        }
    </div>

}