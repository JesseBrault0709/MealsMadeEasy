import './ScreenTitle.css'
import { Container, Button } from "react-bootstrap"

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
        <h1>{props.title}</h1>
    </div>
}