import { render } from '@testing-library/react'
import { ScreenTitle } from './ScreenTitle'

it('renders without throwing', () => {
    render(<ScreenTitle title="Hello World!" />)
})