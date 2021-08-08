import { configureStore } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { Provider } from 'react-redux'
import { AppConfigContext } from '../../..'
import { appConfig } from '../../../appConfig'
import {
    addRecentSearches,
    recentSearchesSlice
} from '../../../slices/recentSearches'
import { recipePreferencesSlice } from '../../../slices/recipePreferences'
import { SearchFilterSort } from './SearchFilterSort'

export default {
    title: 'SearchFilterSort/SearchFilterSort',
    component: SearchFilterSort
}

const store = configureStore({
    reducer: {
        recentSearches: recentSearchesSlice.reducer,
        recipePreferences: recipePreferencesSlice.reducer
    }
})

type TemplateArgs = {
    recentSearches: ReadonlyArray<string>
}

const Template: Story<TemplateArgs> = args => {
    store.dispatch(addRecentSearches({ searches: args.recentSearches }))

    return (
        <AppConfigContext.Provider value={appConfig}>
            <Provider store={store}>
                <SearchFilterSort />
            </Provider>
        </AppConfigContext.Provider>
    )
}

export const Primary: Story<TemplateArgs> = Template.bind({})
Primary.args = {
    recentSearches: ['Gluten free pasta', 'Apple spice cake', 'Tomato sauce']
}
