import { configureStore } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { Provider } from 'react-redux'
import { onboardingPreferencesSlice } from '../../../../slices/onboardingPreferences'
import { SortBy } from './SortBy'

export default {
    title: 'SearchFilterSort/SortBy',
    component: SortBy
}

const store = configureStore({
    reducer: {
        recipePreferences: onboardingPreferencesSlice.reducer
    }
})

export const Primary: Story = () => (
    <Provider store={store}>
        <SortBy />
    </Provider>
)
