import { useState } from 'react'
import { TimeDietAllergies } from "./TimeDietAllergies/TimeDietAllergies"
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { RecipeListTab } from './RecipeListTab/RecipeListTab'

/**
 * @param {{
 *  cookingTime: string,
 *  diet: SPDiet,
 *  intolerances: ReadonlyArray<SPIntolerance>,
 * 
 *  recipeResultSetSize: number
 *  onRecipeCardClick: (recipe: RecipeOverview) => void,
 * 
 *  tabs: ReadonlyArray<{
 *      name: string,
 *      getRecipes: (
 *          offset?: number,
 *          limit?: number
 *      ) => Promise<ReadonlyArray<RecipeOverview>>
 *  }>
 * }} props 
 */
export function RecipeList(props) {

    const [activeTab, setActiveTab] = useState(props.tabs[0])

    const getOnTabClick = tab => () => {
        setActiveTab(tab)
    }

    return <div className="recipe-list">
        <TimeDietAllergies cookingTime={props.cookingTime} diet={props.diet} intolerances={props.intolerances} />
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
        {
            props.tabs.map((tab, index) => 
                <RecipeListTab
                    key={tab.name}
                    active={tab === activeTab}
                    getRecipes={tab.getRecipes}
                    onRecipeCardClick={props.onRecipeCardClick}
                    recipeResultSetSize={props.recipeResultSetSize}
                />
            )
        }
    </div>
}