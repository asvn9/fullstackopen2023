import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
   
    useEffect(() => {
      axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {setCountry(response.data) 
        })
    }, [name])
  
    if (name === ''){
      return null
    }
  
    if (!country){
      return []
    }
    return country
    }

    export default useCountry