import { RowsOfPairs } from "../../common/RowsOfPairs/RowsOfPairs"
import { useEffect, useState } from "react"
import { getByComplexSearch } from "../../../client/complexSearch"
import { TimeDietAllergies } from "../TimeDietAllergies/TimeDietAllergies"
import { RecipeCard } from "../RecipeCard/RecipeCard"
import { Container } from 'react-bootstrap'
import { Tab, Tabs } from "../../common/Tabs/Tabs"
import { RecipeInfo } from "../RecipeInfo/RecipeInfo"
import { getRecipeInformation } from "../../../client/recipeInformation"

const tabs = [
    "Breakfast", "Lunch", "Dinner"
]

const SubScreen = Object.freeze({
    RECIPE_LIST: "Recipe List",
    RECIPE_INFO: "Recipe Info"
})

/**
 * Props:
 *  cookingTime: string
 *  diet: SPDiet
 *  intolerances: readonly SPIntolerance[]
 */
export function RecipeBook(props) {

    const [listOrInfo, setListOrInfo] = useState(SubScreen.RECIPE_LIST)

    const [recipes, setRecipes] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        getByComplexSearch({
            addRecipeInformation: true,
            diet: props.diet,
            intolerances: props.intolerances,
            type: activeTab === 0 ? "breakfast" : "main course"
        }).then(setRecipes)
    }, [activeTab])

    const [currentRecipeId, setCurrentRecipeId] = useState()

    const getOnRecipeCardClick = recipe => () => {
        setCurrentRecipeId(recipe.id)
        setListOrInfo(SubScreen.RECIPE_INFO)
    }

    if (listOrInfo === SubScreen.RECIPE_LIST) {
        return <Container>
            <TimeDietAllergies cookingTime={props.cookingTime} diet={props.diet} intolerances={props.intolerances} />
            <Tabs>
                {
                    tabs.map((tab, index) => 
                        <Tab
                            key={`${index}_${tab}`}
                            onClick={() => setActiveTab(index)}
                            active={activeTab === index}
                        >{tab}</Tab>
                    )
                }
            </Tabs>
            <RowsOfPairs>
                {
                    recipes.map(recipe => <RecipeCard key={recipe.title} recipe={recipe} onClick={getOnRecipeCardClick(recipe)} />)
                }
            </RowsOfPairs>
        </Container>
    } else if (listOrInfo === SubScreen.RECIPE_INFO) {

        return <RecipeInfo 
                    getRecipe={() => {
                        return getRecipeInformation(currentRecipeId)
                    }}
                    onBackButtonClick={() => {
                        console.log('hello world')
                        setListOrInfo(SubScreen.RECIPE_LIST)
                    }}
        />

    } else {
        throw new Error("unknown value for listOrInfo")
    }
}