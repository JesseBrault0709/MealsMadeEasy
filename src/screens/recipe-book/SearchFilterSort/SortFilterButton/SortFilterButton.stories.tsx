import { Story } from '@storybook/react'
import { SortFilterButton, SortFilterButtonProps } from './SortFilterButton'

export default {
    title: 'SearchFilterSort/SortFilterButton',
    component: SortFilterButton
}

export const Primary: Story<SortFilterButtonProps> = args => (
    <SortFilterButton {...args} />
)
Primary.args = {
    variant: 'Sort',
    active: false,
    onClick: () => console.log('clicked')
}
