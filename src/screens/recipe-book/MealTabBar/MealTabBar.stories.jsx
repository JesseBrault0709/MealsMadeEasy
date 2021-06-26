import { MealTabBar } from './MealTabBar'

export default {
    title: "RecipeBook/MealTabBar",
    component: MealTabBar
}

const Template = args => <MealTabBar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    tabs: [
        {
            name: "Breakfast",
            type: 'breakfast',
            onClick: () => console.log("breakfast clicked")
        },
        {
            name: "Lunch",
            type: 'main course',
            onClick: () => console.log("lunch clicked")
        },
        {
            name: "Dinner",
            type: 'main course',
            onClick: () => console.log("dinner clicked")
        }
    ]
}
