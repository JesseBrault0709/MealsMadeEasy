import { RecipeRating } from "./RecipeRating"

export default {
    title: 'Home/RecipeRating',
    component: RecipeRating
}

const Template = args => <RecipeRating {...args} />

export const Primary = Template.bind({})
Primary.args = {
    rating: 0
}