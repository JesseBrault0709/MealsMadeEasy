import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';

import "./App.css";
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/transitions/Sweet';
import { RecipeBook } from './screens/recipe-book/RecipeBook/RecipeBook';
import { SPDiet, SPIntolerance, SPType } from './client/spoonacularTypes';
import { getByComplexSearch } from './client/complexSearch'
import { RecipeOverview } from './client/RecipeOverview';

const Screens = Object.freeze({
    ONBOARDING: "ONBOARDING",
    SWEET: "SWEET",
    RECIPE_BOOK: "RECIPE BOOK"
})

/**
 * For now these are hard-coded but eventually we want to move these elsewhere,
 * if possible.
 */
const availableCookingTimes = ['No limit', '15 mins', '30 mins', '45 mins', '60 minutes', '90 minutes']

const availableDiets: ReadonlyArray<SPDiet> = [
    'Vegan', 'Vegetarian',
    'Ketogenic', 'Pescetarian',
    'Paleo', 'Whole30'
]

const availableIntolerances: ReadonlyArray<SPIntolerance> = [
    'Dairy', 'Egg',
    'Gluten', 'Grain',
    'Peanut', 'Seafood',
    'Wheat'
]

function App() {

    const [currentScreen, setCurrentScreen] = useState(Screens.ONBOARDING)

    const [cookingTime, setCookingTime] = useState(undefined as string | undefined)
    const [diet, setDiet] = useState(undefined as SPDiet | undefined)
    const [intolerances, setIntolerances] = useState(undefined as ReadonlyArray<SPIntolerance> | undefined)

    const [tags, setTags] = useState([] as ReadonlyArray<{
        name: string,
        values: ReadonlyArray<string>
    }>)
    const [recipes, setRecipes] = useState([] as ReadonlyArray<RecipeOverview>)

    const refreshRecipes = (diet?: SPDiet, intolerances?: ReadonlyArray<SPIntolerance>, type?: SPType) => {
        getByComplexSearch({
            diet, intolerances, type,
            addRecipeInformation: true
        }).then(setRecipes)
    }

    const tabs: ReadonlyArray<{
        name: string,
        type: SPType,
        onClick: () => void
    }> = [
        {
            name: 'Breakfast',
            type: 'breakfast',
            onClick: () => {
                refreshRecipes(diet, intolerances, 'breakfast')
            }
        },
        {
            name: 'Lunch',
            type: 'main course',
            onClick: () => {
                refreshRecipes(diet, intolerances, 'main course')
            }
        },
        {
            name: 'Dinner',
            type: 'main course',
            onClick: () => {
                refreshRecipes(diet, intolerances, 'main course')
            }
        }
    ]

    if (currentScreen === Screens.ONBOARDING) {

        const onOnboardingSubmit = (
            cookingTime: string, 
            diet: SPDiet, 
            intolerances: ReadonlyArray<SPIntolerance>
        ) => {
            console.log({
                cookingTime, diet, intolerances
            })
            setCurrentScreen(Screens.SWEET)
            setCookingTime(cookingTime)
            setDiet(diet)
            setIntolerances(intolerances)
            setTags([
                {
                    name: "Time",
                    values: [cookingTime]
                },
                {
                    name: "Diet",
                    values: [diet]
                },
                {
                    name: "Allergies",
                    values: intolerances
                }
            ])
        }

        return <div className="App">
            <Onboarding
                cookingTimes={availableCookingTimes}
                diets={availableDiets}
                restrictions={availableIntolerances}
                onSubmit={onOnboardingSubmit}
            />
        </div>

    } else if (currentScreen === Screens.SWEET) {

        const timeoutPromise = new Promise(resolve => {
            setTimeout(resolve, 1000)
        })

        const searchPromise = getByComplexSearch({
            diet, intolerances, type: tabs[0].type,
            addRecipeInformation: true
        })

        Promise.all([
            searchPromise, timeoutPromise
        ]).then(results => {
            setCurrentScreen(Screens.RECIPE_BOOK)
            setRecipes(results[0])
        })

        return <div className="App">
            <Sweet />
        </div>

    } else if (currentScreen === Screens.RECIPE_BOOK) {

        return <div className="App">
            <RecipeBook tags={tags} tabs={tabs} recipes={recipes} />
        </div>
    }

}

export default App;

