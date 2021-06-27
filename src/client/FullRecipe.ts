import { RecipeOverview } from "./RecipeOverview"

export type Measure = {
    amount: number,
    unitLong: string,
    unitShort: string
}

export type ExtendedIngredient = {
    id: number,
    amount: number,
    image: string,
    measures: {
        metric: Measure,
        us: Measure
    },
    name: string,
    original: string,
    originalName: string,
    unit: string
}

export type FullRecipe = Required<Omit<RecipeOverview, "preparationMinutes" | "cookingMinutes">> & {
    analyzedInstructions: ReadonlyArray<string>,
    instructions: string,
    extendedIngredients: ReadonlyArray<ExtendedIngredient>
}