import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appConfig } from "../appConfig"

type RecipeListsState = {
    lists: ReadonlyArray<{
        name: string,
        offset: number
    }>
}

const initialState: RecipeListsState = {
    lists: appConfig.recipeLists.map(list => ({
        name: list.name,
        offset: 0
    }))
}

export const recipeListsSlice = createSlice({
    name: 'recipeLists',
    initialState,
    reducers: {

        incrementOffset: (
            state,
            action: PayloadAction<{ listName: string }>
        ) => {
            const list = state.lists.find(list => list.name === action.payload.listName)
        
            if (list === undefined) {
                throw new Error(`there is no list with the name ${action.payload.listName}`)
            }
        
            list.offset += appConfig.recipeListLimit
        }
        
    }
})

export const { incrementOffset } = recipeListsSlice.actions