import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppScreen } from "../App"

type AppScreensState = {
    current: AppScreen
}

const initialState: AppScreensState = {
    current: "Splash"
}

export const appScreensSlice = createSlice({
    name: 'appScreens',
    initialState,
    reducers: {
        setAppScreen: (
            state,
            action: PayloadAction<{ screen: AppScreen }>
        ) => {
            state.current = action.payload.screen
        }
    }
})

export const { setAppScreen } = appScreensSlice.actions