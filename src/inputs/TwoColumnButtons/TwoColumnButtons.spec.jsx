import { render } from '@testing-library/react'
import { Button } from 'react-bootstrap'
import { TwoColumnButtons } from './TwoColumnButtons'

it('renders without throwing when given proper children', () => {
    render(<TwoColumnButtons>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
    </TwoColumnButtons>)
})