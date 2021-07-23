// import './RecipeLists.css'

import { TimeDietAllergies } from './TimeDietAllergies/TimeDietAllergies'
import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { RecipeOverview } from '../../../client/RecipeOverview'
import { RecipeList } from './RecipeList/RecipeList'
import { useAppDispatch, useAppSelector } from '../../../index'
import {
    fetchRecipes,
    resetAllRecipes,
    setActiveList
} from '../../../slices/recipeLists'

export type RecipeListsProps = {
    onRecipeCardClick: (recipe: RecipeOverview) => void
}

export function RecipeLists(props: RecipeListsProps) {
    const dispatch = useAppDispatch()

    const lists = useAppSelector(state => state.recipeLists.lists)
    const activeList = useAppSelector(state => state.recipeLists.activeList)

    if (activeList === undefined) {
        throw new Error('there is no active list')
    }

    return (
        <div className="recipe-lists">
            <TimeDietAllergies
                onChange={() => {
                    dispatch(resetAllRecipes())
                    dispatch(fetchRecipes(activeList))
                }}
            />
            <Tabs>
                {lists.map(list => (
                    <Tab
                        key={list.name}
                        onClick={() => {
                            dispatch(fetchRecipes(list.name))
                            dispatch(setActiveList({ listName: list.name }))
                        }}
                        active={list.name === activeList}
                    >
                        {list.name}
                    </Tab>
                ))}
            </Tabs>
            <RecipeList
                name={activeList}
                onRecipeCardClick={props.onRecipeCardClick}
            />
        </div>
    )
}
