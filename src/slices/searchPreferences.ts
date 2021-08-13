import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SPCuisine, SPSortingOption } from '../client/spoonacularTypes'

type SearchPreferencesState = {
    query: string | null
    cuisines: ReadonlyArray<SPCuisine> | null
    sort: SPSortingOption | null
}

const initialState: SearchPreferencesState = {
    query: null,
    cuisines: null,
    sort: null
}

export const searchPreferencesSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (
            state,
            action: PayloadAction<{ query: string | null }>
        ) => {
            state.query = action.payload.query
        },

        setSearchCuisines: (
            state,
            action: PayloadAction<{ cuisines: ReadonlyArray<SPCuisine> | null }>
        ) => {
            if (action.payload.cuisines !== null) {
                state.cuisines = [...action.payload.cuisines]
            } else {
                state.cuisines = null
            }
        },

        setSearchSort: (
            state,
            action: PayloadAction<{ sort: SPSortingOption | null }>
        ) => {
            state.sort = action.payload.sort
        }
    }
})

export const {
    setSearchQuery,
    setSearchCuisines,
    setSearchSort
} = searchPreferencesSlice.actions
