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

export const CircleLarge: Story<ButtonProps> = Template.bind({})
CircleLarge.args = {
    variant: "circle-large",
    children: 'large circle'
}

export const CircleLargeActive: Story<ButtonProps> = Template.bind({})
CircleLargeActive.args = {
    variant: 'circle-large',
    children: 'Gluten Free',
    active: true
}