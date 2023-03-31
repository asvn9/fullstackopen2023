import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showFiltered, setFiltered] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilter = (event) => {
    setFiltered(event.target.value)
    setSelectedCountry("")
  }

  return (
    <div>
      find countries: <input value={showFiltered} onChange={handleFilter} />

      <Filter countries={countries} showFiltered={showFiltered} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </div>)
}

export default App