import { Filter } from '../../../../icons/Filter/Filter'
import { Sort } from '../../../../icons/Sort/Sort'

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
                <Sort className="sort-active" />
            ) : (
                <Filter className="filter-active" />
            )
        } else {
            return props.variant === 'Sort' ? (
                <Sort className="sort-inactive" />
            ) : (
                <Filter className="filter-inactive" />
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
