import "./App.css";

import AppConfig from './AppConfig_en.json'

import { Dispatch, Reducer, useReducer, useState } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { SPDiet, SPIntolerance } from './client/spoonacularTypes';
import { Home } from './screens/home/Home';
import { RecipePreferences } from './types/RecipePreferences';
import { getWeekOfBlankDayMealPlans } from './types/DayMealPlan';
import { MealName } from './types/MealName';
import { Sweet } from "./screens/Sweet/Sweet";
import { RecipeListConfig } from "./types/RecipeListTabConfig";
import { useEffect } from "react";
import { RecipeOverview } from "./client/RecipeOverview";
import { getByComplexSearch } from "./client/complexSearch";
import { copyMapAndSet, copyMapWithMapper, mapToArray } from "./util";
import { RecipeListSpec } from "./screens/recipe-book/RecipeLists/RecipeLists";
import { Splash } from "./screens/Splash/Splash";


/** Set to true for dev mode. */
export const DEV_MODE: boolean = true

/** Configurations from config file */

const availableCookingTimes = 
    AppConfig.availableCookingTimes as 
        ReadonlyArray<RecipePreferences['cookingTime']>

const availableDiets = AppConfig.availableDiets as ReadonlyArray<SPDiet>

const availableIntolerances = 
    AppConfig.availableIntolerances as ReadonlyArray<SPIntolerance>

const meals = AppConfig.meals as ReadonlyArray<MealName>

const recipeListConfigs = AppConfig.recipeListTabs as ReadonlyArray<RecipeListConfig>

const recipeListLimit: number = AppConfig.recipeListLimit

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
                    return [listName, offset + recipeListLimit]
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
    recipeListConfigs.forEach(config => {
        offsets.set(config.name, 0)
    })
    return offsets
}

const initRecipeListRecipes = (): ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>> => {
    const recipes = new Map<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>()
    recipeListConfigs.forEach(config => {
        recipes.set(config.name, new Map())
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
            number: recipeListLimit,
            offset,
            type: recipeListConfigs.find(config => config.name === listName)?.type
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
    }, [recipeListOffsets, userPreferences])

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
    }, [currentScreen, userPreferences])

    const [activeRecipeListTab, setActiveRecipeListTab] = useState<string>(recipeListConfigs[0].name)

    const listSpecs: ReadonlyArray<RecipeListSpec> = recipeListConfigs.map(config => {
        const allRecipes: RecipeOverview[] = []

        const offsetRecipesMap = recipeListRecipes.get(config.name)
        if (offsetRecipesMap === undefined) {
            throw new Error(`tabName ${config.name} has no offsetRecipesMap`)
        }

        offsetRecipesMap.forEach((recipes) => {
            allRecipes.push(...recipes)
        })

        const onLoadMore = () => {
            dispatchRecipeListOffsets({
                type: "recipeListOffset/increment",
                payload: {
                    listName: config.name
                }
            })
        }
        
        return {
            name: config.name,
            active: activeRecipeListTab === config.name,
            onTabClick: () => {
                setActiveRecipeListTab(config.name)
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
                allCookingTimes={availableCookingTimes}
                allDiets={availableDiets}
                allIntolerances={availableIntolerances}
                onSubmit={onOnboardingSubmit}
            />
    
        } else if (currentScreen === "Sweet") { 

            return <Sweet />

        } else if (currentScreen === "Home") {
    
            return <Home
                initialRecipePreferences={userPreferences}
                initialDayMealPlans={getWeekOfBlankDayMealPlans(meals)}
                meals={meals}
                listSpecs={listSpecs}
            />
        }
    }

    return <div className="App">
        {getScreen()}
    </div>

}

export default App;

