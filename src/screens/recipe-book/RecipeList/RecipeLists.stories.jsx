import { RecipeList } from "./RecipeLists";

export default {
    title: 'RecipeBook/RecipeList',
    component: RecipeList
}

const Template = args => <RecipeList {...args} />

export const Primary = Template.bind({})

const getRecipeGetter = recipeTitles => {
    const recipes = recipeTitles.map(title => ({ title }))
    return (offset, limit) => {
        return Promise.resolve(recipes.slice(offset, offset + limit))
    }
}

Primary.args = {
    cookingTime: '30 mins',
    diet: 'Vegetarian',
    intolerances: [],
    
    recipeResultSetSize: 1,

    onRecipeCardClick: recipe => {
        console.log(recipe.title)
    },

    tabs: [
        {
            name: 'Breakfast',
            getRecipes: getRecipeGetter(['Sausage', 'Eggs', 'Hashbrowns'])
        },
        {
            name: 'Lunch',
            getRecipes: getRecipeGetter(['Soup', 'Salad', 'Sandwich'])
        },
        {
            name: 'Dinner',
            getRecipes: getRecipeGetter(['Pasta', 'Rice', 'Pork'])
        }
    ]

}