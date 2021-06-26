import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { TimeDietAllergies } from "../TimeDietAllergies/TimeDietAllergies"
import { MealTabBar } from "../MealTabBar/MealTabBar"
import { RecipesGrid } from "../RecipesGrid/RecipesGrid"
import { RecipeOverview } from "../../../client/RecipeOverview"

/**
 * @param {{
 *  tags: ReadonlyArray<{
 *      name: string,
 *      values: ReadonlyArray<string>
 *  }>,
 *  tabs: ReadonlyArray<{
 *      name: string,
 *      type: SPType,
 *      onClick?: () => void
 *  }>,
 *  recipes: ReadonlyArray<RecipeOverview>
 * }} props
 */
export function RecipeBook(props) {
    return <ScreenWithTitleAndNav title="Recipe Book" activeNavButton="RECIPES" >
        <TimeDietAllergies tags={props.tags}/>
        <MealTabBar tabs={props.tabs} />
        <RecipesGrid recipes={props.recipes} />
    </ScreenWithTitleAndNav>
}