import './Restrictions.css'

import { OnboardingScreen } from "../OnboardingScreen/OnboardingScreen"
import { JBButton } from "../../../inputs/Button/JBButton"
import { groupIntoPairs } from "../../../util"
import React from 'react'
import { SPIntolerance } from '../../../client/spoonacularTypes'
import { appConfig } from '../../../appConfig'

export type IntolerancesInputProps = {
    renderButton: (intolerance: SPIntolerance) => React.ReactNode
}

export function IntolerancesInput(props: IntolerancesInputProps) {

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

export type RestrictionsProps = {

    /** A Map of restriction-strings to booleans indicating whether they are selected or not */
    restrictions: Map<string, boolean>

    /** A callback for when a restriction-button is clicked */
    onClick?: (restriction: string) => void

}

/**
 * The page for the user to select any dietary restrictions
 * (elsewhere referred to as 'intolerances' or 'allergies').
 */
export function Restrictions(props: RestrictionsProps) {

    const buttons: React.ReactNode[] = []

    props.restrictions.forEach((isSelected, restriction) => {

        const onClick = () => {
            if (props.onClick !== undefined) {
                props.onClick(restriction)
            }
        }

        buttons.push(
            <JBButton
                variant="circle-large" 
                active={isSelected} 
                onClick={onClick} 
                key={restriction}
                style={{
                    margin: '10px'
                }}
            >
                {restriction}
            </JBButton>
        )

    })

    return <OnboardingScreen
        prompt="Do you have any allergies?"
        instruction="Select any allergies you may have."
    >
        <div className="restrictions-buttons">
            {
                groupIntoPairs(buttons).map((pair, index) => {
                    return <div key={index} className="restriction-button-pair">
                        {pair}
                    </div>
                })
            }
        </div>
    </OnboardingScreen>
}