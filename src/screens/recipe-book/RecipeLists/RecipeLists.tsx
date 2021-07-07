import './RecipeLists.css'

import { TimeDietAllergies } from "./TimeDietAllergies/TimeDietAllergies"
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { RecipeOverview } from '../../../client/RecipeOverview'
import { RecipeList, RecipeListProps } from './RecipeList/RecipeList'
import { RecipePreferences } from '../../../types/RecipePreferences'

export type RecipeListSpec = {
    name: string,
    active: boolean,
    onTabClick: () => void,
    recipes: RecipeListProps['recipes'],
    onLoadMore: RecipeListProps['onLoadMoreClick']
}

export type RecipeListsProps = {
    recipePreferences: RecipePreferences

    onRecipeCardClick: (recipe: RecipeOverview) => void,

    lists: ReadonlyArray<RecipeListSpec>
}

export function RecipeLists(props: RecipeListsProps) {

    const activeList = props.lists.find(spec => spec.active)

    if (activeList === undefined) {
        throw new Error('there is no active list')
    }

    return <div className="recipe-lists">
        <TimeDietAllergies 
            cookingTime={props.recipePreferences.cookingTime}
            diet={props.recipePreferences.diet} 
            intolerances={props.recipePreferences.intolerances} 
        />
        <Tabs>
            {
                props.lists.map((spec, index) => 
                    <Tab
                        key={`${index}_${spec.name}`}
                        onClick={spec.onTabClick}
                        active={spec.active}
                    >{spec.name}</Tab>
                )
            }
        </Tabs>
        <RecipeList
            recipes={activeList.recipes}
            onLoadMoreClick={activeList.onLoadMore}
            onRecipeCardClick={props.onRecipeCardClick}
        />
    </div>
}