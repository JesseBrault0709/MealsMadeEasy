import { JBButton, JBButtonProps } from "./JBButton";
import { Story } from '@storybook/react'
import { Children } from "react";

export default {
    title: 'inputs/Button',
    component: JBButton
}

const Template: Story<JBButtonProps> = args => <JBButton {...args} />

export const Primary: Story<JBButtonProps> = Template.bind({})
Primary.args = {
    variant: "primary",
    children: "Hello, button!"
}

export const Disabled: Story<JBButtonProps> = Template.bind({})
Disabled.args = {
    variant: 'disabled',
    children: "Disabled button!"
}

export const Outline: Story<JBButtonProps> = Template.bind({})
Outline.args = {
    variant: 'outline',
    children: 'Outline button!'
}

export const CircleLarge: Story<JBButtonProps> = Template.bind({})
CircleLarge.args = {
    variant: "circle-large",
    children: 'large circle'
}

export const CircleLargeActive: Story<JBButtonProps> = Template.bind({})
CircleLargeActive.args = {
    variant: 'circle-large',
    children: 'Gluten Free',
    active: true
}