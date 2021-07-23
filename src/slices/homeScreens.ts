import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HomeScreen } from '../screens/home/Home'

export type HomeScreensState = {
    current: HomeScreen
}

const initialState: HomeScreensState = {
    current: 'Recipe Book'
}

export const homeScreensSlice = createSlice({
    name: 'homeScreens',
    initialState,
    reducers: {
        setHomeScreen: (
            state,
            action: PayloadAction<{ screen: HomeScreen }>
        ) => {
            state.current = action.payload.screen
        }
    }
})

export const { setHomeScreen } = homeScreensSlice.actions
