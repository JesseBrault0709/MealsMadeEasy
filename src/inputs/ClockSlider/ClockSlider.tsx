import './ClockSlider.css'

import React, { useRef, useState } from 'react'

/**
 * Styles for each position on the clock slider. 
 */

const leftRightOpacity = '60%'
const hiddenOpacity = '0%'

const nonCenterStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'var(--primary-fill)',
}

const leftHiddenStyle = {
    transform: 'translateX(50px) translateY(90px) rotate(-90deg)',
    opacity: hiddenOpacity,
    ...nonCenterStyle
}

const leftStyle = {
    transform: 'translateX(75px) translateY(50px) rotate(-45deg)',
    opacity: leftRightOpacity,
    ...nonCenterStyle
}

const centerStyle = {
    transform: 'translateX(130px) rotate(0deg)',
    width: '90px',
    height: '90px',
    borderRadius: '45px',
    padding: '20px',
    opacity: '100%',
    backgroundColor: 'var(--main-cta)'
}

const rightStyle = {
    transform: 'translateX(225px) translateY(50px) rotate(45deg)',
    opacity: '70%',
    ...nonCenterStyle

}

const rightHiddenStyle = {
    transform: 'translateX(250px) translateY(90px) rotate(90deg)',
    opacity: hiddenOpacity,
    ...nonCenterStyle
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
    duration: 300,
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

    /* Touch logic */

    let touchStartX: number | null = null
    let touchCurrentX: number | null = null

    const resetTouch = () => {
        touchStartX = null
        touchCurrentX = null
    }

    const onTouchStart: React.TouchEventHandler<HTMLDivElement> = event => {
        if (event.targetTouches.length === 1) {
            const touch = event.targetTouches.item(0)
            touchStartX = touch.clientX
        }
    }

    const onTouchMove: React.TouchEventHandler<HTMLDivElement> = event => {
        if (event.targetTouches.length === 1) {
            const touch = event.targetTouches.item(0)
            touchCurrentX = touch.clientX
        }
    }

    const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = event => {
        if (touchStartX !== null && touchCurrentX !== null) {
            const delta = touchStartX - touchCurrentX
            if (delta > 0) {
                counterClockwise()
            } else {
                clockwise()
            }
        }
        resetTouch()
    }

    const onTouchCancel: React.TouchEventHandler<HTMLDivElement> = event => {
        resetTouch()
    }

    /* Mouse-drag logic */

    let mouseStartX: number | null = null
    let mouseCurrentX: number | null = null

    const resetMouse = () => {
        mouseStartX = null
        mouseCurrentX = null
    }

    const onMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
        mouseStartX = event.clientX
    }

    const onMouseMove: React.MouseEventHandler<HTMLDivElement> = event => {
        if (mouseStartX !== null) {
            mouseCurrentX = event.clientX
        }
    }

    const onMouseUp: React.MouseEventHandler<HTMLDivElement> = event => {
        if (mouseStartX !== null && mouseCurrentX !== null) {
            const delta = mouseStartX - mouseCurrentX
            if (delta > 0) {
                counterClockwise()
            } else {
                clockwise()
            }
        }
        resetMouse()
    }


    return <div 
        className="clock-slider"

        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
    >

        <div ref={leftHiddenRef} className="clock-hour clock-hour-left-hidden" style={leftHiddenStyle}>
            <span>{currentCenter - 2 >= 0 ? options[currentCenter - 2] : ''}</span>
        </div>
        <div ref={leftRef} className="clock-hour clock-hour-left" style={leftStyle}>
            <span>{currentCenter - 1 >= 0 ? options[currentCenter - 1] : ''}</span>
        </div>
        <div ref={centerRef} className="clock-hour clock-hour-center" style={centerStyle}>
            <span>{options[currentCenter]}</span>
        </div>
        <div ref={rightRef} className="clock-hour clock-hour-right" style={rightStyle}>
            <span>{currentCenter + 1 < options.length ? options[currentCenter + 1] : ''}</span>
        </div>
        <div ref={rightHiddenRef} className="clock-hour clock-hour-right-hidden" style={rightHiddenStyle}>
            <span>{currentCenter + 2 < options.length ? options[currentCenter + 2] : ''}</span>
        </div>

    </div>


}