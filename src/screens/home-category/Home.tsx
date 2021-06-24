import { ScreenWithTitleAndNav } from "../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { SearchBar } from "../../inputs/SearchBar/SearchBar"
import { TimeDietAllergies } from './TimeDietAllergies/TimeDietAllergies'
import { RecipeRow } from "./RecipeRow/RecipeRow"
import { Recipe } from "../../recipes/Recipe"

export type HomeProps = {
    categories: ReadonlyArray<{
        title: string,
        recipes: ReadonlyArray<Recipe>
    }>
}
export function Home(props: HomeProps) {
    return <ScreenWithTitleAndNav title="Recipes" activeNavButton="RECIPES">
        <SearchBar />
        <TimeDietAllergies />
        {
            props.categories?.map(category => 
                <RecipeRow title={category.title} recipes={category.recipes} />
            )
        }
    </ScreenWithTitleAndNav>
}