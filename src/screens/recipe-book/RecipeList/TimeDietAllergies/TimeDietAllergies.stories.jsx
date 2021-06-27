import { TimeDietAllergies } from "./TimeDietAllergies";

export default {
    title: "RecipeBook/TimeDietAllergies",
    component: TimeDietAllergies
}

const Template = args => <TimeDietAllergies {...args} />

export const Primary = Template.bind({})
Primary.args = {
    onFilterClick: () => console.log('hello world!'),
    cookingTime: '30 minutes',
    diet: 'Vegan',
    intolerances: []
}