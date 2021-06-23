import './ScreenTitle.css'
import { Container, Button } from "react-bootstrap"

/**
 * @param {{
 *  title: string,
 *  onBackButtonClick?: () => void
 * }} props 
 */
export function ScreenTitle(props) {
    return <div className="screen-title">
        {
            props.onBackButtonClick !== undefined && props.onBackButtonClick !== null ?
                <Button onClick={props.onBackButtonClick}>
                    [back]
                </Button>
                : ''
        }
        <h1>{props.title}</h1>
    </div>
}