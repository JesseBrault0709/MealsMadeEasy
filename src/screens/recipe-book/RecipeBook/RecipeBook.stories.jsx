import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { RecipeBook } from "./RecipeBook";

export default {
    title: 'RecipeBook/RecipeBook',
    component: RecipeBook
}

const Template = args => <RecipeBook {...args} />

export const Primary = Template.bind({})
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
            name: 'Breakfast',
            type: 'breakfast',
        },
        {
            name: 'Lunch',
            type: 'main course'
        },
        {
            name: 'Dinner',
            type: 'main course'
        }
    ],
    recipes: [
        {
            id: 0,
            title: "Eggs",
            image: DevRecipePicture,
            imageType: 'png'
        },
        {
            id: 1,
            title: "Bacon",
            image: DevRecipePicture,
            imageType: 'png'
        },
        {
            id: 2,
            title: "Sausage",
            image: DevRecipePicture,
            imageType: 'png'
        }
    ]
}