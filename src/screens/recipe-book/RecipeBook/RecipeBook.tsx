import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { TimeDietAllergies, TimeDietAllergiesProps } from "../TimeDietAllergies/TimeDietAllergies"
import { MealTabBar, MealTabBarProps } from "../MealTabBar/MealTabBar"
import { RecipesGrid, RecipesGridProps } from "../RecipesGrid/RecipesGrid"

export type RecipeBookProps = {
    tags: TimeDietAllergiesProps['tags']
    tabs: MealTabBarProps['tabs']
    recipes: RecipesGridProps['recipes']
}

export function RecipeBook(props: RecipeBookProps) {
    return <ScreenWithTitleAndNav title="Recipe Book" activeNavButton="RECIPES" >
        <TimeDietAllergies tags={props.tags}/>
        <MealTabBar tabs={props.tabs} />
        <RecipesGrid recipes={props.recipes} />
    </ScreenWithTitleAndNav>
}