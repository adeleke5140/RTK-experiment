import { AnyAction, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit'
import countriesReducer from './countriesSlice'


export const store: AppStore = configureStore({
    reducer: countriesReducer
})

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

//what does the Omit here do
export type AppStore = Store & {
    dispatch: AppThunkDispatch
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch