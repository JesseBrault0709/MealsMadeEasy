import { Tab, Tabs } from '../../common/Tabs/Tabs'
import { RecipeOverview } from '../../../client/RecipeOverview'
import { RecipeList } from './RecipeList/RecipeList'
import { useAppDispatch, useAppSelector } from '../../../index'
import { setActiveList } from '../../../slices/recipeLists'

export type RecipeListsProps = {
    /** A callback to be run when a RecipeCard is clicked. */
    onRecipeCardClick: (recipe: RecipeOverview) => void
}

/**
 * A component which renders:
 *  * A Tabs instance with child Tab instances, each
 *      representing a particular recipe type (such as
 *      'main course', 'side dish', etc.)
 *  * A RecipeList instance representing the current active
 *      tab.
 */
export function RecipeLists(props: RecipeListsProps) {
    const dispatch = useAppDispatch()

    /** All the available recipe lists. Each will have a Tab rendered for it. */
    const lists = useAppSelector(state => state.recipeLists.lists)

    /** The currently active (i.e., showing to the user) recipe list. */
    const activeList = useAppSelector(state => state.recipeLists.activeList)

    return (
        <div className="recipe-lists">
            <Tabs>
                {lists.map(list => (
                    <Tab
                        key={list.name}
                        onClick={() => {
                            dispatch(setActiveList({ listName: list.name }))
                        }}
                        active={list.name === activeList}
                    >
                        {list.name}
                    </Tab>
                ))}
            </Tabs>
            {activeList !== undefined ? (
                <RecipeList
                    name={activeList}
                    onRecipeCardClick={props.onRecipeCardClick}
                />
            ) : null}
        </div>
    )
}
