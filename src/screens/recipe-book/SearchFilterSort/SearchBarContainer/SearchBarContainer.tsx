import { forwardRef } from 'react'
import { PropsWithRef } from 'react'
import {
    SearchBar,
    SearchBarProps
} from '../../../../inputs/SearchBar/SearchBar'

export type SearchBarContainerProps = PropsWithRef<SearchBarProps>

export const SearchBarContainer = forwardRef<HTMLInputElement, SearchBarProps>(
    (props, ref) => (
        <div className="search-bar-container">
            <SearchBar ref={ref} {...props} />
        </div>
    )
)
