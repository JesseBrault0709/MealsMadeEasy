import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';

import "./App.css";
import { Onboarding } from './screens/onboarding/Onboarding'
import { Sweet } from './screens/transitions/Sweet';
import { RecipeBook, RecipeBookProps } from './screens/recipe-book/RecipeBook/RecipeBook';
import { dietAllergySearch } from './mid-end/dietAllergySearch'
import { SPDiet, SPIntolerance } from './mid-end/spoonacularTypes';
import { Recipe } from './mid-end/Recipe';
import { getRecipeById } from './mid-end/getRecipeById'

const Screens = Object.freeze({
    ONBOARDING: "ONBOARDING",
    SWEET: "SWEET",
    RECIPE_BOOK: "RECIPE BOOK"
})

/**
 * For now these are hard-coded but eventually we want to move these elsewhere,
 * if possible.
 */
const cookingTimes = ['No limit', '15 mins', '30 mins', '45 mins', '60 minutes', '90 minutes']

const diets: ReadonlyArray<SPDiet> = [
    'Vegan', 'Vegetarian',
    'Ketogenic', 'Pescetarian',
    'Paleo', 'Whole30'
]

const restrictions: ReadonlyArray<SPIntolerance> = [
    'Dairy', 'Egg',
    'Gluten', 'Grain',
    'Peanut', 'Seafood',
    'Wheat'
]

const tabs: RecipeBookProps['tabs'] = [
    {
        name: 'Breakfast'
    },
    {
        name: 'Lunch'
    },
    {
        name: 'Dinner'
    }
]

function App() {

    const [currentScreen, setCurrentScreen] = useState(Screens.ONBOARDING)

    const [cookingTime, setCookingTime] = useState(null as string | null)
    const [diet, setDiet] = useState(null as SPDiet | null)
    const [intolerances, setIntolerances] = useState(null as ReadonlyArray<SPIntolerance> | null)

    const [tags, setTags] = useState([] as RecipeBookProps['tags'])
    const [recipes, setRecipes] = useState([] as RecipeBookProps['recipes'])

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
                    values: [diet[0]]
                },
                {
                    name: "Allergies",
                    values: intolerances
                }
            ])
        }

        return <div className="App">
            <Onboarding
                cookingTimes={cookingTimes}
                diets={diets}
                restrictions={restrictions}
                onSubmit={onOnboardingSubmit}
            />
        </div>

    } else if (currentScreen === Screens.SWEET) {

        const timeoutPromise = new Promise(resolve => {
            setTimeout(resolve, 1000)
        })

        const dietAllergySearchPromise = dietAllergySearch(
            diet, 
            intolerances, 
            null
        )

        Promise.all([
            dietAllergySearchPromise, timeoutPromise
        ]).then(results => {
            setCurrentScreen(Screens.RECIPE_BOOK)
            const recipeResults = results[0]
            const infoPromises: Promise<Recipe>[] = recipeResults.map(recipeResult => {
                return getRecipeById(recipeResult.id)
            })
            Promise.all(infoPromises).then(results => {
                setRecipes(results)
            })
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

