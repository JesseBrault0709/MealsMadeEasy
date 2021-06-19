import './ClockSlider.css'

import { useRef, useState } from 'react'

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
 * Props:
 *  * options: string[]: an array of string options containing at least one element
 *  * initialOption: number, default = 0: the index of the initially selected option
 *  * onChange: (selectedIndex: number) => void: a callback for when the selected option changes
 */
export function ClockSlider(props) {

    const { options } = props

    // TODO: write test(s) for this
    if (options.length < 1) {
        throw new Error('props.options must contain at least one element')
    }

    const [currentCenter, setCurrentCenter] = useState(props.initialOption ?? 0)

    const leftHiddenRef = useRef()
    const leftRef = useRef()
    const centerRef = useRef()
    const rightRef = useRef()
    const rightHiddenRef = useRef()

    function runOnChangeCallback(nextCenter) {
        if (props.onChange !== undefined && props.onChange !== null) {
            props.onChange(nextCenter)
        }
    }

    function clockwise() {

        const leftHiddenAnimation = leftHiddenRef.current.animate(leftHiddenToLeft, timingOptions)
        const leftAnimation = leftRef.current.animate(leftToCenter, timingOptions)
        const centerAnimation = centerRef.current.animate(centerToRight, timingOptions)
        const rightAnimation = rightRef.current.animate(rightToRightHidden, timingOptions)

        Promise.all([
            leftHiddenAnimation.finished,
            leftAnimation.finished,
            centerAnimation.finished,
            rightAnimation.finished
        ]).then(() => {
            const nextCenter = (currentCenter - 1 < 0) ? 0 : currentCenter - 1
            setCurrentCenter(nextCenter)
            runOnChangeCallback(nextCenter)
        })
    }

    function counterClockwise() {

        const rightHiddenAnimation = rightHiddenRef.current.animate(rightHiddenToRight, timingOptions)
        const rightAnimation = rightRef.current.animate(rightToCenter, timingOptions)
        const centerAnimation = centerRef.current.animate(centerToLeft, timingOptions)
        const leftAnimation = leftRef.current.animate(leftToLeftHidden, timingOptions)

        Promise.all([
            rightHiddenAnimation.finished,
            rightAnimation.finished,
            centerAnimation.finished,
            leftAnimation.finished
        ]).then(() => {
            const nextCenter = (currentCenter + 1 >= options.length) ? currentCenter : currentCenter + 1
            setCurrentCenter(nextCenter)
            runOnChangeCallback(nextCenter)
        })

    }

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