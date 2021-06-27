import { MealTabBar } from './MealTabBar'

export default {
    title: "RecipeBook/MealTabBar",
    component: MealTabBar
}

const Template = args => <MealTabBar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    tabs: ['Breakfast', 'Lunch/Dinner', 'Snack'],
    activeTab: 0,
    onClick: tabIndex => console.log(tabIndex)
}
