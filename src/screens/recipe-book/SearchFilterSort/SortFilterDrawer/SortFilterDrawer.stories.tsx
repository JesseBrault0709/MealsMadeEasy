import { Story } from '@storybook/react'
import { SortFilterDrawer, SortFilterDrawerProps } from './SortFilterDrawer'

export default {
    title: 'SearchFilterSort/SortFilterDrawer',
    component: SortFilterDrawer
}

export const Primary: Story<SortFilterDrawerProps> = args => (
    <SortFilterDrawer {...args} />
)
