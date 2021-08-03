import MagnifyingGlass from './assets/MagnifyingGlass.svg'
import ClearSearch from './assets/ClearSearch.svg'
import { useRef } from 'react'

export type SearchBarProps = {
    onChange?: (newValue: string) => void
}

export function SearchBar(props: SearchBarProps) {
    const ref = useRef<HTMLInputElement>(null)

    const onChange = () => {
        if (ref.current !== null && props.onChange !== undefined) {
            props.onChange(ref.current.value)
        }
    }

    const onClearSearchClick = () => {
        if (ref.current !== null) {
            ref.current.value = ''
            if (props.onChange !== undefined) {
                props.onChange(ref.current.value)
            }
        }
    }

    return (
        <div className="search-bar">
            <img src={MagnifyingGlass} alt="" />
            <input
                ref={ref}
                type="text"
                onChange={onChange}
                placeholder="Search"
            />
            <img
                src={ClearSearch}
                alt="clear search"
                onClick={onClearSearchClick}
            />
        </div>
    )
}
