import { useEffect } from 'react'
import { useState } from 'react'
import { SearchFilterListContainer } from '../SearchFilterListContainer/SearchFilterListContainer'
import { SearchFilterListElement } from '../SearchFilterListElement/SearchFilterListElement'

export type SingleSelectSearchFilterListProps = {
    title: string
    options: ReadonlyArray<string>
    onChange: (selected: string | null) => void
}

export function SingleSelectSearchFilterList(
    props: SingleSelectSearchFilterListProps
) {
    const [selected, setSelected] = useState<string | null>(null)

    // run props.onChange if selected changes

    useEffect(() => {
        if (props.onChange !== undefined) {
            props.onChange(selected)
        }
    }, [props.onChange, selected])

    return (
        <SearchFilterListContainer title={props.title}>
            {props.options.map(option => (
                <SearchFilterListElement
                    title={option}
                    active={option === selected}
                    onClick={() =>
                        // if it is currently selected, unselect it
                        setSelected(option === selected ? null : option)
                    }
                />
            ))}
        </SearchFilterListContainer>
    )
}
