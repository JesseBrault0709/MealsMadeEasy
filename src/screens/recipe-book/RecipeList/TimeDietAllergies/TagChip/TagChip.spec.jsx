import { render } from '@testing-library/react'
import { TagChip } from './TagChip'

it('renders without throwing', () => {
    render(<TagChip tag={{ name: "Diet", values: ["Vegan"] }} />)
})