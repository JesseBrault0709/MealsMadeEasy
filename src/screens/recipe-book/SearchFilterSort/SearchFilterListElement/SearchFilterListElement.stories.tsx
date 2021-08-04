import { Story } from '@storybook/react'
import {
    SearchFilterListElement,
    SearchFilterListElementProps
} from './SearchFilterListElement'

export default {
    title: 'SearchFilterSort/SearchFilterListElement',
    component: SearchFilterListElement
}

export const Primary: Story<SearchFilterListElementProps> = args => (
    <SearchFilterListElement {...args} />
)
Primary.args = {
    active: false,
    onClick: () => console.log('clicked'),
    title: 'carrot'
}
