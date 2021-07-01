import BulletFilled from './assets/BulletFilled.png'
import BulletEmpty from './assets/BulletEmpty.png'

import { useState } from 'react'
import { Button } from 'react-bootstrap'

import { Sequence } from '../Sequence/Sequence'

/**
 * @param {{
 *  onPrevious: () => void
 * }} props
 */
function PreviousButton(props) {
    return <Button variant="link" onClick={props.onPrevious}>Previous</Button>
}

/**
 * @param {{
 *  onNext: () => void
 * }} props
 */
function NextButton(props) {
    return <Button variant="link" onClick={props.onNext}>Next</Button>
}


/**
 * @param {{
 *  onPrevious?: () => void
 *  onNext?: () => void
 * 
 *  index: number
 *  outOf: number
 * 
 *  children: React.ReactNode
 * }} props
 */
function OrderedScreen(props) {

    const { onPrevious, onNext } = props

    const sequence = <Sequence 
        value={props.index + 1} 
        outOf={props.outOf} 
        getCompleted={() => <img src={BulletFilled} style={{ marginLeft: "10px" , marginRight: "10px" }} />}
        getIncomplete={() => <img src={BulletEmpty} style={{ marginLeft: "10px" , marginRight: "10px" }} />} 
    />

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
            {sequence}
            <NextButton onNext={onNext} />
        </>
    } else if (onPrevious !== undefined && onPrevious !== null) {
        return <>
            {props.children}
            <PreviousButton onPrevious={onPrevious} />
            {sequence}
        </>
    } else {
        return <>
            {props.children}
            {sequence}
            <NextButton onNext={onNext} />
        </>
    }
}



/**
 * @param {{
 *  onLastNext?: () => void
 *  children: React.ReactNode
 * }} props
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
            return <OrderedScreen onNext={onNext} index={0} outOf={props.children.length}>
                {props.children[currentScreenIndex]}
            </OrderedScreen>
        } else if (currentScreenIndex === props.children.length - 1) { // i.e., the last screen
    
            if (props.onLastNext !== undefined && props.onLastNext !== null) { // if we have a callback for the last screen's next button, show it
                return <OrderedScreen onPrevious={onPrevious} onNext={props.onLastNext} index={currentScreenIndex} outOf={props.children.length}>
                    {props.children[currentScreenIndex]}
                </OrderedScreen>
            } else {
                return <OrderedScreen onPrevious={onPrevious} index={currentScreenIndex} outOf={props.children.length}>
                    {props.children[currentScreenIndex]}
                </OrderedScreen>
            }
    
        } else {
            return <OrderedScreen onPrevious={onPrevious} onNext={onNext} index={currentScreenIndex} outOf={props.children.length}>
                {props.children[currentScreenIndex]}
            </OrderedScreen>
        }   
    } else {
        return null
    }
}