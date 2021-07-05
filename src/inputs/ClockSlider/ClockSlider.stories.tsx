import { Story } from "@storybook/react"
import { ClockSlider, ClockSliderProps } from "./ClockSlider"

export default {
    title: 'Inputs/ClockSlider',
    component: ClockSlider
}

const Template: Story<ClockSliderProps> = args => <ClockSlider {...args} />

export const Primary: Story<ClockSliderProps> = Template.bind({})
Primary.args = {
    options: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
}