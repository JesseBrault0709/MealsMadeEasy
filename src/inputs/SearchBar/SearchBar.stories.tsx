import { Story } from '@storybook/react'
import { FormEventHandler } from 'react'
import { useRef } from 'react'
import { SearchBar, SearchBarProps } from './SearchBar'

export default {
    title: 'inputs/SearchBar',
    component: SearchBar
}

export const Primary: Story<SearchBarProps> = () => {
    const ref = useRef<HTMLInputElement>(null)

    const onClear = () => {
        if (ref.current !== null) {
            ref.current.value = ''
        }
    }

    const onChange: FormEventHandler<HTMLInputElement> = () => {
        console.log(ref.current?.value)
    }

    return (
        <SearchBar ref={ref} onClearSearchClick={onClear} onChange={onChange} />
    )
}
