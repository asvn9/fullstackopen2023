import React from 'react'

import Country from './Country'

const Filter = ({ countries, showFiltered, selectedCountry, setSelectedCountry }) => {
  const filt = countries.filter(country =>
    country.name.common.toLowerCase().includes(showFiltered)
  ).map(country =>
    <Country
      key={country.name.common}
      name={country.name.common}
      capital={country.capital}
      area={country.area}
      id={country.id}
      languages={
        <ul>
          {Object.values(country.languages || {}).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
      }
      flag={country.flags.png}
    />
  );

  const handleClick = (country) => {
    setSelectedCountry(country);
  }

  if (filt.length > 10) {
    return <p>Too many matches</p>;
  } else if (filt.length === 1) {
    return <>{filt}</>;
  }

  return (
    <ul>
      {filt.map((country) =>
        <li key={country.props.name}>
          {country.props.name}{" "}
          <button onClick={() => handleClick(country.props)}>Click</button>
        </li>
      )}
      {selectedCountry && <Country {...selectedCountry} />}
    </ul>
  );
}

export default Filter