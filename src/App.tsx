import { useEffect} from 'react'
import './App.css'
import {
  fetchCountries,
  countriesSelector
} from './features/countriesSlice'
import {
  useAppSelector, useAppDispatch 
} from './hooks/typed-hooks'

function App() {
  const countries = useAppSelector(countriesSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
  },[])

  return (
    <div className="App">
     Countries around the world
    </div>
  )
}

export default App
