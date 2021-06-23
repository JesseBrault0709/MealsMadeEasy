import { render } from "@testing-library/react";
import { Restrictions } from "./Restrictions";

it('renders without throwing', () => {
    render(<Restrictions restrictions={['gluten free', 'dairy free']}/>)
})