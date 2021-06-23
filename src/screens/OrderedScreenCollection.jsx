import { useState } from 'react'
import { Button } from 'react-bootstrap'

/**
 * Props:
 *  * onPrevious: function: an action for when the button is clicked.
 */
function PreviousButton(props) {
    return <Button variant="link" onClick={props.onPrevious}>Previous</Button>
}

/**
 * Props:
 *  * onNext: function: an action for when the button is clicked.
 */
function NextButton(props) {
    return <Button variant="link" onClick={props.onNext}>Next</Button>
}


/**
 * Props:
 *  * onPrevious: function: an action to be done when the previous button is clicked.
 *  * onNext: function: an action to be done when the next button is clicked.
 * 
 * Children: the screen to be wrapped.
 */
function OrderedScreen(props) {

    const { onPrevious, onNext } = props

    /**
     * Only show the button if we have an action to run when they are clicked.
     */
    if (
        onPrevious !== undefined && onPrevious !== null &&
        onNext !== undefined && onNext !== null
    ) {
        return <>
            {props.children}
            <PreviousButton onPrevious={onPrevious} />
            <NextButton onNext={onNext} />
        </>
    } else if (onPrevious !== undefined && onPrevious !== null) {
        return <>
            {props.children}
            <PreviousButton onPrevious={onPrevious} />
        </>
    } else {
        return <>
            {props.children}
            <NextButton onNext={onNext} />
        </>
    }
}



/**
 * Props:
 *  * onLastNext: () => void, optional: a callback for the next button on the last screen
 * 
 * Children: the screens from which to choose one to render
 */
export function OrderedScreenCollection(props) {

    const [currentScreenIndex, setCurrentScreenIndex] = useState(0)

    function onPrevious() {
        const targetScreenIndex = currentScreenIndex - 1
        if (targetScreenIndex <= 0) {
            setCurrentScreenIndex(0)
        } else {
            setCurrentScreenIndex(targetScreenIndex)
        }
    }

    function onNext() {
        const targetScreen = currentScreenIndex + 1
        if (targetScreen > props.children.length) {
            setCurrentScreenIndex(props.children.length)
        } else {
            setCurrentScreenIndex(targetScreen)
        }
    }

    if (props.children !== undefined && props.children !== null) {
        if (currentScreenIndex === 0) { // i.e., the first screen
            return <OrderedScreen onNext={onNext}>
                {props.children[currentScreenIndex]}
            </OrderedScreen>
        } else if (currentScreenIndex === props.children.length - 1) { // i.e., the last screen
    
            if (props.onLastNext !== undefined && props.onLastNext !== null) { // if we have a callback for the last screen's next button, show it
                return <OrderedScreen onPrevious={onPrevious} onNext={props.onLastNext}>
                    {props.children[currentScreenIndex]}
                </OrderedScreen>
            } else {
                return <OrderedScreen onPrevious={onPrevious}>
                    {props.children[currentScreenIndex]}
                </OrderedScreen>
            }
    
        } else {
            return <OrderedScreen onPrevious={onPrevious} onNext={onNext}>
                {props.children[currentScreenIndex]}
            </OrderedScreen>
        }   
    } else {
        return ''
    }
}