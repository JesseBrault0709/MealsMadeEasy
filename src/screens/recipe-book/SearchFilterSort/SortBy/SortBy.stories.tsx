import { configureStore } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { Provider } from 'react-redux'
import { recipePreferencesSlice } from '../../../../slices/recipePreferences'
import { SortBy } from './SortBy'

export default {
    title: 'SearchFilterSort/SortBy',
    component: SortBy
}

const store = configureStore({
    reducer: {
        recipePreferences: recipePreferencesSlice.reducer
    }
})

export const Primary: Story = () => (
    <Provider store={store}>
        <SortBy />
    </Provider>
)
