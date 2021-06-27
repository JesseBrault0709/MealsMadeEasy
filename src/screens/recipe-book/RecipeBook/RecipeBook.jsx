import { MealTabBar } from "../MealTabBar/MealTabBar"
import { RecipesGrid } from "../RecipesGrid/RecipesGrid"
import { useEffect, useState } from "react"
import { getByComplexSearch } from "../../../client/complexSearch"
import { TimeDietAllergies } from "../TimeDietAllergies/TimeDietAllergies"

const tabs = [
    "Breakfast", "Lunch", "Dinner"
]

/**
 * Props:
 *  cookingTime: string
 *  diet: SPDiet
 *  intolerances: readonly SPIntolerance[]
 */
export function RecipeBook(props) {

    const [recipes, setRecipes] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    const onTabClick = tabIndex => {
        setActiveTab(tabIndex)
    }

    useEffect(() => {
        getByComplexSearch({
            addRecipeInformation: true,
            diet: props.diet,
            intolerances: props.intolerances,
            type: activeTab === 0 ? "breakfast" : "main course"
        }).then(setRecipes)
    }, [activeTab])

    return <>
        <TimeDietAllergies cookingTime={props.cookingTime} diet={props.diet} intolerances={props.intolerances} />
        <MealTabBar tabs={tabs} activeTab={activeTab} onClick={onTabClick} />
        <RecipesGrid recipes={recipes} />
    </>
}