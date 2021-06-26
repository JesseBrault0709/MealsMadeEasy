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
