import { RecipeList } from "./RecipeList";

export default {
    title: 'RecipeBook/RecipeList',
    component: RecipeList
}

const Template = args => <RecipeList {...args} />

export const Primary = Template.bind({})
Primary.args = {
    cookingTime: '30 mins',
    diet: 'Vegetarian',
    intolerances: [],
    
    onRecipeCardClick: recipe => {
        console.log(recipe.title)
    },

    tabs: [
        {
            name: 'Breakfast',
            getRecipes: () => Promise.resolve([
                {
                    title: 'Sausage'
                }
            ])
        },
        {
            name: 'Lunch',
            getRecipes: () => Promise.resolve([
                {
                    title: 'Lunch bacon'
                }
            ])
        },
        {
            name: 'Dinner',
            getRecipes: () => Promise.resolve([
                {
                    title: 'Dinner bacon'
                }
            ])
        }
    ]

}