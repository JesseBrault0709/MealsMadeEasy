import { JBButton, ButtonProps } from "./JBButton";
import { Story } from '@storybook/react'
import { Children } from "react";

export default {
    title: 'inputs/Button',
    component: JBButton
}

const Template: Story<ButtonProps> = args => <JBButton {...args} />

export const Primary: Story<ButtonProps> = Template.bind({})
Primary.args = {
    variant: "primary",
    children: "Hello, button!"
}

export const Disabled: Story<ButtonProps> = Template.bind({})
Disabled.args = {
    variant: 'disabled',
    children: "Disabled button!"
}

export const Outline: Story<ButtonProps> = Template.bind({})
Outline.args = {
    variant: 'outline',
    children: 'Outline button!'
}