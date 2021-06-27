import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { RecipeBook } from "./RecipeBook";

export default {
    title: 'RecipeBook/RecipeBook',
    component: RecipeBook
}

const Template = args => <RecipeBook {...args} />

export const Primary = Template.bind({})
Primary.args = {
    cookingTime: '30 mins',
    diet: 'Vegan',
    intolerances: ['Gluten', 'Dairy']
}