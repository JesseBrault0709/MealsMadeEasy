import './CarouselInput.css'
import { Carousel } from "react-bootstrap"
import { useState } from 'react'

/**
 * Props:
 *  * options: string[]: the array of options to select from
 *  * initialIndex: number, default = 0: the index of the first option to display
 *  * onChange: (selectedIndex: number) => void, optional: a callback to be run when the input is changed
 */
export function CarouselInput(props) {

    const [currentSelection, setCurrentSelection] = useState(props.initialIndex ?? 0) // start with first option

    /**
     * 'left' is increase, 'right' is decrease!
     */
    function onSlide(eventKey, direction) {

        function setToNextSelection(nextSelection) {
            setCurrentSelection(nextSelection)
            if (props.onChange !== undefined && props.onChange !== null) {
                props.onChange(nextSelection)
            }
        }

        if (direction === "right") {
            if (currentSelection === 0) { // if first item
                setToNextSelection(props.options.length - 1) // set to last item
            } else {
                setToNextSelection(currentSelection - 1)
            }
        } else if (direction === "left") {
            if (currentSelection === props.options.length - 1) { // if last item
                setToNextSelection(0) // set to first item (0 index)
            } else {
                setToNextSelection(currentSelection + 1)
            }
        }
    }

    return <Carousel interval={null} onSlide={onSlide}>
        {
            props.options.map(option => <Carousel.Item key={option}>{option}</Carousel.Item>)
        }
    </Carousel>
}