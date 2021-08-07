import { useEffect } from 'react'
import { useReducer, Reducer } from 'react'
import { SearchFilterListContainer } from '../SearchFilterListContainer/SearchFilterListContainer'
import { SearchFilterListElement } from '../SearchFilterListElement/SearchFilterListElement'

type OptionsState = Record<string, boolean>

type OptionsReducerAction =
    | {
          type: 'setOptionIsSelected'
          payload: {
              option: string
              isSelected: boolean
          }
      }
    | {
          type: 'clearAll'
      }

const setOptionIsSelected = (
    prev: OptionsState,
    option: string,
    isSelected: boolean
): OptionsState => {
    const newState = { ...prev }
    newState[option] = isSelected
    return newState
}

const clearAll = (prev: OptionsState): OptionsState => {
    const newState: OptionsState = {}
    Object.keys(prev).forEach(option => (newState[option] = false))
    return newState
}

const optionsReducer: Reducer<OptionsState, OptionsReducerAction> = (
    prev,
    action
) => {
    switch (action.type) {
        case 'setOptionIsSelected':
            return setOptionIsSelected(
                prev,
                action.payload.option,
                action.payload.isSelected
            )
        case 'clearAll':
            return clearAll(prev)
    }
}

const initializeOptionsState = (
    options: ReadonlyArray<string>
): OptionsState => {
    const state: OptionsState = {}
    options.forEach(option => (state[option] = false))
    return state
}

export type MultiSelectSearchFilterListProps = {
    title: string
    options: ReadonlyArray<string>
    onChange: (selectedOptions: ReadonlyArray<string>) => void
}

export function MultiSelectSearchFilterList(
    props: MultiSelectSearchFilterListProps
) {
    const [optionsRecord, dispatchOptions] = useReducer(
        optionsReducer,
        initializeOptionsState(props.options)
    )

    // run props.onChange if options changes
    useEffect(() => {
        const selectedOptionsArr = Object.entries(optionsRecord).reduce<
            ReadonlyArray<string>
        >((arr, [option, isSelected]) => {
            if (isSelected) {
                return [...arr, option]
            } else {
                return arr
            }
        }, [])
        props.onChange(selectedOptionsArr)
    }, [optionsRecord, props.onChange])

    const renderTitleButton = () => (
        <span
            style={{
                color: 'var(--main-cta)'
            }}
            onClick={() => dispatchOptions({ type: 'clearAll' })}
        >
            Clear All
        </span>
    )

    return (
        <SearchFilterListContainer
            title={props.title}
            renderTitleButton={renderTitleButton}
        >
            {Object.entries(optionsRecord).map(([option, isSelected]) => (
                <SearchFilterListElement
                    title={option}
                    active={isSelected}
                    onClick={() =>
                        dispatchOptions({
                            type: 'setOptionIsSelected',
                            payload: {
                                option,
                                isSelected: !isSelected // set to oppposite current value
                            }
                        })
                    }
                />
            ))}
        </SearchFilterListContainer>
    )
}
