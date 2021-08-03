import ChevronUp from './assets/ChevronUp.svg'
import ChevronDown from './assets/ChevronDown.svg'
import { useState } from 'react'
import { SortFilterButton } from '../SortFilterButton/SortFilterButton'

export type SortFilterDrawerProps = {}

type FilterOrSort = 'Filter' | 'Sort'

export function SortFilterDrawer() {
    const [showButtons, setShowButtons] = useState(true)

    const [filterOrSort, setFilterOrSort] = useState<FilterOrSort>('Filter')

    const getButtons = () => (
        <div className="sort-filter-buttons">
            <SortFilterButton
                variant="Filter"
                active={filterOrSort === 'Filter'}
                onClick={() => setFilterOrSort('Filter')}
            />
            <SortFilterButton
                variant="Sort"
                active={filterOrSort === 'Sort'}
                onClick={() => setFilterOrSort('Sort')}
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
