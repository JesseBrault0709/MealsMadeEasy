/**
 * @see https://spoonacular.com/food-api/docs#Diets
 */
export type SPDiet =
    | 'Gluten Free'
    | 'Ketogenic'
    | 'Vegetarian'
    | 'Lacto-Vegetarian'
    | 'Ovo-Vegeterian'
    | 'Vegan'
    | 'Pescetarian'
    | 'Paleo'
    | 'Primal'
    | 'Whole30'

/**
 * @see https://spoonacular.com/food-api/docs#Intolerances
 */
export type SPIntolerance =
    | 'Dairy'
    | 'Egg'
    | 'Gluten'
    | 'Grain'
    | 'Peanut'
    | 'Seafood'
    | 'Sesame'
    | 'Shellfish'
    | 'Soy'
    | 'Sulfite'
    | 'Tree Nut'
    | 'Wheat'

/**
 * @see https://spoonacular.com/food-api/docs#Meal-Types
 */
export type SPType =
    | 'main course'
    | 'side dish'
    | 'dessert'
    | 'appetizer'
    | 'salad'
    | 'bread'
    | 'breakfast'
    | 'soup'
    | 'beverage'
    | 'sauce'
    | 'marinade'
    | 'fingerfood'
    | 'snack'
    | 'drink'

/**
 * @see https://spoonacular.com/food-api/docs#Cuisines
 */
export type SPCuisine =
    | 'African'
    | 'American'
    | 'British'
    | 'Cajun'
    | 'Caribbean'
    | 'Chinese'
    | 'Eastern European'
    | 'European'
    | 'French'
    | 'German'
    | 'Greek'
    | 'Indian'
    | 'Irish'
    | 'Italian'
    | 'Japanese'
    | 'Jewish'
    | 'Korean'
    | 'Latin American'
    | 'Mediterranean'
    | 'Mexican'
    | 'Middle Eastern'
    | 'Nordic'
    | 'Southern'
    | 'Spanish'
    | 'Thai'
    | 'Vietnamese'

/**
 * There are additional options available than those listed here.
 *
 * @see https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
 */
export type SPSortingOption =
    | 'meta-score'
    | 'popularity'
    | 'healthiness'
    | 'price'
    | 'time'
    | 'random'
