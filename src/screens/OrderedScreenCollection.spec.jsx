import { render, screen } from '@testing-library/react'
import { OrderedScreenCollection } from './OrderedScreenCollection'

it('renders without throwing when given no children', () => {
    render(<OrderedScreenCollection />)
})

it('renders without throwing when given children', () => {
    render(<OrderedScreenCollection>
        <span>child 1</span>
        <span>child 2</span>
        <span>child 3</span>
    </OrderedScreenCollection>)
})

it('renders only the first child', () => {
    const childTexts = ['Hello', 'World']

    render(<OrderedScreenCollection>
        {childTexts.map(childText => <span key={childText}>{childText}</span>)}
    </OrderedScreenCollection>)

    expect(screen.getByText(childTexts[0])).toBeInTheDocument()
    expect(screen.queryByText(childTexts[1])).not.toBeInTheDocument()
})