import { ClockSlider } from "./ClockSlider"

export default {
    title: 'Inputs/ClockSlider',
    component: ClockSlider
}

const Template = args => <ClockSlider {...args} />

export const Primary = Template.bind({})
Primary.args = {
    options: ['Hello', 'World!']
}