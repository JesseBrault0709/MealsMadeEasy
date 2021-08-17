import { useContext } from 'react'
import { AppConfigContext, useAppDispatch, useAppSelector } from '../../../..'
import { JBRadio } from '../../../../inputs/JBRadio/JBRadio'
import { setSearchSort } from '../../../../slices/searchPreferences'

/**
 * A component which simply renders a list of JBRadio instances,
 * each for the possible sorting options obtained from the appConfig
 * (via the AppConfigContext).
 */
export function SortBy() {
    const appConfig = useContext(AppConfigContext)

    const appDispatch = useAppDispatch()

    const currentSortingOption = useAppSelector(
        state => state.searchPreferences.sort
    )

    return (
        <div className="sort-by">
            <div className="sort-by-title">
                <h3>Sort By</h3>
            </div>
            <div className="sort-by-options">
                {appConfig.availbleSortingOptions.map(
                    ({ apiValue, display }) => (
                        <JBRadio
                            label={display}
                            key={display}
                            selected={apiValue === currentSortingOption}
                            onClick={() =>
                                appDispatch(setSearchSort({ sort: apiValue }))
                            }
                        />
                    )
                )}
            </div>
        </div>
    )
}
