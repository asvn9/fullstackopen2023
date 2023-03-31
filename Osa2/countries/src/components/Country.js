import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  const api_key = process.env.REACT_APP_WEATHER_KEY
  const [country, setCountry] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}`);
        setCountry(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.capital]);

  return (<div>
    <h1>{props.name}</h1> <p>capital: {props.capital}</p>area: {props.area}
    <h3>Languages</h3> {props.languages}
    <img src={props.flag} alt="flag" width="150" height="150" />
    {country && (
      <div><h3>Weather in {country.name}</h3>
        <p>Temperature: {(country.main.temp - 273.15).toFixed(1)} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${country.weather[0].icon}@2x.png`} alt="weathericon" />
        <p>Wind: {country.wind.speed} m/s</p></div>
    )}
  </div>
  )
}

export default Country