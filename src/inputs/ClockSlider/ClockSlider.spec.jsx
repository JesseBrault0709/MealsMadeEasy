import { render } from "@testing-library/react"
import { ClockSlider } from './ClockSlider'

it('renders without throwing when given correct props', () => {
    render(<ClockSlider options={['Hello world!']}/>)
})