// import './Intolerances.css'

import { groupIntoThrees } from '../../../util'
import React, { Reducer, useContext } from 'react'
import { SPIntolerance } from '../../../client/spoonacularTypes'
import { AppConfigContext } from '../../../index'

export const intolerancesReducer: Reducer<
    ReadonlyArray<SPIntolerance>,
    | {
          type: 'add' | 'remove'
          intolerance: SPIntolerance
      }
    | {
          type: 'clear'
      }
> = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.intolerance]
        case 'remove':
            return state.filter(
                intolerance => intolerance !== action.intolerance
            )
        case 'clear':
            return []
        default:
            throw new Error('unknown action type')
    }
}

export type IntolerancesInputProps = {
    renderButton: (intolerance: SPIntolerance) => React.ReactNode
    renderNoPreference: () => React.ReactNode
}

export function IntolerancesInput(props: IntolerancesInputProps) {
    const appConfig = useContext(AppConfigContext)

    const buttons = appConfig.availableIntolerances.map(props.renderButton)
    buttons.push(props.renderNoPreference())

    return (
        <div className="restrictions-buttons">
            {groupIntoThrees(buttons).map((threesome, index) => {
                return (
                    <div key={index} className="restriction-button-pair">
                        {threesome}
                    </div>
                )
            })}
        </div>
    )
}
