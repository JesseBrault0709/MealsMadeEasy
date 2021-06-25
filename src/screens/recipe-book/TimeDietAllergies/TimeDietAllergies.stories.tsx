import { Story } from '@storybook/react'
import { TimeDietAllergies, TimeDietAllergiesProps } from "./TimeDietAllergies";

export default {
    title: "Home/TimeDietAllergies",
    component: TimeDietAllergies
}

const Template: Story<TimeDietAllergiesProps> = args => <TimeDietAllergies {...args} />

export const Primary: Story<TimeDietAllergiesProps> = Template.bind({})
Primary.args = {
    tags: [
        {
            name: 'Time',
            values: ['15 mins']
        },
        {
            name: 'Diet',
            values: ['Vegan', 'Pescatarian']
        },
        {
            name: 'Allergies',
            values: ['Gluten']
        }
    ]
}