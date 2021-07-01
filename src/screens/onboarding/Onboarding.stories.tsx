import { Story } from '@storybook/react'
import { Onboarding, OnboardingProps } from './Onboarding'

export default {
    title: "Onboarding/Onboarding",
    component: Onboarding
}

const Template: Story<OnboardingProps> = args => <Onboarding {...args} />

export const Primary: Story<OnboardingProps> = Template.bind({})
Primary.args = {
    allCookingTimes: ["No Limit", 15, 30, 45, 60],
    allDiets: ['Gluten Free', 'Ketogenic', 'Lacto-Vegetarian', 'Ovo-Vegeterian', 'Paleo', 'Pescetarian'],
    allIntolerances: ['Dairy', 'Egg', 'Gluten', 'Grain'],
}