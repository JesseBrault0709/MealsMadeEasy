import ChevronUp from './assets/ChevronUp.svg'
import ChevronDown from './assets/ChevronDown.svg'
import { useState } from 'react'
import { SortFilterButton } from '../SortFilterButton/SortFilterButton'

export type SortFilterDrawerProps = {
    /** A callback to be run when the Filter button is clicked. */
    onFilter: () => void

    /** A callback to be run when the Sort button is clicked. */
    onSort: () => void
}

/**
 * The possible states of the drawer. The active one will be cause its
 * respective button to be rendered the main-cta color.
 */
type FilterOrSort = 'Filter' | 'Sort'

/**
 * A component which renders a 'drawer' containing two buttons,
 * one for each 'Filter' or 'Sort'. This is used to change the subscreen
 * of SearchFilterSort.
 *
 * The drawer renders a chevron on the bottom to close it.
 */
export function SortFilterDrawer(props: SortFilterDrawerProps) {
    const [showButtons, setShowButtons] = useState(true)

    const [filterOrSort, setFilterOrSort] = useState<FilterOrSort>('Filter')

    const getButtons = () => (
        <div className="sort-filter-buttons">
            <SortFilterButton
                variant="Filter"
                active={filterOrSort === 'Filter'}
                onClick={() => {
                    setFilterOrSort('Filter')
                    props.onFilter()
                }}
            />
            <SortFilterButton
                variant="Sort"
                active={filterOrSort === 'Sort'}
                onClick={() => {
                    setFilterOrSort('Sort')
                    props.onSort()
                }}
            />
        </div>
    )

    const getChevron = () => (
        <div className="sort-filter-drawer-chevron">
            {showButtons ? (
                <img
                    src={ChevronUp}
                    alt="hide filter and sort buttons"
                    onClick={() => setShowButtons(false)}
                />
            ) : (
                <img
                    src={ChevronDown}
                    alt="show filter and sort buttons"
                    onClick={() => setShowButtons(true)}
                />
            )}
        </div>
    )

    return (
        <div className="sort-filter-drawer">
            {showButtons ? getButtons() : null}
            {getChevron()}
        </div>
    )
}
