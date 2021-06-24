import { render } from "@testing-library/react"
import { RecipeCard } from "./RecipeCard"

it('renders without throwing', () => {
    render(<RecipeCard />)
})