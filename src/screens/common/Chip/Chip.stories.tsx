import X from './assets/X.png'

import { Chip, ChipProps, Avatar } from "./Chip";
import { Story } from '@storybook/react'

export default {
    title: 'Common/Chip',
    component: Chip
}

const Template: Story<ChipProps> = args => <Chip {...args} />

export const NoValue: Story<ChipProps> = Template.bind({})
NoValue.args = {
    avatar: <Avatar><img src={X} /></Avatar>,
    label: "Hello World!",
    type: "no-value"
}

export const Weak: Story<ChipProps> = Template.bind({})
Weak.args = {
    avatar: <Avatar><img src={X} /></Avatar>,
    label: "Hello, World!",
    type: "weak"
}

export const Strong: Story<ChipProps> = Template.bind({})
Strong.args = {
    avatar: <Avatar><img src={X} /></Avatar>,
    label: "Hello, strong!",
    type: "strong"
}