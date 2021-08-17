import SortActive from './assets/SortActive.svg'
import SortInactive from './assets/SortInactive.svg'

import FilterActive from './assets/FilterActive.svg'
import FilterInactive from './assets/FilterInactive.svg'

export type SortFilterButtonProps = {
    /** The variant to render */
    variant: 'Sort' | 'Filter'

    /** Whether this button is active or not */
    active?: boolean

    /** A callback to be run when the button is clicked. */
    onClick?: () => void
}

/**
 * A simple button which representing which subscreen SearchFilterSort is
 * currently active. Intended to be used in SortFilterDrawer.
 */
export function SortFilterButton(props: SortFilterButtonProps) {
    const classNames = ['sort-filter-button']

    if (props.active) {
        classNames.push('sort-filter-button-active')
    } else {
        classNames.push('sort-filter-button-inactive')
    }

    const getImg = () => {
        if (props.active) {
            return props.variant === 'Sort' ? (
                <img src={SortActive} alt="" />
            ) : (
                <img src={FilterActive} alt="" />
            )
        } else {
            return props.variant === 'Sort' ? (
                <img src={SortInactive} alt="" />
            ) : (
                <img src={FilterInactive} alt="" />
            )
        }
    }

    return (
        <div className={classNames.join(' ')} onClick={props.onClick}>
            {getImg()}
            <span>{props.variant}</span>
        </div>
    )
}
