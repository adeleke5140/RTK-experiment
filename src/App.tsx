import { useEffect} from 'react'
import './App.css'
import {
  fetchCountries,
  countries,
  status,
  hasError
} from './features/countriesSlice'
import {
  useAppSelector, useAppDispatch 
} from './hooks/typed-hooks'

function App() {
  const countriesData = useAppSelector(countries)
  const countriesStatus = useAppSelector(status)
  const countriesError = useAppSelector(hasError)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(countriesStatus === 'idle'){
      dispatch(fetchCountries())
    }
  },[countriesStatus, dispatch])

  return (
    <div className="App">
     Countries around the world..
    </div>
  )
}

export default App
