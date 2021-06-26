import { TimeDietAllergies } from "./TimeDietAllergies";

export default {
    title: "Home/TimeDietAllergies",
    component: TimeDietAllergies
}

const Template = args => <TimeDietAllergies {...args} />

export const Primary = Template.bind({})
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