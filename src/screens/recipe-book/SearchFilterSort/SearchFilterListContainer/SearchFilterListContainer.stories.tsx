import { Story } from '@storybook/react'
import { Reducer, useReducer } from 'react'
import { SearchFilterListElement } from '../SearchFilterList/SearchFilterListElement/SearchFilterListElement'
import {
    SearchFilterListContainer,
    SearchFilterListContainerProps
} from './SearchFilterListContainer'

export default {
    title: 'SearchFilterSort/SearchFilterListContainer',
    component: SearchFilterListContainer
}

const Template: Story<SearchFilterListContainerProps> = args => (
    <SearchFilterListContainer {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    title: 'Hello, World!',
    renderTitleButton: () => (
        <span onClick={() => console.log('click me clicked')}>Click me</span>
    ),
    children: [
        'carrot',
        'peas',
        'salad',
        'pizza',
        'chicken',
        'apple'
    ].map(item => <SearchFilterListElement title={item} />)
}

type CuisinesReducerAction =
    | {
          type: 'setCuisine'
          payload: {
              cuisine: string
              isSelected: boolean
          }
      }
    | {
          type: 'clearAll'
      }

const cuisinesReducer: Reducer<
    Record<string, boolean>,
    CuisinesReducerAction
> = (prev, action) => {
    const setCuisine = (
        prev: Record<string, boolean>,
        cuisine: string,
        isSelected: boolean
    ) => {
        const newState = { ...prev }
        newState[cuisine] = isSelected
        return newState
    }

    const clearAll = (prev: Record<string, boolean>) => {
        const newState: Record<string, boolean> = {}
        Object.keys(prev).forEach(cuisine => (newState[cuisine] = false))
        return newState
    }

    switch (action.type) {
        case 'setCuisine':
            return setCuisine(
                prev,
                action.payload.cuisine,
                action.payload.isSelected
            )
        case 'clearAll':
            return clearAll(prev)
    }
}

const initializeCuisines = (cuisines: ReadonlyArray<string>) => {
    const result: Record<string, boolean> = {}
    cuisines.forEach(cuisine => (result[cuisine] = false))
    return result
}

export const Cuisines: Story<{ cuisines: ReadonlyArray<string> }> = args => {
    const [cuisines, dispatchCuisines] = useReducer(
        cuisinesReducer,
        initializeCuisines(args.cuisines)
    )

    const renderTitleButton = () => (
        <span
            style={{
                color: 'var(--main-cta)'
            }}
            onClick={() => dispatchCuisines({ type: 'clearAll' })}
        >
            Clear All
        </span>
    )

    return (
        <SearchFilterListContainer
            title="Cuisines"
            renderTitleButton={renderTitleButton}
        >
            {Object.entries(cuisines).map(([cuisine, isSelected]) => (
                <SearchFilterListElement
                    title={cuisine}
                    active={isSelected}
                    onClick={() => {
                        dispatchCuisines({
                            type: 'setCuisine',
                            payload: {
                                cuisine,
                                isSelected: !isSelected // opposite!
                            }
                        })
                    }}
                />
            ))}
        </SearchFilterListContainer>
    )
}

Cuisines.args = {
    cuisines: [
        'Italian',
        'French',
        'German',
        'Spanish',
        'Thai',
        'Indian',
        'Japanese'
    ]
}
