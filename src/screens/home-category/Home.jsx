import { ScreenWithTitleAndNav } from "../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { SearchBar } from "../../inputs/SearchBar/SearchBar"
import { TimeDietAllergies } from './TimeDietAllergies/TimeDietAllergies'
import { RecipeRow } from "./RecipeRow/RecipeRow"

/**
 * @param {{
 *  categories?: {
 *      categoryTitle?: string,
 *      recipes?: {
 *          title?: string
 *      }[]
 *  }[]
 * }} props 
 */
export function Home(props) {
    return <ScreenWithTitleAndNav title="Recipes" activeNavButton="RECIPES">
        <SearchBar />
        <TimeDietAllergies />
        {
            props.categories?.map(category => 
                <RecipeRow rowTitle={category.categoryTitle} recipes={category.recipes} />
            )
        }
    </ScreenWithTitleAndNav>
}