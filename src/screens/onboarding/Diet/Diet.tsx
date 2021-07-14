import './Diet.css'

import { SPDiet } from "../../../client/spoonacularTypes"
import React, { useContext } from "react"
import { groupIntoPairs } from "../../../util"
import { AppConfigContext } from '../../../index'

export type DietInputProps = {
    renderButton: (diet: SPDiet) => React.ReactNode,
    renderNoPreference: () => React.ReactNode
}

export function DietInput(props: DietInputProps) {

    const appConfig = useContext(AppConfigContext)
    
    const buttons = appConfig.availableDiets.map(props.renderButton)
    buttons.push(props.renderNoPreference())

    return <div className="diet-buttons">
        {
            groupIntoPairs(buttons).map((pair, index) => {
                return <div className="diet-button-pair" key={index}>
                    {pair}
                </div>
            })
        }
    </div>
}