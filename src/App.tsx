import "./App.css";

import { Dispatch, Reducer, useReducer, useState } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { Home } from './screens/home/Home';
import { RecipePreferences } from './types/RecipePreferences';
import { getWeekOfBlankDayMealPlans } from './types/DayMealPlan';
import { Sweet } from "./screens/Sweet/Sweet";
import { useEffect } from "react";
import { RecipeOverview } from "./client/RecipeOverview";
import { getByComplexSearch } from "./client/complexSearch";
import { copyMapAndSet, copyMapWithMapper, mapToArray } from "./util";
import { RecipeListSpec } from "./screens/recipe-book/RecipeLists/RecipeLists";
import { Splash } from "./screens/Splash/Splash";
import { appConfig } from "./appConfig";

/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

/** Reducers */

type RecipeListOffsetReducerAction = {
    type: "recipeListOffset/increment",
    payload: {
        listName: string
    }
}

const recipeListOffsetReducer: Reducer<ReadonlyMap<string, number>, RecipeListOffsetReducerAction> = (state, action) => {
    if (action.type === "recipeListOffset/increment") {
        return copyMapWithMapper(
            state,
            (listName, offset) => {
                if (listName === action.payload.listName) {
                    return [listName, offset + appConfig.recipeListLimit]
                } else {
                    return [listName, offset]
                }
            }
        )
    } else {
        return state
    }
}

type RecipeListRecipesReducerAction = {
    type: "recipeListRecipes/add",
    payload: {
        listName: string,
        offset: number,
        recipes: ReadonlyArray<RecipeOverview>
    }
}

const recipeListRecipesReducer: 
    Reducer<
        ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>, 
        RecipeListRecipesReducerAction> = 
(state, action) => {

    if (action.type === "recipeListRecipes/add") {
        return copyMapWithMapper(
            state,
            (listName, offsetRecipesMap) => {
                if (listName === action.payload.listName) {
                    return [
                        listName, 
                        copyMapAndSet(
                            offsetRecipesMap, 
                            action.payload.offset, 
                            action.payload.recipes
                        )
                    ]
                } else {
                    return [listName, offsetRecipesMap]
                }
            }
        )
    } else {
        return state
    }

}

/** Initializers */

const initRecipeListOffsets = () => {
    const offsets = new Map<string, number>()
    appConfig.recipeLists.forEach(list => {
        offsets.set(list.name, 0)
    })
    return offsets
}

const initRecipeListRecipes = (): ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>> => {
    const recipes = new Map<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>()
    appConfig.recipeLists.forEach(list => {
        recipes.set(list.name, new Map())
    })
    return recipes
}

/** functions */

const getAddRecipesForOffset = (
    recipeListRecipes: ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>,
    userPreferences: RecipePreferences,
    dispatchRecipeListRecipes: Dispatch<RecipeListRecipesReducerAction>
) => (
    listName: string,
    offset: number
): Promise<void> => {
    const offsetRecipesMap = recipeListRecipes.get(listName)

    if (offsetRecipesMap === undefined) {
        throw new Error(`listName ${listName} has no entry in recipeListRecipes`)
    }

    const recipesForOffset = offsetRecipesMap.get(offset)

    if (recipesForOffset === undefined) {
        // it's undefined so we fetch the recipes
        return getByComplexSearch({
            addRecipeInformation: true,
            diet: userPreferences.diet,
            intolerances: userPreferences.intolerances,
            maxReadyTime: userPreferences.cookingTime === "No Limit" ? undefined : userPreferences.cookingTime,
            number: appConfig.recipeListLimit,
            offset,
            type: appConfig.recipeLists.find(list => list.name === listName)?.type
        }).then(recipes => {
            dispatchRecipeListRecipes({
                type: "recipeListRecipes/add",
                payload: {
                    listName,
                    offset,
                    recipes
                }
            })
            return Promise.resolve()
        })
    } else {
        return Promise.resolve()
    }
}

/** The possible screens */
type Screen = "Splash" | "Onboarding" | "Sweet" | "Home"

function App() {

    const [currentScreen, setCurrentScreen] = useState<Screen>("Splash")

    const [userPreferences, setUserPreferences] = useState<RecipePreferences>({
        cookingTime: 'No Limit',
        intolerances: []
    })

    const [recipeListOffsets, dispatchRecipeListOffsets] = useReducer(recipeListOffsetReducer, initRecipeListOffsets())

    const [recipeListRecipes, dispatchRecipeListRecipes] = useReducer(recipeListRecipesReducer, initRecipeListRecipes())

    const fetchRecipesForOffsets = (): Promise<void[]> => {
        const promises = mapToArray(recipeListOffsets, getAddRecipesForOffset(
            recipeListRecipes,
            userPreferences,
            dispatchRecipeListRecipes
        ))
        return Promise.all(promises)
    }

    useEffect(() => {
        if (currentScreen === "Home") {
            fetchRecipesForOffsets()
            .catch(err => {
                console.error(err)
            })
        }
    }, [currentScreen, recipeListOffsets, userPreferences]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentScreen === "Sweet") {
            fetchRecipesForOffsets()
            .then(() => {
                setCurrentScreen("Home")
            })
            .catch(err => {
                console.error(err)
            })
        }
    }, [currentScreen, userPreferences]) // eslint-disable-line react-hooks/exhaustive-deps

    const [activeRecipeListTab, setActiveRecipeListTab] = useState<string>(appConfig.recipeLists[0].name)

    const listSpecs: ReadonlyArray<RecipeListSpec> = appConfig.recipeLists.map(list => {
        const allRecipes: RecipeOverview[] = []

        const offsetRecipesMap = recipeListRecipes.get(list.name)
        if (offsetRecipesMap === undefined) {
            throw new Error(`tabName ${list.name} has no offsetRecipesMap`)
        }

        offsetRecipesMap.forEach((recipes) => {
            allRecipes.push(...recipes)
        })

        const onLoadMore = () => {
            dispatchRecipeListOffsets({
                type: "recipeListOffset/increment",
                payload: {
                    listName: list.name
                }
            })
        }
        
        return {
            name: list.name,
            active: activeRecipeListTab === list.name,
            onTabClick: () => {
                setActiveRecipeListTab(list.name)
            },
            recipes: allRecipes,
            onLoadMore
        }
    })

    useEffect(() => {
        if (currentScreen === "Splash") {
            setTimeout(() => {
                setCurrentScreen("Onboarding")
            }, 2000)
        }   
    })

    const getScreen = () => {
        if (currentScreen === "Splash") {
            
            return <Splash />

        } else if (currentScreen === "Onboarding") {

            const onOnboardingSubmit = (preferences: RecipePreferences) => {
                setUserPreferences(preferences)
                setCurrentScreen("Sweet")
            }
    
            return <Onboarding
                allCookingTimes={appConfig.availableCookingTimes}
                allDiets={appConfig.availableDiets}
                allIntolerances={appConfig.availableIntolerances}
                onSubmit={onOnboardingSubmit}
            />
    
        } else if (currentScreen === "Sweet") { 

            return <Sweet />

        } else if (currentScreen === "Home") {
    
            return <Home
                initialRecipePreferences={userPreferences}
                initialDayMealPlans={getWeekOfBlankDayMealPlans(appConfig.meals)}
                meals={appConfig.meals}
                listSpecs={listSpecs}
            />
        }
    }

    return <div className="App">
        {getScreen()}
    </div>

}

export default App;

