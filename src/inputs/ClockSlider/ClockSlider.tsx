/**
 * TODO as of 6/28/21:
 *  * Remove clockwise/counter-clockwise buttons.
 *  * Write code for touch/swipe
 *  * Write code for click-and-drag 
 */

import './ClockSlider.css'

import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'

/**
 * Styles for each position on the clock slider. 
 */

const leftRightOpacity = '60%'
const hiddenOpacity = '0%'

const leftHiddenStyle = {
    marginLeft: 'calc(50% - 100px - 25px)',
    marginTop: '125px',
    transform: 'rotate(-90deg)',
    opacity: hiddenOpacity
}

const leftStyle = {
    marginLeft: 'calc(50% - 71px - 25px)',
    marginTop: '49px',
    transform: 'rotate(-45deg)',
    opacity: leftRightOpacity
}

const centerStyle = {
    marginLeft: 'calc(50% - 25px)',
    marginTop: '25px',
    transform: 'rotate(0deg)'
}

const rightStyle = {
    marginLeft: 'calc(50% + 71px - 25px)',
    marginTop: '49px',
    transform: 'rotate(45deg)',
    opacity: '70%'
}

const rightHiddenStyle = {
    marginLeft: 'calc(50% + 100px - 25px)',
    marginTop: '125px',
    transform: 'rotate(90deg)',
    opacity: hiddenOpacity
}



// Keyframes for animations

// clockwise
const leftHiddenToLeft = [leftHiddenStyle, leftStyle]
const leftToCenter = [leftStyle, centerStyle]
const centerToRight = [centerStyle, rightStyle]
const rightToRightHidden = [rightStyle, rightHiddenStyle]

// counter-clockwise
const rightHiddenToRight = [rightHiddenStyle, rightStyle]
const rightToCenter = [rightStyle, centerStyle]
const centerToLeft = [centerStyle, leftStyle]
const leftToLeftHidden = [leftStyle, leftHiddenStyle]

// Duration

const timingOptions = {
    duration: 400,
    iterations: 1,
    easing: 'ease-in-out'
}

/**
 * Returns a function that, when called:
 *  1. Checks if the checkPredicate returns true, and if so:
 *  2. Runs the specified animations, and
 *  3. Runs the given onFinished callback when all animations are finished.
 * 
 * If the checkPredicate returns false, it is a no-op.
 */
function getRotation(
    checkPredicate: () => boolean, 
    getAnimations: () => ReadonlyArray<Animation | undefined>, 
    onFinished: () => void
) {

    return () => {
        if (checkPredicate()) {
            Promise.all(
                getAnimations().map(animation => animation?.finished)
            )
                .then(onFinished)
                .catch(console.log)
        }   
    }

}

export type ClockSliderProps = {
    options: string[]
    initialOption?: number
    onChange?: (newValue: string) => void
}

export function ClockSlider(props: React.PropsWithoutRef<ClockSliderProps>) {

    const { options } = props

    // TODO: write test(s) for this
    if (options.length < 1) {
        throw new Error('props.options must contain at least one element')
    }

    const [currentCenter, setCurrentCenter] = useState(props.initialOption ?? 0)

    const leftHiddenRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const centerRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const rightHiddenRef = useRef<HTMLDivElement>(null)

    const runOnChangeCallback = (nextCenter: number) => {
        if (props.onChange !== undefined) {
            props.onChange(options[nextCenter])
        }
    }

    const clockwise = getRotation(
        () => currentCenter > 0,
        () => [
            leftHiddenRef.current?.animate(leftHiddenToLeft, timingOptions),
            leftRef.current?.animate(leftToCenter, timingOptions),
            centerRef.current?.animate(centerToRight, timingOptions),
            rightRef.current?.animate(rightToRightHidden, timingOptions)
        ],
        () => {
            const nextCenter = currentCenter - 1 // guaranteed to be greater than or equal to zero
            setCurrentCenter(nextCenter)
            runOnChangeCallback(nextCenter)
        }
    )

    const counterClockwise = getRotation(
        () => currentCenter < options.length - 1,
        () => [
            rightHiddenRef.current?.animate(rightHiddenToRight, timingOptions),
            rightRef.current?.animate(rightToCenter, timingOptions),
            centerRef.current?.animate(centerToLeft, timingOptions),
            leftRef.current?.animate(leftToLeftHidden, timingOptions)
        ],
        () => {
            const nextCenter = currentCenter + 1 // guaranteed to be less than or equal to index of last element
            setCurrentCenter(nextCenter)
            runOnChangeCallback(nextCenter)
        }
    )

    return <>
        <div className="clock-slider">
            <div ref={leftHiddenRef} className="clock-hour" style={leftHiddenStyle}>
                {currentCenter - 2 >= 0 ? options[currentCenter - 2] : ''}
            </div>
            <div ref={leftRef} className="clock-hour" style={leftStyle}>
                {currentCenter - 1 >= 0 ? options[currentCenter - 1] : ''}
            </div>
            <div ref={centerRef} className="clock-hour" style={centerStyle}>
                {options[currentCenter]}
            </div>
            <div ref={rightRef} className="clock-hour" style={rightStyle}>
                {currentCenter + 1 < options.length ? options[currentCenter + 1] : ''}
            </div>
            <div ref={rightHiddenRef} className="clock-hour" style={rightHiddenStyle}>
                {currentCenter + 2 < options.length ? options[currentCenter + 2] : ''}
            </div>
        </div>
        <div>
            <Button onClick={counterClockwise}>counter-clockwise</Button>
            <Button onClick={clockwise}>clockwise</Button>
        </div>
    </>


}