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
        addRecentSearch: (state, action: PayloadAction<{ search: string }>) => {
            state.searches.push(action.payload.search)
        },

        addRecentSearches: (
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
    addRecentSearch,
    addRecentSearches,
    clearAllRecentSearches
} = recentSearchesSlice.actions
