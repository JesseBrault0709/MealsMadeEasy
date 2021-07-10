/**
 * TODO as of 6/28/21:
 *  * Figure out how to correctly position the back button
 *  * Move the back button chevron from RecipeInfo/assets to
 *      an assets dir to be created here for use here
 *  * Put the chevron in the back button
 */

import './ScreenTitle.css'

import ChevronDown from './assets/ChevronDown.png'

export type ScreenTitleProps = {
    title: string,
    subtitle?: string,
    onBackButtonClick?: () => void
}

export function ScreenTitle(props: ScreenTitleProps) {
    return <div className="screen-title">
        {
            props.onBackButtonClick !== undefined ?
                <div className="screen-title-back-button" onClick={props.onBackButtonClick}>
                    <img src={ChevronDown} alt="Back" />
                </div>
                : ''
        }
        <div className="screen-title-title-subtitle">
            <h1 className="screen-title-title">{props.title}</h1>
            <h3 className="screen-title-subtitle">{props.subtitle}</h3>
        </div>
    </div>
}