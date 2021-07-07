import './RecipeLists.css'

import { useState } from 'react'
import { TimeDietAllergies } from "./TimeDietAllergies/TimeDietAllergies"
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { SPDiet, SPIntolerance } from '../../../client/spoonacularTypes'
import { RecipeOverview } from '../../../client/RecipeOverview'
import { RecipeList, RecipeListProps } from './RecipeList/RecipeList'
import { RecipePreferences } from '../../../types/RecipePreferences'

export type RecipeListTabSpec = {
    name: string,

    recipes: RecipeListProps['recipes'],
    onLoadMore: RecipeListProps['onLoadMoreClick']
}

export type RecipeListsProps = {
    recipePreferences: RecipePreferences

    onRecipeCardClick: (recipe: RecipeOverview) => void,

    tabs: ReadonlyArray<RecipeListTabSpec>
}

export function RecipeLists(props: RecipeListsProps) {

    const [activeTab, setActiveTab] = useState<RecipeListTabSpec>(props.tabs[0])

    const getOnTabClick = (tab: RecipeListTabSpec) => () => {
        setActiveTab(tab)
    }

    return <div className="recipe-lists">
        <TimeDietAllergies 
            cookingTime={props.recipePreferences.cookingTime}
            diet={props.recipePreferences.diet} 
            intolerances={props.recipePreferences.intolerances} 
        />
        <Tabs>
            {
                props.tabs.map((tab, index) => 
                    <Tab
                        key={`${index}_${tab.name}`}
                        onClick={getOnTabClick(tab)}
                        active={activeTab === tab}
                    >{tab.name}</Tab>
                )
            }
        </Tabs>
        <RecipeList
            recipes={activeTab.recipes}
            onLoadMoreClick={activeTab.onLoadMore}
            onRecipeCardClick={props.onRecipeCardClick}
        />
    </div>
}