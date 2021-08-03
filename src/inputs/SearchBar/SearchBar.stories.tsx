import { Story } from '@storybook/react'
import { SearchBar, SearchBarProps } from './SearchBar'

export default {
    title: 'inputs/SearchBar',
    component: SearchBar
}

export const Primary: Story<SearchBarProps> = () => {
    const onChange: SearchBarProps['onChange'] = newInput => {
        console.log(newInput)
    }

    return <SearchBar onChange={onChange} />
}
