/**
 * TODO as of 6/28/21:
 *  * Remove the custom css in favor of React-Bootstrap
 *      Container/Row/Col
 *  * Figure out how to correctly position the back button
 *  * Move the back button chevron from RecipeInfo/assets to
 *      an assets dir to be created here for use here
 *  * Put the chevron in the back button
 *  * Un-TS this file
 */

import './ScreenTitle.css'
import { Button } from "react-bootstrap"

export type ScreenTitleProps = {
    title: string,
    onBackButtonClick?: () => void
}

export function ScreenTitle(props: ScreenTitleProps) {
    return <div className="screen-title">
        {
            props.onBackButtonClick !== undefined && props.onBackButtonClick !== null ?
                <Button onClick={props.onBackButtonClick}>
                    [back]
                </Button>
                : ''
        }
        <h1 className="screen-title-title">{props.title}</h1>
    </div>
}