import { RecipeBook, RecipeBookProps } from "./RecipeBook";
import { Story } from '@storybook/react'

export default {
    title: 'RecipeBook/RecipeBook',
    component: RecipeBook
}

const Template: Story<RecipeBookProps> = args => <RecipeBook {...args} />

export const Primary: Story<RecipeBookProps> = Template.bind({})
Primary.args = {
    tags: [
        {
            name: 'Time',
            values: ['15 minutes']
        },
        {
            name: 'Diet',
            values: ['Vegetarian']
        },
        {
            name: 'Allergies',
            values: ['Gluten']
        }
    ],
    tabs: [
        {
            name: 'Breakfast'
        },
        {
            name: 'Lunch'
        },
        {
            name: 'Dinner'
        }
    ],
    recipes: [
        {
            title: "Eggs",
            rating: 4
        },
        {
            title: "Bacon",
            rating: 5
        },
        {
            title: "Sausage",
            rating: 3
        }
    ]
}