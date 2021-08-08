import MagnifyingGlass from './assets/MagnifyingGlass.svg'
import ClearSearch from './assets/ClearSearch.svg'
import { forwardRef } from 'react'
import { FormEventHandler } from 'react'

export type SearchBarProps = {
    onClearSearchClick?: () => void
    onChange?: FormEventHandler<HTMLInputElement>
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
    (props, ref) => (
        <div className="search-bar">
            <img src={MagnifyingGlass} alt="" />
            <input
                ref={ref}
                type="text"
                placeholder="Search"
                onChange={props.onChange}
            />
            <img
                src={ClearSearch}
                alt="clear search"
                onClick={props.onClearSearchClick}
            />
        </div>
    )
)
