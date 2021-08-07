import { Story } from '@storybook/react'
import {
    MultiSelectSearchFilterList,
    MultiSelectSearchFilterListProps
} from './MultiSelectSearchFilterList'

export default {
    title: 'SearchFilterSort/MutliSelectSearchFilterList',
    component: MultiSelectSearchFilterList
}

export const Primary: Story<MultiSelectSearchFilterListProps> = args => (
    <MultiSelectSearchFilterList {...args} />
)
Primary.args = {
    title: 'Cuisines',
    options: [
        'Italian',
        'Japanese',
        'Indian',
        'Ethiopian',
        'French',
        'German',
        'American',
        'Southern'
    ],
    onChange: selectedOptions => console.log(selectedOptions)
}
