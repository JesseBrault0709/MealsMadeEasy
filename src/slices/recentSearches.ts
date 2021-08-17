import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RecentSearchesState = {
    searches: ReadonlyArray<string>
}

const initialState: RecentSearchesState = {
    searches: []
}

export const recentSearchesSlice = createSlice({
    name: 'recentSearches',
    initialState,
    reducers: {
        addRecentSearchIfNotPresent: (
            state,
            action: PayloadAction<{ search: string }>
        ) => {
            const { search } = action.payload
            if (!state.searches.includes(search)) {
                state.searches.push(search)
            }
        },

        setRecentSearches: (
            state,
            action: PayloadAction<{ searches: ReadonlyArray<string> }>
        ) => {
            state.searches.push(...action.payload.searches)
        },

        clearAllRecentSearches: state => {
            state.searches = []
        }
    }
})

export const {
    addRecentSearchIfNotPresent,
    setRecentSearches,
    clearAllRecentSearches
} = recentSearchesSlice.actions
