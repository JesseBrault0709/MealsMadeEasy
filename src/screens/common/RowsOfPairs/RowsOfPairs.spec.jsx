import { render } from '@testing-library/react'
import { RowsOfPairs } from './RowsOfPairs'

it('renders without throwing', () => {
    render(<RowsOfPairs>
        <div>Hello</div>
        <div>World!</div>
    </RowsOfPairs>)
})