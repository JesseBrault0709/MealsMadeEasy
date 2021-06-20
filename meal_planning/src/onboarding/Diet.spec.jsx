import { render } from "@testing-library/react";
import { Diet } from "./Diet";

it('renders without throwing', () => {
    render(<Diet diets={['keto', 'whole 30']} />)
})