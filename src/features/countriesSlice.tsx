import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from './store'
import type { PayloadAction } from '@reduxjs/toolkit'


interface InitialState<T> {
    status: Status
    hasError: Error
    countries: T
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

type Error = string | null | undefined

const initialState: InitialState<Array<{}>> = {
    status: 'idle',
    hasError: null,
    countries: []
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchCountries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCountries.fulfilled, (state, {payload}: PayloadAction<Array<{}>>) => {
                state.status = 'succeeded'
                state.countries = state.countries.concat(payload)
            })
            .addCase(fetchCountries.rejected, (state,action) => {
                state.status = 'failed'
                state.hasError = action.error.message
            })
    }
})



export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = response.json()
    return data
})

export const countries = (state: RootState) => state.countries
export const status = (state: RootState) => state.status
export const hasError = (state: RootState) => state.hasError

export default countriesSlice.reducer