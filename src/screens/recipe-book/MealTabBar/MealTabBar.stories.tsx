import { Story } from '@storybook/react'
import { MealTabBar, MealTabBarProps } from './MealTabBar'

export default {
    title: "RecipeBook/MealTabBar",
    component: MealTabBar
}

const Template: Story<MealTabBarProps> = args => <MealTabBar {...args} />

export const Primary: Story<MealTabBarProps> = Template.bind({})
Primary.args = {
    tabs: [
        {
            name: "Breakfast",
            onClick: () => console.log("breakfast clicked")
        },
        {
            name: "Lunch",
            onClick: () => console.log("lunch clicked")
        },
        {
            name: "Dinner",
            onClick: () => console.log("dinner clicked")
        }
    ]
}
