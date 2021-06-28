import { useEffect, useState } from 'react'
import { Container } from "react-bootstrap"
import { TimeDietAllergies } from "./TimeDietAllergies/TimeDietAllergies"
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { RowsOfPairs } from '../../common/RowsOfPairs/RowsOfPairs'
import { RecipeCard } from './RecipeCard/RecipeCard'

/**
 * @param {{
 *  cookingTime: string,
 *  diet: SPDiet,
 *  intolerances: ReadonlyArray<SPIntolerance>,
 * 
 *  onRecipeCardClick: (recipe: RecipeOverview) => void,
 * 
 *  tabs: ReadonlyArray<{
 *      name: string,
 *      getRecipes: () => Promise<ReadonlyArray<RecipeOverview>>
 *  }>
 * }} props 
 */
export function RecipeList(props) {

    const [activeTab, setActiveTab] = useState(props.tabs[0])
    const [recipes, setRecipes] = useState([])

    const getOnTabClick = tab => () => {
        setActiveTab(tab)
    }

    const getOnRecipeCardClick = recipe => () => props.onRecipeCardClick(recipe)

    useEffect(() => {
        activeTab.getRecipes().then(setRecipes)
    }, [activeTab])

    return <Container>
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
        <RowsOfPairs>
            {
                recipes.map(recipe => <RecipeCard key={recipe.title} recipe={recipe} onClick={getOnRecipeCardClick(recipe)} />)
            }
        </RowsOfPairs>
    </Container>
}