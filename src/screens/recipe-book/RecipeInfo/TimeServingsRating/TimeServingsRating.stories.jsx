import { TimeServingsRating } from "./TimeServingsRating";

export default {
    title: 'RecipeInfo/TimeServingsRating',
    component: TimeServingsRating
}

const Template = args => <TimeServingsRating {...args} />

export const Primary = Template.bind({})
Primary.args = {
    time: 25,
    servings: 2,
    rating: 4
}