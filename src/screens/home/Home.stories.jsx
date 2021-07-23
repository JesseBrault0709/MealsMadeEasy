import { Home } from './Home'

export default {
    title: 'Home',
    component: Home
}

const Template = args => <Home {...args} />

export const Primary = Template.bind({})
Primary.args = {
    showLoadingScreen: true,

    initialRecipePreferences: {
        cookingTime: 42,
        diet: 'Vegetarian',
        intolerances: []
    },

    initialDayMealPlans: [
        {
            date: new Date('July 2, 2021'),
            meals: [
                {
                    mealName: 'Breakfast',
                    recipes: []
                },
                {
                    mealName: 'Lunch',
                    recipes: []
                },
                {
                    mealName: 'Dinner',
                    recipes: []
                }
            ]
        },
        {
            date: new Date('July 4, 2021'),
            meals: [
                {
                    mealName: 'Breakfast',
                    recipes: []
                },
                {
                    mealName: 'Lunch',
                    recipes: []
                },
                {
                    mealName: 'Dinner',
                    recipes: []
                }
            ]
        }
    ]
}
