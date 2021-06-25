import { render } from '@testing-library/react'
import { TagChip } from './TagChip'

it('renders without throwing', () => {
    render(<TagChip name="Diet" values={["Vegan"]}/>)
})