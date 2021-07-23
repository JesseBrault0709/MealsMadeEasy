import { Story } from '@storybook/react'
import { Onboarding, OnboardingProps } from './Onboarding'

export default {
    title: 'Onboarding/Onboarding',
    component: Onboarding
}

const Template: Story<OnboardingProps> = args => <Onboarding {...args} />

export const Primary: Story<OnboardingProps> = Template.bind({})
Primary.args = {}
