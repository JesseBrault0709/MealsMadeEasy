import "./App.css";

import AppConfig from './AppConfig_en.json'

import { Reducer, useReducer, useState } from 'react';
import { Onboarding } from './screens/onboarding/Onboarding'
import { SPDiet, SPIntolerance } from './client/spoonacularTypes';
import { Home } from './screens/home/Home';
import { RecipePreferences } from './types/RecipePreferences';
import { getWeekOfBlankDayMealPlans } from './types/DayMealPlan';
import { MealName } from './types/MealName';
import { Sweet } from "./screens/Sweet/Sweet";
import { RecipeListTabConfig } from "./types/RecipeListTabConfig";
import { useEffect } from "react";
import { RecipeOverview } from "./client/RecipeOverview";
import { getByComplexSearch } from "./client/complexSearch";
import { copyMapAndSet, copyMapWithMapper } from "./util";


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

const recipeListTabConfigs = AppConfig.recipeListTabs as ReadonlyArray<RecipeListTabConfig>

const recipeListTabLimit: number = AppConfig.recipeListLimit

/** Reducers */

type TabOffsetReducerAction = {
    type: "tabOffset/increment",
    payload: {
        tabName: string
    }
}

const tabOffsetReducer: Reducer<ReadonlyMap<string, number>, TabOffsetReducerAction> = (state, action) => {
    if (action.type === "tabOffset/increment") {
        return copyMapWithMapper(
            state,
            (tabName, offset) => {
                if (tabName === action.payload.tabName) {
                    return [tabName, offset + recipeListTabLimit]
                } else {
                    return [tabName, offset]
                }
            }
        )
    } else {
        return state
    }
}

type TabRecipesReducerAction = {
    type: "tabRecipes/add",
    payload: {
        tabName: string,
        offset: number,
        recipes: ReadonlyArray<RecipeOverview>
    }
}

const tabRecipesReducer: 
    Reducer<
        ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>, 
        TabRecipesReducerAction> = 
(state, action) => {

    if (action.type === "tabRecipes/add") {
        return copyMapWithMapper(
            state,
            (tabName, offsetRecipeMap) => {
                if (tabName === action.payload.tabName) {
                    return [
                        tabName, 
                        copyMapAndSet(
                            offsetRecipeMap, 
                            action.payload.offset, 
                            action.payload.recipes
                        )
                    ]
                } else {
                    return [tabName, offsetRecipeMap]
                }
            }
        )
    } else {
        return state
    }

}

/** Initializers */

const initTabOffsets = () => {
    const offsets = new Map<string, number>()
    recipeListTabConfigs.forEach(config => {
        offsets.set(config.name, 0)
    })
    return offsets
}

const initTabRecipes = (): ReadonlyMap<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>> => {
    const recipes = new Map<string, ReadonlyMap<number, ReadonlyArray<RecipeOverview>>>()
    recipeListTabConfigs.forEach(config => {
        recipes.set(config.name, new Map())
    })
    return recipes
}

/** The possible screens */
type Screen = "Onboarding" | "Sweet" | "Home"

function App() {

    const [currentScreen, setCurrentScreen] = useState<Screen>("Onboarding")

    const [userPreferences, setUserPreferences] = useState<RecipePreferences>({
        cookingTime: 'No Limit',
        intolerances: []
    })

    const [tabOffsets, dispatchTabOffsets] = useReducer(tabOffsetReducer, initTabOffsets())

    const [tabRecipes, dispatchTabRecipes] = useReducer(tabRecipesReducer, initTabRecipes())

    const fetchRecipesForOffsets = (): Promise<void[]> => {
        const promises: Promise<void>[] = []

        tabOffsets.forEach((offset, tabName) => {
            const offsetRecipesMap = tabRecipes.get(tabName)
            if (offsetRecipesMap === undefined) {
                throw new Error(`tabName ${tabName} has no entry in tabRecipes`)
            }
            const recipesForOffset = offsetRecipesMap.get(offset)
            if (recipesForOffset === undefined) {
                const promise = getByComplexSearch({
                    addRecipeInformation: true,
                    diet: userPreferences.diet,
                    intolerances: userPreferences.intolerances,
                    maxReadyTime: userPreferences.cookingTime === "No Limit" ? undefined : userPreferences.cookingTime,
                    number: recipeListTabLimit,
                    offset,
                    type: recipeListTabConfigs.find(config => config.name === tabName)?.type
                }).then(recipes => {
                    dispatchTabRecipes({
                        type: "tabRecipes/add",
                        payload: {
                            tabName,
                            offset,
                            recipes
                        }
                    })
                    return Promise.resolve()
                }).catch(err => {
                    return Promise.reject(err)
                })
                promises.push(promise)
            }
        })

        return Promise.all(promises)
    }


    useEffect(() => {
        if (currentScreen === "Home") {
            fetchRecipesForOffsets()
            .catch(err => {
                console.error(err)
            })
        }
    }, [tabOffsets, userPreferences])

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

    const tabSpecs = recipeListTabConfigs.map(config => {
        const allRecipes: RecipeOverview[] = []

        const offsetRecipesMap = tabRecipes.get(config.name)
        if (offsetRecipesMap === undefined) {
            throw new Error(`tabName ${config.name} has no offsetRecipesMap`)
        }

        offsetRecipesMap.forEach((recipes) => {
            allRecipes.push(...recipes)
        })

        const onLoadMore = () => {
            dispatchTabOffsets({
                type: "tabOffset/increment",
                payload: {
                    tabName: config.name
                }
            })
        }
        
        return {
            name: config.name,
            recipes: allRecipes,
            onLoadMore
        }
    })

    const getScreen = () => {
        if (currentScreen === "Onboarding") {

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
                tabSpecs={tabSpecs}
            />
        }
    }

    return <div className="App">
        {getScreen()}
    </div>

}

export default App;

