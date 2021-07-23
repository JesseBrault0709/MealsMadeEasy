export type RecipeOverview = {
    id: number
    title: string
    image: string
    imageType: string

    /* Included in complexSearch if addRecipeInformation is true */
    readyInMinutes?: number
    preparationMinutes?: number
    cookingMinutes?: number
    spoonacularScore?: number
    servings?: number
    summary?: string
}
