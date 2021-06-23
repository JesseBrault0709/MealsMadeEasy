import { render, screen } from '@testing-library/react'
import { CarouselInput } from './CarouselInput'

it('renders without throwing', () => {
    render(<CarouselInput options={[]}/>)
})

it('renders the options', () => {
    const options = ["Hello", "World"]

    render(<CarouselInput options={options} />)
    
    options.forEach(option =>
        expect(screen.getByText(option)).toBeInTheDocument()
    )
})

// // From the original App.test.jsx
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });