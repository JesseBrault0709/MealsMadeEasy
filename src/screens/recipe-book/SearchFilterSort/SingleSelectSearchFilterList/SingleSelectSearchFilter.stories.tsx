import { Story } from '@storybook/react'
import {
    SingleSelectSearchFilterList,
    SingleSelectSearchFilterListProps
} from './SingleSelectSearchFilterList'

export default {
    title: 'SearchFilterSort/SingleSelectSearchFilterList',
    component: SingleSelectSearchFilterList
}

export const Primary: Story<SingleSelectSearchFilterListProps> = args => (
    <SingleSelectSearchFilterList {...args} />
)
Primary.args = {
    title: 'Time',
    options: ['No Limit', '15 mins', '30 mins', '45 mins', '60 mins'],
    onChange: selected => console.log(selected)
}
