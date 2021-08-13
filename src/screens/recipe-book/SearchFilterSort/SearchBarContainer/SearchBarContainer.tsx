import { forwardRef } from 'react'
import { PropsWithRef } from 'react'
import { BackButton } from '../../../../icons/BackButton/BackButton'
import {
    SearchBar,
    SearchBarProps
} from '../../../../inputs/SearchBar/SearchBar'

export type SearchBarContainerProps = PropsWithRef<SearchBarProps> & {
    onBackButtonClick?: () => void
    onApply?: () => void
}

export const SearchBarContainer = forwardRef<
    HTMLInputElement,
    SearchBarContainerProps
>((props, ref) => (
    <div className="search-bar-container">
        {props.onBackButtonClick !== undefined ? (
            <BackButton onClick={props.onBackButtonClick} />
        ) : null}

        <SearchBar ref={ref} {...props} />

        {props.onApply !== undefined ? (
            <span
                className="search-bar-container-apply"
                onClick={props.onApply}
            >
                Apply
            </span>
        ) : null}
    </div>
))
