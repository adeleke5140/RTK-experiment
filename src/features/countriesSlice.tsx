import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from './store'
import type { PayloadAction } from '@reduxjs/toolkit'


interface InitialState<T> {
    loading: boolean
    hasError: boolean
    countries: Array<T>
}

const initialState: InitialState<Array<{}>> = {
    loading: false,
    hasError: false,
    countries: []
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        getCountries: (state) => {
            state.loading = true
        },
        getCountriesSuccess: (state, action) => {
            const { payload } = action
            state.countries = payload
            state.loading = false
            state.hasError = false
        },
        getCountriesFailure: (state) => {
            state.loading = false
            state.hasError = true
        }
    }
})

export const { getCountries, getCountriesFailure, getCountriesSuccess } = countriesSlice.actions

export const fetchCountries = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(getCountries())

        try{
            const response = await fetch("https://restcountries.com/v3.1/all")
            const data = await response.json()

            dispatch(getCountriesSuccess(data))
        }catch(err){
            dispatch(getCountriesFailure())
        }
    }
}

export const countriesSelector = (state: RootState) => state.countries

export default countriesSlice.reducer